import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddPersonModal } from "@/components/AddPersonModal"
import { Search, Plus, Mail, Phone } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const People = () => {
  const [people, setPeople] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john@example.com", 
      role: "Admin", 
      status: "Active",
      phone: "+1234567890"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah@example.com", 
      role: "User", 
      status: "Active",
      phone: "+1234567891"
    },
    { 
      id: 3, 
      name: "Mike Davis", 
      email: "mike@example.com", 
      role: "Moderator", 
      status: "Inactive",
      phone: "+1234567892"
    },
    { 
      id: 4, 
      name: "Emily Wilson", 
      email: "emily@example.com", 
      role: "User", 
      status: "Active",
      phone: "+1234567893"
    },
  ])
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editPerson, setEditPerson] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSavePerson = (personData: any) => {
    if (personData.id) {
      // Edit existing person
      setPeople(people.map(p => p.id === personData.id ? personData : p))
      toast({
        title: "Success!",
        description: "Person updated successfully.",
      })
    } else {
      // Add new person
      const newPerson = {
        ...personData,
        id: people.length + 1
      }
      setPeople([newPerson, ...people])
      toast({
        title: "Success!",
        description: "Person added successfully.",
      })
    }
    setEditPerson(null)
  }

  const handleEdit = (person: any) => {
    setEditPerson(person)
    setIsAddModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-destructive/20 text-destructive"
      case "Moderator": return "bg-primary/20 text-primary"
      default: return "bg-secondary/50 text-secondary-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People</h1>
          <p className="text-text-secondary mt-2">Manage users and team members</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Person
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search people..."
          className="pl-10 bg-input border-border text-foreground max-w-md"
        />
      </div>

      <div className="grid gap-4">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{person.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-text-secondary text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {person.email}
                      </div>
                      <div className="flex items-center text-text-secondary text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {person.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleColor(person.role)}>
                    {person.role}
                  </Badge>
                  <Badge className={getStatusColor(person.status)}>
                    {person.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(person)}
                    className="border-border text-foreground hover:bg-hover-bg"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditPerson(null)
        }}
        onSave={handleSavePerson}
        editPerson={editPerson}
      />

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Showing {filteredPeople.length} of {people.length} people</span>
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

export default People