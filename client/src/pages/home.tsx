import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Target } from "lucide-react";
import ExperimentCard from "@/components/ExperimentCard";
import ProgressOverview from "@/components/ProgressOverview";
import ExperimentModal from "@/components/ExperimentModal";
import CelebrationModal from "@/components/CelebrationModal";
import CompletionReward from "@/components/CompletionReward";
import Footer from "@/components/Footer";
import { experiments, getExperimentById } from "@/lib/experiments";
import { useExperiments } from "@/hooks/use-experiments";
import { Experiment } from "@shared/schema";

export default function Home() {
  const { 
    progress, 
    isLoading, 
    completeDay, 
    startExp, 
    saveNote, 
    getExperimentProgress, 
    getCompletionPercentage 
  } = useExperiments();

  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    experiment: string;
    completed: number;
    percentage: number;
  } | null>(null);

  const handleExperimentClick = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setShowModal(true);
  };

  const handleCompleteDay = async (day: number) => {
    if (!selectedExperiment) return;
    
    const newProgress = await completeDay(selectedExperiment.id, day);
    const expProgress = newProgress.experiments.find(exp => exp.experimentId === selectedExperiment.id);
    
    // Check if experiment was just completed
    if (expProgress?.status === 'completed' && expProgress.completedDays.length === 3) {
      setCelebrationData({
        experiment: selectedExperiment.title,
        completed: newProgress.totalCompleted,
        percentage: getCompletionPercentage()
      });
      setShowModal(false);
      setShowCelebration(true);
    }
  };

  const handleStartExperiment = async () => {
    if (!selectedExperiment) return;
    await startExp(selectedExperiment.id);
  };

  const handleSaveNote = async (day: number, note: string) => {
    if (!selectedExperiment) return;
    await saveNote(selectedExperiment.id, day, note);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white py-6 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="floating-animation inline-block">The 9 Experiments</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-medium opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Micro Self-Improvement Platform
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl opacity-80 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            9 Simple experiments to transform your brain-body awareness
          </motion.p>
        </div>

        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-15 rounded-lg"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-white bg-opacity-10 transform rotate-45"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [45, 50, 45]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Additional decorative elements */}
        <div className="absolute top-20 right-1/4">
          <Sparkles className="h-8 w-8 text-white opacity-30 floating-animation" />
        </div>
        <div className="absolute bottom-20 left-1/3">
          <Brain className="h-6 w-6 text-white opacity-25 pulse-slow" />
        </div>
        <div className="absolute top-1/3 right-10">
          <Target className="h-10 w-10 text-white opacity-20 bounce-slow" />
        </div>
      </header>

      {/* Progress Overview */}
      <ProgressOverview 
        progress={progress} 
        completionPercentage={completionPercentage} 
      />

      {/* Experiments Grid */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose Your Experiment
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment) => {
              const expProgress = getExperimentProgress(experiment.id);
              return expProgress ? (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  progress={expProgress}
                  onClick={() => handleExperimentClick(experiment)}
                />
              ) : null;
            })}
          </div>
        </div>
      </main>

      {/* Completion Reward Section */}
      <CompletionReward 
        isUnlocked={progress.rewardUnlocked}
        totalCompleted={progress.totalCompleted}
      />

      {/* Footer */}
      <Footer />

      {/* Experiment Modal */}
      <ExperimentModal
        experiment={selectedExperiment}
        progress={selectedExperiment ? getExperimentProgress(selectedExperiment.id) : null}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCompleteDay={handleCompleteDay}
        onStartExperiment={handleStartExperiment}
        onSaveNote={handleSaveNote}
      />

      {/* Celebration Modal */}
      {celebrationData && (
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => setShowCelebration(false)}
          completedExperiment={celebrationData.experiment}
          totalCompleted={celebrationData.completed}
          completionPercentage={celebrationData.percentage}
        />
      )}
    </div>
  );
}
