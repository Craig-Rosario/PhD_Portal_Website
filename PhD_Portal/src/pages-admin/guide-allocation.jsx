"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Search, UserPlus, Users, BookOpen } from "lucide-react"


export function GuideAllocationSystem() {
  const [students, setStudents] = useState([])
  const [faculty, setFaculty] = useState([])
  const [allocations, setAllocations] = useState([])
  const [preferencesByStudentId, setPreferencesByStudentId] = useState({}) // studentId -> [guideId1, guideId2, guideId3]
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const getId = (doc) => doc?._id || doc?.id

  const fetchData = async () => {
    try {
      const [
        { users: studentList = [] } = {},
        { users: guideList = [] } = {},
        { allocations: allocs = [] } = {},
        preferencesResp = {},
      ] = await Promise.all([
        apiClient.getUsers({ role: "student" }),
        apiClient.getUsers({ role: "guide" }), // changed from faculty
        apiClient.getGuideAllocations(),
        apiClient.getPreferences(),
      ])

      setStudents(studentList)
      setFaculty(guideList) // keep state name, but it holds guides now
      setAllocations(allocs)

      const prefs = {}
      const prefArray = preferencesResp.preferences || preferencesResp || []
      prefArray.forEach((p) => {
        const sid = p.studentId
        // preferences contain guideIds now, but keep fallback names for compatibility
        const list = p.preferences || p.preferenceIds || p.list || []
        prefs[sid] = list.slice(0, 3)
      })
      setPreferencesByStudentId(prefs)
    } catch (error) {
      console.log("[v0] Failed to fetch data:", error.message)
    }
  }

  const handleAssignGuide = async () => {
    if (!selectedStudent || !selectedFaculty) return
    try {
      const studentId = getId(selectedStudent)
      const guideId = selectedFaculty
      const result = await apiClient.createGuideAllocation({ studentId, guideId, facultyId: guideId }) // send both keys
      if (result?.allocation) {
        setAllocations([...allocations, result.allocation])
      }
      setIsDialogOpen(false)
      setSelectedStudent(null)
      setSelectedFaculty("")
    } catch (error) {
      console.log("[v0] Failed to assign guide:", error.message)
    }
  }

  const unassignedStudents = students.filter(
    (student) => !allocations.some((allocation) => allocation.studentId === getId(student)),
  )

  const filteredStudents = unassignedStudents.filter(
    (student) =>
      student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.svvNetId?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFacultyById = (id) => faculty.find((f) => getId(f) === id) // actually guides
  const getStudentById = (id) => students.find((s) => getId(s) === id)

  const getFacultyCapacity = (id) => {
    const guide = getFacultyById(id)
    const currentStudents = allocations.filter((a) => (a.guideId || a.facultyId) === id).length
    const maxStudents = Number.parseInt(guide?.maxStudents || 5)
    return { current: currentStudents, max: maxStudents }
  }

  const renderPreferenceBadges = (student) => {
    const sid = getId(student)
    const prefIds = preferencesByStudentId[sid] || []
    if (prefIds.length === 0) {
      return <span className="text-xs text-muted-foreground">No preferences</span>
    }
    return (
      <div className="flex flex-wrap gap-1">
        {prefIds.slice(0, 3).map((fid, idx) => {
          const f = getFacultyById(fid)
          const name = f ? `${f.firstName} ${f.lastName}` : fid
          const labels = ["1st", "2nd", "3rd"]
          return (
            <Badge key={`${sid}-${fid}-${idx}`} variant="secondary" className="text-xs">
              {labels[idx]}: {name}
            </Badge>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Guide Allocation System</h2>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Unassigned Students</p>
                <p className="text-2xl font-bold">{unassignedStudents.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Allocations</p>
                <p className="text-2xl font-bold">{allocations.length}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Unassigned Students
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No unassigned students found</p>
              ) : (
                filteredStudents.map((student) => (
                  <div key={getId(student)} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{student.svvNetId}</p>
                      {/* Show the student's 3 preferences inline, adjacent to their name */}
                      <div className="mt-1">{renderPreferenceBadges(student)}</div>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => setSelectedStudent(student)}>
                          <UserPlus className="h-4 w-4 mr-1" />
                          Assign Guide
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Assign Guide to {selectedStudent?.firstName} {selectedStudent?.lastName}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Select Guide</label> {/* changed label */}
                            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a guide" /> {/* changed placeholder */}
                              </SelectTrigger>
                              <SelectContent>
                                {faculty.map((guideMember) => {
                                  // actually guides
                                  const fid = getId(guideMember)
                                  const capacity = getFacultyCapacity(fid)
                                  const isAvailable = capacity.current < capacity.max
                                  return (
                                    <SelectItem key={fid} value={fid} disabled={!isAvailable}>
                                      <div className="flex items-center justify-between w-full">
                                        <span>
                                          {guideMember.firstName} {guideMember.lastName}
                                        </span>
                                        <Badge variant={isAvailable ? "default" : "secondary"}>
                                          {capacity.current}/{capacity.max}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAssignGuide} disabled={!selectedFaculty}>
                              Assign Guide
                            </Button>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Guides */}
        <Card>
          <CardHeader>
            <CardTitle>Available Guides</CardTitle> {/* changed label */}
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {faculty.map((guideMember) => {
                // actually guides
                const fid = getId(guideMember)
                const capacity = getFacultyCapacity(fid)
                const isAvailable = capacity.current < capacity.max
                return (
                  <div key={fid} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {guideMember.firstName} {guideMember.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{guideMember.department}</p>
                      <p className="text-sm text-muted-foreground">{guideMember.specialization}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={isAvailable ? "default" : "secondary"}>
                        {capacity.current}/{capacity.max} Students
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{isAvailable ? "Available" : "Full"}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Allocations */}
      <Card>
        <CardHeader>
          <CardTitle>Current Guide Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>SVV Net ID</TableHead>
                <TableHead>Guide</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No guide allocations found
                  </TableCell>
                </TableRow>
              ) : (
                allocations.map((allocation) => {
                  const student = getStudentById(allocation.studentId)
                  const guide = getFacultyById(allocation.guideId || allocation.facultyId)
                  return (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">
                        {student?.firstName} {student?.lastName}
                      </TableCell>
                      <TableCell>{student?.svvNetId}</TableCell>
                      <TableCell>
                        {guide?.firstName} {guide?.lastName}
                      </TableCell>
                      <TableCell>{student?.department}</TableCell>
                      <TableCell>{new Date(allocation.assignedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
