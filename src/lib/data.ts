export type Exercise = {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  notes?: string
}

export type Workout = {
  id: string
  title: string
  description: string
  exercises: Exercise[]
  duration: number
  date: string
  isOwner: boolean
  category: "strength" | "cardio" | "flexibility" | "hiit" | "yoga"
  difficulty: "beginner" | "intermediate" | "advanced"
  completionStatus?: "completed" | "in-progress" | "not-started"
  completionPercentage?: number
}

export type Statistic = {
  label: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
}

// Mock user workouts
export const userWorkouts: Workout[] = [
  {
    id: "1",
    title: "Morning Strength Routine",
    description: "A full-body strength workout focusing on compound movements",
    exercises: [
      { id: "e1", name: "Squats", sets: 4, reps: 10, weight: 135 },
      { id: "e2", name: "Bench Press", sets: 3, reps: 8, weight: 155 },
      { id: "e3", name: "Deadlifts", sets: 3, reps: 6, weight: 185 },
      { id: "e4", name: "Pull-ups", sets: 3, reps: 8 },
    ],
    duration: 45,
    date: "2023-11-15",
    isOwner: true,
    category: "strength",
    difficulty: "intermediate",
    completionStatus: "completed",
    completionPercentage: 100,
  },
  {
    id: "2",
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training to boost cardio endurance",
    exercises: [
      { id: "e5", name: "Burpees", sets: 3, reps: 15 },
      { id: "e6", name: "Mountain Climbers", sets: 3, reps: 20 },
      { id: "e7", name: "Jump Squats", sets: 3, reps: 12 },
      { id: "e8", name: "Jumping Jacks", sets: 3, reps: 15 },
    ],
    duration: 30,
    date: "2023-11-17",
    isOwner: true,
    category: "cardio",
    difficulty: "advanced",
    completionStatus: "in-progress",
    completionPercentage: 75,
  },
  {
    id: "3",
    title: "Flexibility & Mobility",
    description: "Improve range of motion and prevent injuries",
    exercises: [
      { id: "e9", name: "Hamstring Stretch", sets: 3, reps: 15 },
      { id: "e10", name: "Hip Flexor Stretch", sets: 3, reps: 15 },
      { id: "e11", name: "Shoulder Mobility", sets: 2, reps: 10 },
      { id: "e12", name: "Ankle Mobility", sets: 2, reps: 10 },
    ],
    duration: 20,
    date: "2023-11-18",
    isOwner: true,
    category: "flexibility",
    difficulty: "beginner",
    completionStatus: "not-started",
    completionPercentage: 0,
  },
]

// Mock community workouts
export const communityWorkouts: Workout[] = [
  {
    id: "4",
    title: "Full Body Strength",
    description: "A comprehensive strength workout targeting all major muscle groups",
    exercises: [
      { id: "e13", name: "Barbell Rows", sets: 3, reps: 10, weight: 135 },
      { id: "e14", name: "Overhead Press", sets: 3, reps: 8, weight: 95 },
      { id: "e15", name: "Lunges", sets: 3, reps: 10, weight: 65 },
      { id: "e16", name: "Dips", sets: 3, reps: 12 },
    ],
    duration: 50,
    date: "2023-11-14",
    isOwner: false,
    category: "strength",
    difficulty: "intermediate",
  },
  {
    id: "5",
    title: "Yoga Flow",
    description: "A relaxing yoga session to improve flexibility and mindfulness",
    exercises: [
      { id: "e17", name: "Sun Salutation", sets: 1, reps: 5 },
      { id: "e18", name: "Warrior Poses", sets: 1, reps: 5 },
      { id: "e19", name: "Balance Poses", sets: 1, reps: 5 },
      { id: "e20", name: "Meditation", sets: 1, reps: 5 },
    ],
    duration: 60,
    date: "2023-11-16",
    isOwner: false,
    category: "yoga",
    difficulty: "beginner",
  },
  {
    id: "6",
    title: "Tabata Challenge",
    description: "20 seconds on, 10 seconds off - the ultimate HIIT workout",
    exercises: [
      { id: "e21", name: "Push-ups", sets: 8, reps: 15 },
      { id: "e22", name: "Sit-ups", sets: 8, reps: 15 },
      { id: "e23", name: "Kettlebell Swings", sets: 8, reps: 15, weight: 35 },
      { id: "e24", name: "Box Jumps", sets: 8, reps: 15 },
    ],
    duration: 25,
    date: "2023-11-13",
    isOwner: false,
    category: "hiit",
    difficulty: "advanced",
  },
]

// Mock statistics
export const statistics: Statistic[] = [
  { label: "Workouts Completed", value: 24, change: 4, trend: "up" },
  { label: "Total Workout Time", value: "18h 45m", change: 2.5, trend: "up" },
  { label: "Most Used Exercise", value: "Squats", change: 0, trend: "neutral" },
  { label: "Avg. Workout Duration", value: "42m", change: -3, trend: "down" },
]

// Get a workout by ID
export function getWorkoutById(id: string): Workout | undefined {
  // First check user workouts
  const userWorkout = userWorkouts.find((workout) => workout.id === id)
  if (userWorkout) return userWorkout

  // Then check community workouts
  const communityWorkout = communityWorkouts.find((workout) => workout.id === id)
  if (communityWorkout) return communityWorkout

  // Also check for featured and other workouts that might be in the UI
  // This is a workaround for demo purposes
  if (id.startsWith("featured-") || id.startsWith("rec-") || id.startsWith("all-")) {
    return {
      id,
      title: "Sample Workout",
      description: "This is a sample workout for demonstration purposes.",
      exercises: [
        { id: "e1", name: "Push-ups", sets: 3, reps: 10 },
        { id: "e2", name: "Squats", sets: 3, reps: 15 },
        { id: "e3", name: "Plank", sets: 3, reps: 30 },
      ],
      duration: 30,
      date: new Date().toISOString().split("T")[0],
      isOwner: true,
      category: "strength",
      difficulty: "intermediate",
    }
  }

  // If no workout is found, return undefined
  return undefined
}

