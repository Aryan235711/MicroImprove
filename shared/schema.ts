import { z } from "zod";

export const experimentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  instructions: z.array(z.string()),
  duration: z.string(),
  daysRange: z.string(),
  image: z.string(),
  category: z.string(),
  estimatedTime: z.string(),
  color: z.object({
    from: z.string(),
    to: z.string(),
    border: z.string(),
    text: z.string(),
    button: z.string(),
    buttonHover: z.string()
  })
});

export const experimentProgressSchema = z.object({
  experimentId: z.number(),
  status: z.enum(['locked', 'available', 'in_progress', 'completed']),
  completedDays: z.array(z.number()),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  notes: z.record(z.number(), z.string()).optional()
});

export const userProgressSchema = z.object({
  experiments: z.array(experimentProgressSchema),
  totalCompleted: z.number(),
  currentStreak: z.number(),
  rewardUnlocked: z.boolean()
});

export type Experiment = z.infer<typeof experimentSchema>;
export type ExperimentProgress = z.infer<typeof experimentProgressSchema>;
export type UserProgress = z.infer<typeof userProgressSchema>;
