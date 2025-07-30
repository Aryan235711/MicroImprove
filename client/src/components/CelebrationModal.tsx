import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Gift, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedExperiment: string;
  totalCompleted: number;
  completionPercentage: number;
}

export default function CelebrationModal({ 
  isOpen, 
  onClose, 
  completedExperiment, 
  totalCompleted, 
  completionPercentage 
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const confetti = [];
    
    for (let i = 0; i < 50; i++) {
      confetti.push(
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full pointer-events-none"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * window.innerWidth,
            top: -10
          }}
          initial={{ y: -10, rotate: 0, opacity: 1 }}
          animate={{ 
            y: window.innerHeight + 10, 
            rotate: 720, 
            opacity: 0 
          }}
          transition={{ 
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
        />
      );
    }
    
    return confetti;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-8 relative overflow-hidden">
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && createConfetti()}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2 
          }}
        >
          <div className="text-6xl mb-4">🎉</div>
          
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experiment Complete!
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Congratulations! You've successfully completed <strong>{completedExperiment}</strong>. 
            You're one step closer to transformation.
          </motion.p>

          <motion.div 
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white p-4 rounded-2xl mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold flex items-center">
                <Trophy className="mr-2 h-4 w-4" />
                Progress: {totalCompleted}/9 Experiments
              </span>
              <span className="text-xl font-bold">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-white/30" />
          </motion.div>

          {totalCompleted === 9 ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">
                All Experiments Complete!
              </h3>
              <p className="text-sm text-gray-600">
                You've unlocked your transformation rewards!
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center justify-center text-amber-600 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Star className="mr-2 h-5 w-5" />
              <span className="font-medium">
                {9 - totalCompleted} more to unlock your reward
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Button 
              onClick={onClose}
              className="bg-emerald-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              {totalCompleted === 9 ? (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Claim Rewards
                </>
              ) : (
                <>
                  Continue Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
