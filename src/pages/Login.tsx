import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        navigate("/dashboard")
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Success",
          description: "Registration successful! You can now log in.",
        })
        setIsLogin(true)
      }
      setEmail("")
      setPassword("")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin 
              ? "Enter your credentials to sign in" 
              : "Sign up for a new account"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
            </Button>
          </div>
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}