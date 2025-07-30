import { motion } from "framer-motion";
import { Trophy, Gift, Download, Play, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CompletionRewardProps {
  isUnlocked: boolean;
  totalCompleted: number;
}

export default function CompletionReward({ isUnlocked, totalCompleted }: CompletionRewardProps) {
  const rewards = [
    {
      icon: <Download className="h-5 w-5" />,
      title: "Beautiful completion certificate",
      description: "A personalized certificate celebrating your transformation journey"
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Full Self-Experiments Toolkit PDF",
      description: "Advanced guides and extended experiments for continued growth"
    },
    {
      icon: <Play className="h-5 w-5" />,
      title: "Exclusive video playlist",
      description: "Deep-dive content and guided practices from experts"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Advanced experiment guides",
      description: "Next-level practices to accelerate your transformation"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: isUnlocked ? 360 : 0,
              scale: isUnlocked ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 1, repeat: isUnlocked ? Infinity : 0, repeatDelay: 3 },
              scale: { duration: 0.5, repeat: isUnlocked ? Infinity : 0, repeatDelay: 2 }
            }}
          >
            <Trophy className="text-6xl text-yellow-300 mx-auto h-16 w-16" />
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isUnlocked ? "Congratulations! 🎉" : "Complete All 9 to Unlock"}
        </motion.h2>

        <motion.p 
          className="text-xl md:text-2xl mb-8 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isUnlocked 
            ? "You've unlocked all transformation rewards!" 
            : "Your Transformation Certificate & Secret Resources"
          }
        </motion.p>

        <motion.div 
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
            <Gift className="mr-2 h-6 w-6" />
            {isUnlocked ? "Your Unlocked Rewards:" : "🎁 Your Rewards Include:"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex-shrink-0 mt-1">
                  {isUnlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-300" />
                  ) : (
                    <div className="text-green-300">{reward.icon}</div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{reward.title}</div>
                  <div className="text-sm opacity-80">{reward.description}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6 space-y-3"
            >
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3">
                <Download className="mr-2 h-5 w-5" />
                Download Your Certificate
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 font-semibold py-3">
                <Gift className="mr-2 h-5 w-5" />
                Access Full Toolkit ($9 value - FREE!)
              </Button>
            </motion.div>
          )}

          {!isUnlocked && (
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-lg font-semibold mb-2">
                Progress: {totalCompleted}/9 experiments
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <motion.div 
                  className="bg-yellow-300 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalCompleted / 9) * 100}%` }}
                  transition={{ duration: 1, delay: 1.4 }}
                />
              </div>
              <div className="text-sm opacity-80 mt-2">
                {9 - totalCompleted} more experiments to unlock rewards
              </div>
            </motion.div>
          )}
        </motion.div>

        {!isUnlocked && (
          <motion.p 
            className="mt-8 text-lg opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Each experiment builds upon the last, creating lasting transformation
          </motion.p>
        )}
      </div>
    </section>
  );
}
