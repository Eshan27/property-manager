"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Switch } from "../ui/switch"

function UserPermissions() {
  const [selectedUser, setSelectedUser] = useState(null)
  const users = [
    { id: "1", fullName: "John Doe", email: "john.doe@example.com", role: "user" },
    { id: "2", fullName: "Jane Smith", email: "jane.smith@example.com", role: "admin" },
    // Add more users as needed
  ]

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

                <Switch />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPermissions;
