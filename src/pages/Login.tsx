import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Mail, Facebook } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login successful!",
        description: "Welcome back to the dashboard.",
      })
      navigate("/dashboard")
      setLoading(false)
    }, 1000)
  }

  const handleSocialLogin = async (provider: string) => {
    setLoading(true)
    
    // Simulate social login
    setTimeout(() => {
      toast({
        title: `${provider} login successful!`,
        description: "Welcome back to the dashboard.",
      })
      navigate("/dashboard")
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Screen - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url('/lovable-uploads/5b619611-fe8b-4d42-8600-2057657920a1.png')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to the Future</h2>
            <p className="text-lg opacity-90">Advanced technology solutions for modern businesses</p>
          </div>
        </div>
      </div>

      {/* Right Screen - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <p className="text-text-secondary">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={() => handleSocialLogin("Google")}
                variant="outline" 
                className="w-full border-border text-foreground hover:bg-hover-bg"
                disabled={loading}
              >
                <Mail className="h-4 w-4 mr-2" />
                Continue with Google
              </Button>
              
              <Button 
                onClick={() => handleSocialLogin("Facebook")}
                variant="outline" 
                className="w-full border-border text-foreground hover:bg-hover-bg"
                disabled={loading}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Continue with Facebook
              </Button>
            </div>

            <div className="my-6">
              <Separator className="bg-border" />
              <div className="flex justify-center -mt-3">
                <span className="bg-background px-2 text-text-secondary text-sm">or</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login