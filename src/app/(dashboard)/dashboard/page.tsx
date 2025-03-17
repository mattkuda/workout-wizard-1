import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Filter, MoreHorizontal, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { userWorkouts } from "@/lib/data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  // Featured workout data
  const featuredWorkout = {
    id: "featured-1",
    title: "Total Body Transformation",
    description:
      "By combining strength training, cardio, and flexibility exercises, this class offers a well-rounded approach to fitness that will help you build strength, improve endurance and mobility.",
    exercises: 15,
    duration: 30,
    trainers: ["Jordan Reed", "Emily Thompson"],
    price: 39.99,
    image: "/placeholder.svg?height=300&width=400",
    level: "Advanced",
    category: "Full Body Workout",
  }

  // Recommended workouts data
  const recommendedWorkouts = [
    {
      id: "rec-1",
      title: "Strength Mastery",
      category: "Strength Training",
      level: "Advanced",
      videos: 12,
      price: 59.99,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: "rec-2",
      title: "Ultimate Cardio Challenge",
      category: "Cardio Workouts",
      level: "Intermediate",
      videos: 10,
      price: 49.99,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: "rec-3",
      title: "Flexibility & Balance",
      category: "Flexibility & Mobility",
      level: "Intermediate",
      videos: 8,
      price: 39.99,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: "rec-4",
      title: "Core Strength Builder",
      category: "Strength Training",
      level: "Advanced",
      videos: 10,
      price: 54.99,
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  // All workouts data
  const allWorkouts = [
    {
      id: "all-1",
      title: "Mobility & Flexibility",
      category: "Flexibility & Mobility",
      trainer: "Sarah Lee",
      videos: 8,
      duration: 30,
      level: "Beginner",
      price: 39.99,
      icon: "🧘‍♀️",
    },
    {
      id: "all-2",
      title: "High-Intensity Bootcamp",
      category: "Cardio & Strength Training",
      trainer: "Emily Thompson",
      videos: 12,
      duration: 45,
      level: "Advanced",
      price: 69.99,
      icon: "🏋️‍♂️",
    },
    {
      id: "all-3",
      title: "Functional Core Stability",
      category: "Core Training",
      trainer: "Jordan Reed",
      videos: 9,
      duration: 25,
      level: "All Levels",
      price: 54.99,
      icon: "💪",
    },
    {
      id: "all-4",
      title: "Strength Endurance Circuit",
      category: "Strength Training",
      trainer: "Alex Morgan",
      videos: 10,
      duration: 50,
      level: "Intermediate",
      price: 59.99,
      icon: "🏋️‍♀️",
    },
    {
      id: "all-5",
      title: "Restorative Yoga",
      category: "Mind & Body",
      trainer: "Emily Davis",
      videos: 10,
      duration: 60,
      level: "All Levels",
      price: 49.99,
      icon: "🧘‍♂️",
    },
    {
      id: "all-6",
      title: "Bodyweight Warrior",
      category: "Bodyweight Training",
      trainer: "Jordan Blake",
      videos: 10,
      duration: 40,
      level: "Intermediate",
      price: 49.99,
      icon: "💪",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workouts</h1>
          <p className="text-muted-foreground">Enhance Your Skills with Expert-Led Workouts</p>
        </div>
      </div>

      {/* My Workouts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Workouts</h2>
          <Tabs defaultValue="active" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {userWorkouts.map((workout) => (
            <Link href={`/workout/${workout.id}`} key={workout.id} className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg mb-2">
                      {workout.category === "strength"
                        ? "💪"
                        : workout.category === "cardio"
                          ? "🏃"
                          : workout.category === "flexibility"
                            ? "🧘‍♀️"
                            : workout.category === "hiit"
                              ? "⚡"
                              : "🧠"}
                    </div>
                    <CardTitle className="text-base">{workout.title}</CardTitle>
                    <CardDescription className="text-xs capitalize">
                      {workout.category} • {workout.difficulty}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{workout.completionPercentage}% Complete</span>
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                  <Progress value={workout.completionPercentage} className="h-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Workout Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Workout</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src={featuredWorkout.image || "/placeholder.svg"}
                alt={featuredWorkout.title}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex gap-2 mb-2">
                <Badge variant="outline" className="rounded-md">
                  {featuredWorkout.category}
                </Badge>
                <Badge className="rounded-md bg-amber-500">{featuredWorkout.level}</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">{featuredWorkout.title}</h3>
              <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{featuredWorkout.exercises} exercises</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{featuredWorkout.duration} minutes per session</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{featuredWorkout.description}</p>
              <p className="text-sm mb-4">
                <span className="font-semibold">Trainers: </span>
                {featuredWorkout.trainers.join(", ")}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">${featuredWorkout.price}</div>
                <Button asChild>
                  <Link href={`/workout/${featuredWorkout.id}`}>View Workout</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Workouts Section */}
      <div className="md:flex gap-6">
        <div className="md:w-3/4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">All Workouts</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search class, trainer, etc."
                  className="w-[200px] pl-8 h-9 md:w-[260px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    All Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Categories</DropdownMenuItem>
                  <DropdownMenuItem>Strength</DropdownMenuItem>
                  <DropdownMenuItem>Cardio</DropdownMenuItem>
                  <DropdownMenuItem>Flexibility</DropdownMenuItem>
                  <DropdownMenuItem>HIIT</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    All Level
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Levels</DropdownMenuItem>
                  <DropdownMenuItem>Beginner</DropdownMenuItem>
                  <DropdownMenuItem>Intermediate</DropdownMenuItem>
                  <DropdownMenuItem>Advanced</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-4">
            {allWorkouts.map((workout) => (
              <Card key={workout.id} className="overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl mr-4">
                    <span>{workout.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{workout.title}</h3>
                    <p className="text-xs text-muted-foreground">{workout.category}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{workout.videos} videos</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{workout.duration} minutes per session</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        workout.level === "Beginner"
                          ? "secondary"
                          : workout.level === "Intermediate"
                            ? "default"
                            : workout.level === "Advanced"
                              ? "destructive"
                              : "outline"
                      }
                      className="ml-2"
                    >
                      {workout.level}
                    </Badge>
                    <div className="text-right min-w-[100px]">
                      <div className="font-bold">${workout.price}</div>
                      <div className="text-xs text-muted-foreground">for the full course</div>
                    </div>
                    <Button asChild variant="outline" className="ml-4">
                      <Link href={`/workout/${workout.id}`}>View Class</Link>
                    </Button>
                  </div>
                  <div className="md:hidden flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        workout.level === "Beginner"
                          ? "secondary"
                          : workout.level === "Intermediate"
                            ? "default"
                            : workout.level === "Advanced"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {workout.level}
                    </Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/workout/${workout.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-full bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-full">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-full">
                3
              </Button>
              <span className="mx-2">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-full">
                7
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="md:w-1/4 mt-6 md:mt-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended Workouts</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {recommendedWorkouts.map((workout) => (
              <Card key={workout.id} className="overflow-hidden">
                <div className="flex p-4 gap-4">
                  <Image
                    src={workout.image || "/placeholder.svg"}
                    alt={workout.title}
                    width={120}
                    height={80}
                    className="rounded-md w-20 h-20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-muted-foreground mb-1">{workout.category}</div>
                    <h3 className="font-bold mb-1">{workout.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {workout.level}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{workout.videos} videos</div>
                    </div>
                    <div className="text-sm font-bold">${workout.price}</div>
                    <div className="text-xs text-muted-foreground">for the full course</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

