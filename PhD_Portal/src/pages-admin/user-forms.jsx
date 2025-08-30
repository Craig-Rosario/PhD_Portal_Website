"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export function AddStudentForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    svvNetId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      svvNetId: formData.svvNetId,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: "student",
    }
    console.log("[v0] Submitting student form:", payload)
    onSubmit(payload)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="svvNetId">SVV Net ID</Label>
          <Input
            id="svvNetId"
            value={formData.svvNetId}
            onChange={(e) => handleChange("svvNetId", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">Add Student</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export function AddFacultyForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    svvNetId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "faculty",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      svvNetId: formData.svvNetId,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: "faculty",
    }
    console.log("[v0] Submitting faculty form:", payload)
    onSubmit(payload)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="svvNetId">SVV Net ID</Label>
          <Input
            id="svvNetId"
            value={formData.svvNetId}
            onChange={(e) => handleChange("svvNetId", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">Add Faculty</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export function AddCoordinatorForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    svvNetId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "coordinator",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      svvNetId: formData.svvNetId,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: "coordinator",
    }
    console.log("[v0] Submitting coordinator form:", payload)
    onSubmit(payload)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="svvNetId">SVV Net ID</Label>
          <Input
            id="svvNetId"
            value={formData.svvNetId}
            onChange={(e) => handleChange("svvNetId", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">Add Coordinator</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export function AddGuideForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    svvNetId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "guide",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      svvNetId: formData.svvNetId,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: "guide",
    }
    console.log("[v0] Submitting guide form:", payload)
    onSubmit(payload)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="svvNetId">SVV Net ID</Label>
          <Input
            id="svvNetId"
            value={formData.svvNetId}
            onChange={(e) => handleChange("svvNetId", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">Add Guide</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
