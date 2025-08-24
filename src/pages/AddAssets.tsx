import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, File, Image, Video, X } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const AddAssets = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [assetForm, setAssetForm] = useState({
    name: "",
    category: "",
    tags: "",
    description: ""
  })
  const [recentUploads, setRecentUploads] = useState([
    { name: "Brand Guidelines.pdf", type: "document", size: "3.2 MB", date: "2 hours ago" },
    { name: "Hero Image.jpg", type: "image", size: "1.5 MB", date: "4 hours ago" },
    { name: "Product Demo.mp4", type: "video", size: "15.8 MB", date: "1 day ago" },
  ])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles([...selectedFiles, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      })
      return
    }

    if (!assetForm.name) {
      toast({
        title: "Error", 
        description: "Please enter an asset name.",
        variant: "destructive"
      })
      return
    }

    // Simulate upload
    const newUpload = {
      name: assetForm.name,
      type: assetForm.category || "document",
      size: "2.1 MB",
      date: "Just now"
    }

    setRecentUploads([newUpload, ...recentUploads])
    setSelectedFiles([])
    setAssetForm({ name: "", category: "", tags: "", description: "" })
    
    toast({
      title: "Success!",
      description: `${selectedFiles.length} file(s) uploaded successfully.`,
    })
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved!",
      description: "Your asset draft has been saved.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add Assets</h1>
        <p className="text-text-secondary mt-2">Upload and organize new digital assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-text-secondary mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">Drop files here or click to browse</p>
              <p className="text-text-secondary text-sm">Support for images, videos, documents up to 50MB</p>
              <label htmlFor="file-upload">
                <Button 
                  type="button" 
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose Files
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {file.type.startsWith('image/') ? <Image className="h-5 w-5 text-primary" /> : 
                       file.type.startsWith('video/') ? <Video className="h-5 w-5 text-primary" /> :
                       <File className="h-5 w-5 text-primary" />}
                      <span className="text-foreground">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-secondary text-sm">{formatFileSize(file.size)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 hover:bg-destructive/20"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Asset Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="asset-name" className="text-foreground">Asset Name</Label>
              <Input
                id="asset-name"
                value={assetForm.name}
                onChange={(e) => setAssetForm({...assetForm, name: e.target.value})}
                placeholder="Enter asset name"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Select value={assetForm.category} onValueChange={(value) => setAssetForm({...assetForm, category: value})}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-foreground">Tags</Label>
              <Input
                id="tags"
                value={assetForm.tags}
                onChange={(e) => setAssetForm({...assetForm, tags: e.target.value})}
                placeholder="Enter tags (comma separated)"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                value={assetForm.description}
                onChange={(e) => setAssetForm({...assetForm, description: e.target.value})}
                placeholder="Enter asset description"
                className="bg-input border-border text-foreground"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleUpload}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Upload Assets
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                className="border-border text-foreground hover:bg-hover-bg"
              >
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  {item.type === "document" && <File className="h-5 w-5 text-primary" />}
                  {item.type === "image" && <Image className="h-5 w-5 text-primary" />}
                  {item.type === "video" && <Video className="h-5 w-5 text-primary" />}
                  <div>
                    <p className="text-foreground font-medium">{item.name}</p>
                    <p className="text-text-secondary text-sm">{item.size} • {item.date}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toast({
                    title: "Viewing asset",
                    description: `Opening ${item.name}...`,
                  })}
                  className="border-border text-foreground hover:bg-hover-bg"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddAssets