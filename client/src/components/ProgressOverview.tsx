import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserProgress } from "@shared/schema";

interface ProgressOverviewProps {
  progress: UserProgress;
  completionPercentage: number;
}

export default function ProgressOverview({ progress, completionPercentage }: ProgressOverviewProps) {
  // Calculate progress ring
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <section className="py-8 px-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6" />
                Your Progress
              </h2>
              <p className="opacity-90">Complete all 9 experiments to unlock your reward!</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Progress Ring */}
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="white" 
                    strokeOpacity="0.3" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="white" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="progress-ring"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{progress.totalCompleted}</span>
                  <span className="text-sm">/9</span>
                </div>
              </div>
              <div className="text-right">
                <motion.div 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {completionPercentage}%
                </motion.div>
                <div className="text-sm opacity-90">Complete</div>
              </div>
            </div>
          </div>

          {/* Achievement indicators */}
          {progress.totalCompleted > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 flex items-center space-x-4"
            >
              <div className="flex items-center text-sm opacity-90">
                <Star className="mr-1 h-4 w-4" />
                {progress.totalCompleted} experiment{progress.totalCompleted !== 1 ? 's' : ''} completed
              </div>
              {progress.currentStreak > 0 && (
                <div className="flex items-center text-sm opacity-90">
                  <Trophy className="mr-1 h-4 w-4" />
                  {progress.currentStreak} day streak
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
