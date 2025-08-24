import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to dashboard
    navigate("/dashboard")
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Dashboard...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
