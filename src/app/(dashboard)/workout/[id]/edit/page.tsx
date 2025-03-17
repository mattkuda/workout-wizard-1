"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { getWorkoutById, type Exercise } from "@/lib/data"
import { notFound } from "next/navigation"

interface WorkoutEditPageProps {
  params: {
    id: string
  }
}

export default function WorkoutEditPage({ params }: WorkoutEditPageProps) {
  const router = useRouter()
  const workoutData = getWorkoutById(params.id)

  if (!workoutData) {
    notFound()
  }

  const [workout, setWorkout] = useState(
    workoutData
      ? {
        title: workoutData.title,
        description: workoutData.description,
        category: workoutData.category,
        difficulty: workoutData.difficulty,
        duration: workoutData.duration,
        exercises: [...workoutData.exercises],
      }
      : {
        title: "",
        description: "",
        category: "strength",
        difficulty: "beginner",
        duration: 30,
        exercises: [],
      },
  )

  useEffect(() => {
    if (workoutData) {
      setWorkout({
        title: workoutData.title,
        description: workoutData.description,
        category: workoutData.category,
        difficulty: workoutData.difficulty,
        duration: workoutData.duration,
        exercises: [...workoutData.exercises],
      })
    }
  }, [workoutData])

  if (!workoutData.isOwner) {
    // Redirect if not the owner
    router.push(`/workout/${params.id}`)
    return null
  }

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const updatedExercises = [...workout.exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    }

    // @ts-expect-error sddsaf
    setWorkout({ ...workout, exercises: updatedExercises })
  }

  const addExercise = () => {
    const newExercise: Exercise = {
      id: `new-${Date.now()}`,
      name: "",
      sets: 1,
      reps: 10,
    }
    setWorkout({
      ...workout,
      // @ts-expect-error sddsaf
      exercises: [...workout.exercises, newExercise],
    })
  }

  const removeExercise = (index: number) => {
    const updatedExercises = [...workout.exercises]
    updatedExercises.splice(index, 1)
    // @ts-expect-error sddsaf
    setWorkout({ ...workout, exercises: updatedExercises })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to the database
    console.log("Saving workout:", workout)
    // Redirect back to the workout detail page
    router.push(`/workout/${params.id}`)
  }

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex items-center p-4 md:p-6 max-w-full mx-auto">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/workout/${params.id}`}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight ml-4">Edit Workout</h1>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-full mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Workout Title</Label>
              <Input
                id="title"
                value={workout.title}
                onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={workout.duration}
                onChange={(e) => setWorkout({ ...workout, duration: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={workout.category}
                // @ts-expect-error sddsaf
                onValueChange={(value) => setWorkout({ ...workout, category: value as string })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={workout.difficulty}
                // @ts-expect-error sddsaf
                onValueChange={(value) => setWorkout({ ...workout, difficulty: value as string })}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={workout.description}
                onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Exercises</CardTitle>
              <Button type="button" onClick={addExercise} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="space-y-4">
                    {index > 0 && <Separator />}
                    <div className="flex items-center justify-between pt-4">
                      <h3 className="font-medium">Exercise {index + 1}</h3>
                      <Button
                        type="button"
                        onClick={() => removeExercise(index)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove exercise</span>
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`exercise-name-${index}`}>Name</Label>
                        <Input
                          id={`exercise-name-${index}`}
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exercise-sets-${index}`}>Sets</Label>
                        <Input
                          id={`exercise-sets-${index}`}
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(index, "sets", Number.parseInt(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exercise-reps-${index}`}>Reps</Label>
                        <Input
                          id={`exercise-reps-${index}`}
                          type="number"
                          value={exercise.reps || ""}
                          onChange={(e) => handleExerciseChange(index, "reps", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exercise-weight-${index}`}>Weight (lbs)</Label>
                        <Input
                          id={`exercise-weight-${index}`}
                          type="number"
                          value={exercise.weight || ""}
                          onChange={(e) => handleExerciseChange(index, "weight", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exercise-duration-${index}`}>Duration (seconds)</Label>
                        <Input
                          id={`exercise-duration-${index}`}
                          type="number"
                          value={exercise.duration || ""}
                          onChange={(e) => handleExerciseChange(index, "duration", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`exercise-notes-${index}`}>Notes</Label>
                        <Textarea
                          id={`exercise-notes-${index}`}
                          value={exercise.notes || ""}
                          onChange={(e) => handleExerciseChange(index, "notes", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {workout.exercises.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground">No exercises added yet.</p>
                    <Button type="button" onClick={addExercise} variant="outline" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Exercise
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={`/workout/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

