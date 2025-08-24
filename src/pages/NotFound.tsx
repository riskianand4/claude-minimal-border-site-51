import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-lg border-border text-center">
        <CardContent className="pt-12 pb-12">
          <div className="space-y-6">
            {/* 404 Number */}
            <div className="text-8xl font-bold text-primary opacity-20">
              404
            </div>
            
            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
              <p className="text-text-secondary text-lg">
                Oops! The page you're looking for doesn't exist.
              </p>
              <p className="text-text-secondary text-sm">
                Route: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link to="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-border text-foreground hover:bg-hover-bg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center justify-center mb-2">
                <Search className="h-4 w-4 text-text-secondary mr-2" />
                <span className="text-sm font-medium text-foreground">Suggestions</span>
              </div>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>• Check the URL for typos</p>
                <p>• Try going back to the previous page</p>
                <p>• Visit our homepage to start over</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound;
