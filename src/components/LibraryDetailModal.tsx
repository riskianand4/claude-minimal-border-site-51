import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Image, Video, Download, Eye } from "lucide-react"

interface LibraryItem {
  id: number
  name: string
  type: string
  icon: any
  date: string
  size?: string
  description?: string
  tags?: string[]
}

interface LibraryDetailModalProps {
  item: LibraryItem | null
  isOpen: boolean
  onClose: () => void
}

export const LibraryDetailModal = ({ item, isOpen, onClose }: LibraryDetailModalProps) => {
  if (!item) return null

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a')
    link.href = '#'
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <item.icon className="h-5 w-5 text-primary" />
            {item.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-center bg-accent/20 rounded-lg p-8 min-h-48">
            <item.icon className="h-24 w-24 text-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">File Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Type:</span>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Size:</span>
                  <span className="text-foreground">{item.size || "2.4 MB"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Added:</span>
                  <span className="text-foreground">{item.date}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {(item.tags || ["work", "important", "shared"]).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">Description</h4>
            <p className="text-text-secondary text-sm">
              {item.description || "This is a sample description for the asset. It contains important information about the file and its purpose within the project."}
            </p>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-hover-bg">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-hover-bg">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}