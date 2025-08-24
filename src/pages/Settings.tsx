import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Database } from "lucide-react"

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-text-secondary mt-2">Manage your application preferences and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                defaultValue="John Doe"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">Company</Label>
              <Input
                id="company"
                defaultValue="Acme Corp"
                className="bg-input border-border text-foreground"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Email Notifications</p>
                <p className="text-text-secondary text-sm">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Push Notifications</p>
                <p className="text-text-secondary text-sm">Receive browser notifications</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">SMS Alerts</p>
                <p className="text-text-secondary text-sm">Important updates via SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Shield className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">New Password</Label>
              <Input
                id="new-password"
                type="password"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                className="bg-input border-border text-foreground"
              />
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-hover-bg">
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Database className="h-5 w-5 mr-2" />
              System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Auto Backup</p>
                <p className="text-text-secondary text-sm">Automatically backup data daily</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Analytics</p>
                <p className="text-text-secondary text-sm">Enable usage analytics</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="space-y-3 pt-2">
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-hover-bg">
                Export Data
              </Button>
              <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                Reset Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings