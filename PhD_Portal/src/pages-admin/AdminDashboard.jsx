"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Users, UserPlus, GraduationCap, UserCheck, BookOpen, BarChart3, Menu, X } from "lucide-react"
import { AddStudentForm, AddFacultyForm, AddCoordinatorForm, AddGuideForm } from "./user-forms"

import { GuideAllocationSystem } from "./guide-allocation"


export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isFacultyDialogOpen, setIsFacultyDialogOpen] = useState(false)
  const [isCoordinatorDialogOpen, setIsCoordinatorDialogOpen] = useState(false)
  const [isGuideDialogOpen, setIsGuideDialogOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalGuides: 0,
    totalCoordinators: 0,
    unassignedStudents: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] Loading dashboard stats...")

      const [usersResponse, allocationsResponse] = await Promise.all([
        apiClient.getUsers(),
        apiClient.getGuideAllocations(),
      ])

      const users = usersResponse.users || []
      const allocations = allocationsResponse.allocations || []

      const students = users.filter((user) => user.role === "student")
      const faculty = users.filter((user) => user.role === "faculty")
      const guides = users.filter((user) => user.role === "guide")
      const coordinators = users.filter((user) => user.role === "coordinator")

      const assignedStudentIds = allocations.map((alloc) => alloc.studentId)
      const unassigned = students.filter((student) => !assignedStudentIds.includes(student._id || student.id))

      setStats({
        totalStudents: students.length,
        totalFaculty: faculty.length,
        totalGuides: guides.length,
        totalCoordinators: coordinators.length,
        unassignedStudents: unassigned.length,
      })

      console.log("[v0] Stats loaded:", {
        students: students.length,
        faculty: faculty.length,
        guides: guides.length,
        coordinators: coordinators.length,
        unassigned: unassigned.length,
      })
    } catch (error) {
      console.error("[v0] Error loading stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStudentSubmit = async (data) => {
    console.log("[v0] Creating student:", data)
    try {
      const result = await apiClient.createUser(data)
      console.log("[v0] Student created successfully:", result)
      setIsStudentDialogOpen(false)
      await loadStats()
    } catch (error) {
      console.error("[v0] Error creating student:", error)
      alert(`Failed to create student: ${error.message}`)
    }
  }

  const handleFacultySubmit = async (data) => {
    console.log("[v0] Creating faculty:", data)
    try {
      const result = await apiClient.createUser(data)
      console.log("[v0] Faculty created successfully:", result)
      setIsFacultyDialogOpen(false)
      await loadStats()
    } catch (error) {
      console.error("[v0] Error creating faculty:", error)
      alert(`Failed to create faculty: ${error.message}`)
    }
  }

  const handleCoordinatorSubmit = async (data) => {
    console.log("[v0] Creating coordinator:", data)
    try {
      const result = await apiClient.createUser(data)
      console.log("[v0] Coordinator created successfully:", result)
      setIsCoordinatorDialogOpen(false)
      await loadStats()
    } catch (error) {
      console.error("[v0] Error creating coordinator:", error)
      alert(`Failed to create coordinator: ${error.message}`)
    }
  }

  const handleGuideSubmit = async (data) => {
    console.log("[v0] Creating guide:", data)
    try {
      const result = await apiClient.createUser(data)
      console.log("[v0] Guide created successfully:", result)
      setIsGuideDialogOpen(false)
      await loadStats()
    } catch (error) {
      console.error("[v0] Error creating guide:", error)
      alert(`Failed to create guide: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">PhD Portal Admin</h1>
              <p className="text-sm text-muted-foreground">User Management Dashboard</p>
            </div>
          </div>
          {/* removed settings button per request */}
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${isSidebarCollapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar min-h-[calc(100vh-4rem)] transition-all duration-300`}
        >
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("overview")}
              title="Overview"
            >
              <BarChart3 className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Overview</span>}
            </Button>
            <Button
              variant={activeTab === "students" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("students")}
              title="Students"
            >
              <Users className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Students</span>}
            </Button>
            <Button
              variant={activeTab === "faculty" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("faculty")}
              title="Faculty"
            >
              <UserCheck className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Faculty</span>}
            </Button>
            <Button
              variant={activeTab === "coordinators" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("coordinators")}
              title="Coordinators"
            >
              <UserPlus className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Coordinators</span>}
            </Button>
            <Button
              variant={activeTab === "guide-allocation" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("guide-allocation")}
              title="Guide Allocation"
            >
              <BookOpen className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Guide Allocation</span>}
            </Button>
            <Button
              variant={activeTab === "guides" ? "default" : "ghost"}
              className={`w-full ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveTab("guides")}
              title="Guides"
            >
              <GraduationCap className="h-4 w-4" />
              {!isSidebarCollapsed && <span className="ml-3">Guides</span>}
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Manage users and guide allocations for the PhD portal system</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{isLoading ? "..." : stats.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Active PhD students</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{isLoading ? "..." : stats.totalFaculty}</div>
                    <p className="text-xs text-muted-foreground">Faculty members</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{isLoading ? "..." : stats.totalGuides}</div>
                    <p className="text-xs text-muted-foreground">Available guides</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
                    <BookOpen className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">{isLoading ? "..." : stats.unassignedStudents}</div>
                    <p className="text-xs text-muted-foreground">Students without guides</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Student Management</h2>
                  <p className="text-muted-foreground">Add and manage PhD students</p>
                </div>
                <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>Create a new student account with academic details</DialogDescription>
                    </DialogHeader>
                    <AddStudentForm onClose={() => setIsStudentDialogOpen(false)} onSubmit={handleStudentSubmit} />
                  </DialogContent>
                </Dialog>
              </div>

              <UserTable userType="student" />
            </div>
          )}

          {activeTab === "faculty" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Faculty Management</h2>
                  <p className="text-muted-foreground">Add and manage faculty members</p>
                </div>
                <Dialog open={isFacultyDialogOpen} onOpenChange={setIsFacultyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Faculty
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Faculty</DialogTitle>
                      <DialogDescription>Create a new faculty account with professional details</DialogDescription>
                    </DialogHeader>
                    <AddFacultyForm onClose={() => setIsFacultyDialogOpen(false)} onSubmit={handleFacultySubmit} />
                  </DialogContent>
                </Dialog>
              </div>

              <UserTable userType="faculty" />
            </div>
          )}

          {activeTab === "coordinators" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Coordinator Management</h2>
                  <p className="text-muted-foreground">Add and manage faculty coordinators</p>
                </div>
                <Dialog open={isCoordinatorDialogOpen} onOpenChange={setIsCoordinatorDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Coordinator
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Coordinator</DialogTitle>
                      <DialogDescription>Create a new faculty coordinator account</DialogDescription>
                    </DialogHeader>
                    <AddCoordinatorForm
                      onClose={() => setIsCoordinatorDialogOpen(false)}
                      onSubmit={handleCoordinatorSubmit}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <UserTable userType="coordinator" />
            </div>
          )}

          {activeTab === "guide-allocation" && <GuideAllocationSystem />}

          {activeTab === "guides" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Guide Management</h2>
                  <p className="text-muted-foreground">Add and manage guides (used in allocations)</p>
                </div>
                <Dialog open={isGuideDialogOpen} onOpenChange={setIsGuideDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Guide
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Guide</DialogTitle>
                      <DialogDescription>Create a new guide account</DialogDescription>
                    </DialogHeader>
                    <AddGuideForm onClose={() => setIsGuideDialogOpen(false)} onSubmit={handleGuideSubmit} />
                  </DialogContent>
                </Dialog>
              </div>
              <UserTable userType="guide" showGuideInfo={true} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
