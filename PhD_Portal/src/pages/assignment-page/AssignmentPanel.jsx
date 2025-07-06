import AssignmentCard from "./AssignmentCard"

export default function AssignmentsPanel({ assignments }) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Assignments</h2>
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  )
}
