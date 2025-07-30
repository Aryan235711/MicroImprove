import { useState, useEffect } from "react";
import { UserProgress } from "@shared/schema";
import { getProgress, markDayComplete, startExperiment, addNote, resetProgress } from "@/lib/storage";

export function useExperiments() {
  const [progress, setProgress] = useState<UserProgress>(getProgress);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completeDay = async (experimentId: number, day: number) => {
    setIsLoading(true);
    try {
      const newProgress = markDayComplete(experimentId, day);
      setProgress(newProgress);
      return newProgress;
    } finally {
      setIsLoading(false);
    }
  };

  const startExp = async (experimentId: number) => {
    setIsLoading(true);
    try {
      const newProgress = startExperiment(experimentId);
      setProgress(newProgress);
      return newProgress;
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async (experimentId: number, day: number, note: string) => {
    setIsLoading(true);
    try {
      const newProgress = addNote(experimentId, day, note);
      setProgress(newProgress);
      return newProgress;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = async () => {
    setIsLoading(true);
    try {
      const newProgress = resetProgress();
      setProgress(newProgress);
      return newProgress;
    } finally {
      setIsLoading(false);
    }
  };

  const getExperimentProgress = (experimentId: number) => {
    return progress.experiments.find(exp => exp.experimentId === experimentId);
  };

  const getCompletionPercentage = () => {
    return Math.round((progress.totalCompleted / 9) * 100);
  };

  return {
    progress,
    isLoading,
    completeDay,
    startExp,
    saveNote,
    reset,
    getExperimentProgress,
    getCompletionPercentage
  };
}
