import { UserProgress, ExperimentProgress } from "@shared/schema";

const STORAGE_KEY = "nine_experiments_progress";

export function getProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading progress:", error);
  }

  // Default progress state
  return {
    experiments: Array.from({ length: 9 }, (_, i) => ({
      experimentId: i + 1,
      status: i === 0 ? 'available' : 'locked',
      completedDays: []
    })),
    totalCompleted: 0,
    currentStreak: 0,
    rewardUnlocked: false
  };
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

export function markDayComplete(experimentId: number, day: number): UserProgress {
  const progress = getProgress();
  const experiment = progress.experiments.find(exp => exp.experimentId === experimentId);
  
  if (experiment) {
    if (!experiment.completedDays.includes(day)) {
      experiment.completedDays.push(day);
      experiment.completedDays.sort();
    }

    // Check if experiment is complete (all 3 days done)
    if (experiment.completedDays.length === 3 && experiment.status !== 'completed') {
      experiment.status = 'completed';
      experiment.completedAt = new Date().toISOString();
      progress.totalCompleted++;

      // Unlock next experiment
      const nextExp = progress.experiments.find(exp => exp.experimentId === experimentId + 1);
      if (nextExp && nextExp.status === 'locked') {
        nextExp.status = 'available';
      }

      // Check if all experiments are complete
      if (progress.totalCompleted === 9) {
        progress.rewardUnlocked = true;
      }
    } else if (experiment.status === 'available') {
      experiment.status = 'in_progress';
      experiment.startedAt = new Date().toISOString();
    }
  }

  saveProgress(progress);
  return progress;
}

export function startExperiment(experimentId: number): UserProgress {
  const progress = getProgress();
  const experiment = progress.experiments.find(exp => exp.experimentId === experimentId);
  
  if (experiment && experiment.status === 'available') {
    experiment.status = 'in_progress';
    experiment.startedAt = new Date().toISOString();
  }

  saveProgress(progress);
  return progress;
}

export function addNote(experimentId: number, day: number, note: string): UserProgress {
  const progress = getProgress();
  const experiment = progress.experiments.find(exp => exp.experimentId === experimentId);
  
  if (experiment) {
    if (!experiment.notes) {
      experiment.notes = {};
    }
    experiment.notes[day] = note;
  }

  saveProgress(progress);
  return progress;
}

export function resetProgress(): UserProgress {
  const defaultProgress = {
    experiments: Array.from({ length: 9 }, (_, i) => ({
      experimentId: i + 1,
      status: i === 0 ? 'available' : 'locked',
      completedDays: []
    })),
    totalCompleted: 0,
    currentStreak: 0,
    rewardUnlocked: false
  } as UserProgress;

  saveProgress(defaultProgress);
  return defaultProgress;
}
