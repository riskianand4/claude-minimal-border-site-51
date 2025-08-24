import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface Person {
  id?: number
  name: string
  email: string
  role: string
  status: string
  phone: string
}

interface AddPersonModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (person: Person) => void
  editPerson?: Person | null
}

export const AddPersonModal = ({ isOpen, onClose, onSave, editPerson }: AddPersonModalProps) => {
  const [formData, setFormData] = useState<Person>({
    name: editPerson?.name || "",
    email: editPerson?.email || "",
    role: editPerson?.role || "User",
    status: editPerson?.status || "Active",
    phone: editPerson?.phone || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: editPerson?.id })
    setFormData({ name: "", email: "", role: "User", status: "Active", phone: "" })
    onClose()
  }

  const handleClose = () => {
    setFormData({ name: "", email: "", role: "User", status: "Active", phone: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {editPerson ? "Edit Person" : "Add New Person"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter full name"
              className="bg-input border-border text-foreground"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter email address"
              className="bg-input border-border text-foreground"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter phone number"
              className="bg-input border-border text-foreground"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-foreground">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              {editPerson ? "Update" : "Add"} Person
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="border-border text-foreground">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}