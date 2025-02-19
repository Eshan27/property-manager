"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}) {
    const router = useRouter()
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState("");
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  
    const handleLogin = async (e) => {
      e.preventDefault() // Prevent form default submission
      setError("") // Reset any previous error
      try {
        const response = await signIn("credentials", { 
          email: formData.email, 
          password: formData.password, 
          redirect: false 
        })
  
        if (response.ok) {
          const session = await getSession();
          if(session.user?.role === 'user') {
            router.replace('/properties')
          } else {
            router.replace('/admin')
          }
          
        } else {
          setError(response.error || "Invalid email or password")
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.")
      }
    }

    const handleNavigation = () => {
      router.push("/register");
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input onChange={handleChange} id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <div className="underline underline-offset-4 hover:cursor-pointer" onClick={handleNavigation}>
                Sign up
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

