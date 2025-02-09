"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Switch } from "../ui/switch"

function UserPermissions() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin"

    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user role")
      }

      const updatedUser = await response.json()
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: updatedUser.user.role } : user
        )
      )
    } catch (error) {
      console.error("Error updating role:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b py-3"
              >
                <div className="flex items-center">
                  <Label className="font-semibold">{user.fullName}</Label>
                  <span className="ml-2 text-gray-600">{user.email}</span>
                </div>

                <Switch
                checked={user.role === 'admin'}
                onCheckedChange={()=> handleRoleChange(user.id, user.role)}
                 />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPermissions;
