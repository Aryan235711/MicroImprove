import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle, Circle, PlayCircle, Share2, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Experiment, ExperimentProgress } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ExperimentModalProps {
  experiment: Experiment | null;
  progress: ExperimentProgress | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteDay: (day: number) => void;
  onStartExperiment: () => void;
  onSaveNote: (day: number, note: string) => void;
}

export default function ExperimentModal({ 
  experiment, 
  progress, 
  isOpen, 
  onClose, 
  onCompleteDay, 
  onStartExperiment,
  onSaveNote 
}: ExperimentModalProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [note, setNote] = useState("");

  if (!experiment || !progress) return null;

  const isDayCompleted = (day: number) => progress.completedDays.includes(day);
  const isLocked = progress.status === 'locked';

  const handleDayClick = (day: number) => {
    if (isLocked) return;
    
    if (isDayCompleted(day)) {
      // Show existing note if any
      setSelectedDay(day);
      setNote(progress.notes?.[day] || "");
    } else if (progress.status === 'available' || progress.status === 'in_progress') {
      // Complete the day
      onCompleteDay(day);
      setSelectedDay(day);
      setNote("");
    }
  };

  const handleSaveNote = () => {
    if (selectedDay && note.trim()) {
      onSaveNote(selectedDay, note);
    }
    setSelectedDay(null);
    setNote("");
  };

  const handleStart = () => {
    if (progress.status === 'available') {
      onStartExperiment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            {experiment.title}
            <Badge variant="secondary" className="ml-2">
              {experiment.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Experiment Image */}
          <div className={cn("h-64 rounded-2xl relative overflow-hidden bg-gradient-to-br", experiment.color.from, experiment.color.to)}>
            <img 
              src={experiment.image}
              alt={experiment.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Experiment Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                What You'll Do
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {experiment.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instructions</h3>
              <ol className="space-y-2 text-gray-700">
                {experiment.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-semibold mr-3">{index + 1}.</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Daily Tracker */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Progress Tracker</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((day) => (
                    <motion.div
                      key={day}
                      whileHover={{ scale: isLocked ? 1 : 1.02 }}
                      className={cn(
                        "flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer transition-colors",
                        isDayCompleted(day) ? "border-2 border-emerald-200" : "border border-gray-200",
                        isLocked && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => handleDayClick(day)}
                    >
                      <span className="font-medium">Day {day}</span>
                      <div className="flex items-center space-x-2">
                        {progress.notes?.[day] && (
                          <BookOpen className="h-4 w-4 text-blue-500" />
                        )}
                        <button 
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                            isDayCompleted(day) 
                              ? "bg-emerald-500 text-white" 
                              : progress.status === 'available' || progress.status === 'in_progress'
                                ? "bg-gray-200 hover:bg-gray-300"
                                : "bg-gray-100"
                          )}
                          disabled={isLocked}
                        >
                          {isDayCompleted(day) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {progress.status === 'available' && (
                <Button 
                  onClick={handleStart}
                  className={cn("flex-1 py-3 px-6 rounded-xl font-semibold", experiment.color.button, experiment.color.buttonHover)}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Experiment
                </Button>
              )}
              
              {progress.status === 'completed' && (
                <Button 
                  variant="outline"
                  className="flex-1 py-3 px-6 rounded-xl font-semibold"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Progress
                </Button>
              )}

              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {experiment.estimatedTime}
              </div>
            </div>
          </div>
        </div>

        {/* Note Modal */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedDay(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 m-4 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="text-lg font-bold mb-4">Day {selectedDay} Notes</h4>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How did today's practice go? What did you notice?"
                  className="mb-4"
                  rows={4}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleSaveNote} className="flex-1">
                    Save Note
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedDay(null)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
