import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Edit, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWorkoutById } from "@/lib/data"

interface WorkoutDetailPageProps {
  params: {
    id: string
  }
}

export default function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const workout = getWorkoutById(params.id)

  if (!workout) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex items-center justify-between p-4 md:p-6 max-w-full mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{workout.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{workout.duration} minutes</span>
                <span>•</span>
                <span>{formatDate(workout.date)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {workout.isOwner && (
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href={`/workout/${workout.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Workout
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {workout.category}
              </Badge>
              <Badge className="capitalize bg-green-600">{workout.difficulty}</Badge>
            </div>
            <p className="text-muted-foreground">{workout.description}</p>
          </div>

          <Card className="border rounded-lg">
            <CardHeader className="bg-white border-b">
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div>
                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="border-b last:border-0">
                    <div className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{exercise.name}</h3>
                          <Badge variant="outline" className="rounded-full">
                            {exercise.sets} {exercise.sets === 1 ? "set" : "sets"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {exercise.reps && (
                            <div>
                              <span className="text-muted-foreground">Reps: </span>
                              <span>{exercise.reps}</span>
                            </div>
                          )}
                          {exercise.weight && (
                            <div>
                              <span className="text-muted-foreground">Weight: </span>
                              <span>{exercise.weight} lbs</span>
                            </div>
                          )}
                          {exercise.duration && (
                            <div>
                              <span className="text-muted-foreground">Duration: </span>
                              <span>{exercise.duration} sec</span>
                            </div>
                          )}
                          {exercise.notes && (
                            <div className="col-span-2">
                              <span className="text-muted-foreground">Notes: </span>
                              <span>{exercise.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

