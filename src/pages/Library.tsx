import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LibraryDetailModal } from "@/components/LibraryDetailModal"
import { Search, Filter, FileText, Image, Video, Upload, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const Library = () => {
  const [libraryItems, setLibraryItems] = useState([
    { id: 1, name: "Project Documentation", type: "document", icon: FileText, date: "2024-01-15" },
    { id: 2, name: "Brand Assets", type: "image", icon: Image, date: "2024-01-14" },
    { id: 3, name: "Training Video", type: "video", icon: Video, date: "2024-01-13" },
    { id: 4, name: "User Manual", type: "document", icon: FileText, date: "2024-01-12" },
    { id: 5, name: "Logo Collection", type: "image", icon: Image, date: "2024-01-11" },
    { id: 6, name: "Demo Presentation", type: "video", icon: Video, date: "2024-01-10" },
  ])
  
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    files: []
  })

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  const handleUpload = () => {
    if (!uploadForm.name) {
      toast({
        title: "Error",
        description: "Please enter a name for the asset.",
        variant: "destructive"
      })
      return
    }

    const newItem = {
      id: libraryItems.length + 1,
      name: uploadForm.name,
      type: "document",
      icon: FileText,
      date: new Date().toISOString().split('T')[0]
    }

    setLibraryItems([newItem, ...libraryItems])
    setUploadForm({ name: "", description: "", files: [] })
    setIsUploadOpen(false)
    
    toast({
      title: "Success!",
      description: "Asset uploaded successfully.",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library</h1>
          <p className="text-text-secondary mt-2">Manage and organize your digital assets</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Upload New Asset</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Click to select files</p>
                <input 
                  type="file" 
                  multiple 
                  className="mt-2 text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary file:text-primary-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Asset Name</Label>
                <Input
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                  placeholder="Enter asset name"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  placeholder="Enter description"
                  className="bg-input border-border text-foreground"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpload} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Upload
                </Button>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)} className="border-border text-foreground">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search library..."
            className="pl-10 bg-input border-border text-foreground"
          />
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-hover-bg">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryItems.map((item) => (
          <Card 
            key={item.id} 
            className="border-border hover:bg-hover-bg/50 transition-colors cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-text-secondary bg-accent px-2 py-1 rounded">
                  {item.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-foreground mb-2">
                {item.name}
              </CardTitle>
              <p className="text-xs text-text-secondary">
                Added: {item.date}
              </p>
            </CardContent>
          </Card>
        ))}

      <LibraryDetailModal 
        item={selectedItem} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Showing {libraryItems.length} of {libraryItems.length} items</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border text-foreground">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-border text-foreground">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library