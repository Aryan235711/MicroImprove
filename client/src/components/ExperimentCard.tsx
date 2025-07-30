import { motion } from "framer-motion";
import { Clock, CheckCircle, Lock, Star, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Experiment, ExperimentProgress } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: Experiment;
  progress: ExperimentProgress;
  onClick: () => void;
}

export default function ExperimentCard({ experiment, progress, onClick }: ExperimentCardProps) {
  const getStatusIcon = () => {
    switch (progress.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-white" />;
      case 'in_progress':
        return <div className="w-3 h-3 bg-white rounded-full animate-pulse" />;
      case 'available':
        return <Star className="h-5 w-5 text-white" />;
      default:
        return <Lock className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = () => {
    switch (progress.status) {
      case 'completed':
        return 'bg-emerald-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'available':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (progress.status) {
      case 'completed':
        return 'Complete';
      case 'in_progress':
        return 'In Progress';
      case 'available':
        return 'Up Next';
      default:
        return 'Locked';
    }
  };

  const getButtonText = () => {
    switch (progress.status) {
      case 'completed':
        return 'View Results';
      case 'in_progress':
        return 'Continue';
      case 'available':
        return experiment.id === 1 ? 'Start Now' : 'Start Soon';
      default:
        return 'Locked';
    }
  };

  const isLocked = progress.status === 'locked';
  const progressPercentage = (progress.completedDays.length / 3) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: experiment.id * 0.1 }}
      whileHover={{ y: -5 }}
      className="touch-feedback"
    >
      <Card 
        className={cn(
          "card-hover overflow-hidden cursor-pointer relative",
          experiment.color.border,
          "border-2",
          isLocked && "opacity-75"
        )}
        onClick={onClick}
      >
        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getStatusColor())}>
            {getStatusIcon()}
          </div>
        </div>

        {/* Hero image */}
        <div className={cn("h-48 relative overflow-hidden bg-gradient-to-br", experiment.color.from, experiment.color.to)}>
          <img 
            src={experiment.image}
            alt={experiment.title}
            className={cn("w-full h-full object-cover mix-blend-overlay", isLocked ? "opacity-50" : "opacity-80")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className={cn(isLocked ? "bg-gray-100 text-gray-600" : `${experiment.color.text} bg-opacity-10`)}>
              {experiment.daysRange}
            </Badge>
            <span className={cn("font-semibold", isLocked ? "text-gray-500" : experiment.color.text)}>
              {getStatusText()}
            </span>
          </div>

          <h3 className={cn("text-xl font-bold mb-2", isLocked ? "text-gray-600" : "text-gray-900")}>
            {experiment.title}
          </h3>

          <p className={cn("mb-4", isLocked ? "text-gray-500" : "text-gray-600")}>
            {experiment.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className={cn("text-sm flex items-center", isLocked ? "text-gray-400" : "text-gray-500")}>
              <Clock className="mr-1 h-4 w-4" />
              {experiment.estimatedTime}
            </span>
            <Button 
              className={cn(
                "px-4 py-2 rounded-lg transition-colors",
                isLocked 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : `${experiment.color.button} text-white ${experiment.color.buttonHover}`
              )}
              disabled={isLocked}
            >
              {progress.status === 'in_progress' && <PlayCircle className="mr-2 h-4 w-4" />}
              {getButtonText()}
            </Button>
          </div>

          {/* Progress bar for in-progress experiments */}
          {progress.status === 'in_progress' && (
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                Day {progress.completedDays.length + 1} of 3
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
