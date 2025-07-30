import { Experiment } from "@shared/schema";

export const experiments: Experiment[] = [
  {
    id: 1,
    title: "Mindful Breathing",
    description: "Practice conscious breathing for 5 minutes daily to increase awareness and create a foundation for all other self-improvement work.",
    instructions: [
      "Find a quiet place to sit comfortably",
      "Set a timer for 5 minutes",
      "Focus solely on your breath, in and out",
      "When your mind wanders, gently return to your breath",
      "Log your experience in the daily tracker"
    ],
    duration: "3 days",
    daysRange: "Day 1-3",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Mindfulness",
    estimatedTime: "5 min/day",
    color: {
      from: "from-emerald-400",
      to: "to-cyan-500",
      border: "border-emerald-200",
      text: "text-emerald-600",
      button: "bg-emerald-500",
      buttonHover: "hover:bg-emerald-600"
    }
  },
  {
    id: 2,
    title: "Cold Exposure",
    description: "End your shower with 30 seconds of cold water to boost resilience and activate your body's adaptive response systems.",
    instructions: [
      "Take your regular warm shower",
      "At the end, turn the water to cold",
      "Stay under cold water for 30 seconds",
      "Focus on your breathing during exposure",
      "Record your experience and feelings"
    ],
    duration: "3 days",
    daysRange: "Day 4-6",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Physical",
    estimatedTime: "30 sec/day",
    color: {
      from: "from-blue-400",
      to: "to-indigo-600",
      border: "border-blue-200",
      text: "text-blue-600",
      button: "bg-blue-500",
      buttonHover: "hover:bg-blue-600"
    }
  },
  {
    id: 3,
    title: "Digital Detox",
    description: "Spend 1 hour each day completely disconnected from devices to reclaim your attention and mental clarity.",
    instructions: [
      "Choose a consistent 1-hour time slot",
      "Turn off all devices and put them away",
      "Engage in analog activities (reading, walking, etc.)",
      "Notice any urges to check devices",
      "Reflect on the experience afterwards"
    ],
    duration: "3 days",
    daysRange: "Day 7-9",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Mental",
    estimatedTime: "1 hour/day",
    color: {
      from: "from-amber-400",
      to: "to-orange-500",
      border: "border-amber-200",
      text: "text-amber-600",
      button: "bg-amber-500",
      buttonHover: "hover:bg-amber-600"
    }
  },
  {
    id: 4,
    title: "Gratitude Practice",
    description: "Write down 3 things you're grateful for each morning to shift your mindset toward abundance and positivity.",
    instructions: [
      "Keep a notebook by your bed",
      "Upon waking, write 3 specific things you're grateful for",
      "Be detailed and specific in your gratitude",
      "Feel the emotion behind each item",
      "Review your entries at the end of 3 days"
    ],
    duration: "3 days",
    daysRange: "Day 10-12",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Emotional",
    estimatedTime: "5 min/day",
    color: {
      from: "from-purple-400",
      to: "to-pink-500",
      border: "border-purple-200",
      text: "text-purple-600",
      button: "bg-purple-500",
      buttonHover: "hover:bg-purple-600"
    }
  },
  {
    id: 5,
    title: "Movement Meditation",
    description: "Practice slow, mindful movement for 10 minutes daily to connect mind and body through conscious motion.",
    instructions: [
      "Find a quiet space where you can move freely",
      "Start with simple stretches or yoga poses",
      "Move slowly and deliberately",
      "Focus on how each movement feels",
      "End with 2 minutes of stillness"
    ],
    duration: "3 days",
    daysRange: "Day 13-15",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Physical",
    estimatedTime: "10 min/day",
    color: {
      from: "from-teal-400",
      to: "to-blue-500",
      border: "border-teal-200",
      text: "text-teal-600",
      button: "bg-teal-500",
      buttonHover: "hover:bg-teal-600"
    }
  },
  {
    id: 6,
    title: "Mindful Eating",
    description: "Eat one meal per day in complete silence and awareness to develop a deeper relationship with food and nutrition.",
    instructions: [
      "Choose one meal to eat mindfully",
      "Remove all distractions (phones, TV, books)",
      "Eat slowly, chewing each bite thoroughly",
      "Notice flavors, textures, and sensations",
      "Pay attention to hunger and fullness cues"
    ],
    duration: "3 days",
    daysRange: "Day 16-18",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Nutrition",
    estimatedTime: "20 min/day",
    color: {
      from: "from-green-400",
      to: "to-emerald-500",
      border: "border-green-200",
      text: "text-green-600",
      button: "bg-green-500",
      buttonHover: "hover:bg-green-600"
    }
  },
  {
    id: 7,
    title: "Sleep Ritual",
    description: "Create a 30-minute technology-free bedtime routine to improve sleep quality and evening mindfulness.",
    instructions: [
      "Set a consistent bedtime",
      "Turn off all screens 30 minutes before",
      "Engage in calming activities (reading, meditation)",
      "Prepare your space for optimal sleep",
      "Reflect on the day briefly before sleep"
    ],
    duration: "3 days",
    daysRange: "Day 19-21",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Sleep",
    estimatedTime: "30 min/day",
    color: {
      from: "from-indigo-400",
      to: "to-purple-500",
      border: "border-indigo-200",
      text: "text-indigo-600",
      button: "bg-indigo-500",
      buttonHover: "hover:bg-indigo-600"
    }
  },
  {
    id: 8,
    title: "Deep Connection",
    description: "Have one meaningful conversation daily without distractions to strengthen relationships and communication skills.",
    instructions: [
      "Choose someone important in your life",
      "Put away all devices during conversation",
      "Ask deeper questions about their thoughts and feelings",
      "Listen actively without planning your response",
      "Share something meaningful about yourself"
    ],
    duration: "3 days",
    daysRange: "Day 22-24",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Social",
    estimatedTime: "15 min/day",
    color: {
      from: "from-pink-400",
      to: "to-rose-500",
      border: "border-pink-200",
      text: "text-pink-600",
      button: "bg-pink-500",
      buttonHover: "hover:bg-pink-600"
    }
  },
  {
    id: 9,
    title: "Integration",
    description: "Reflect on your journey and design your personal practice by integrating the most impactful experiments into your life.",
    instructions: [
      "Review notes from all previous experiments",
      "Identify which practices felt most beneficial",
      "Create a sustainable daily routine",
      "Set intentions for continuing your growth",
      "Celebrate your transformation journey"
    ],
    duration: "3 days",
    daysRange: "Day 25-27",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Integration",
    estimatedTime: "15 min/day",
    color: {
      from: "from-violet-400",
      to: "to-purple-600",
      border: "border-violet-200",
      text: "text-violet-600",
      button: "bg-violet-500",
      buttonHover: "hover:bg-violet-600"
    }
  }
];

export function getExperimentById(id: number): Experiment | undefined {
  return experiments.find(exp => exp.id === id);
}

export function getNextAvailableExperiment(completedIds: number[]): Experiment | undefined {
  return experiments.find(exp => !completedIds.includes(exp.id));
}
