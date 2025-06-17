"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "react-toastify"
import { Shield, Key, Smartphone, Eye, EyeOff, CheckCircle, AlertTriangle, Lock, Unlock } from "lucide-react"

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const securityScore = 85 // Mock security score

  const loginHistory = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, US",
      timestamp: "2024-01-15T10:30:00Z",
      status: "success",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "New York, US",
      timestamp: "2024-01-14T18:45:00Z",
      status: "success",
      current: false,
    },
    {
      id: "3",
      device: "Chrome on Android",
      location: "Los Angeles, US",
      timestamp: "2024-01-13T14:20:00Z",
      status: "failed",
      current: false,
    },
    {
      id: "4",
      device: "Firefox on Windows",
      location: "New York, US",
      timestamp: "2024-01-12T09:15:00Z",
      status: "success",
      current: false,
    },
  ]

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Please fill in all password fields")
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match")
      return
    }

    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    toast.success("Password updated successfully")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true)
    toast.success("Two-factor authentication enabled")
  }

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false)
    toast.success("Two-factor authentication disabled")
  }

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSecurityScoreLabel = (score: number) => {
    if (score >= 80) return "Strong"
    if (score >= 60) return "Good"
    return "Weak"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Security</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Shield className="h-3 w-3 mr-1" />
            Account Protection
          </Badge>
        </div>

        {/* Security Score */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-4xl font-bold ${getSecurityScoreColor(securityScore)}`}>{securityScore}/100</div>
                <div className={`text-lg ${getSecurityScoreColor(securityScore)}`}>
                  {getSecurityScoreLabel(securityScore)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-2">Recommendations:</div>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Strong password
                  </li>
                  <li className="flex items-center text-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Email verified
                  </li>
                  <li className="flex items-center text-yellow-500">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Enable 2FA
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Settings */}
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Password Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                />
              </div>
              <Button onClick={handlePasswordChange} className="w-full">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">2FA Status</div>
                  <div className="text-sm text-muted-foreground">{twoFactorEnabled ? "Enabled" : "Disabled"}</div>
                </div>
                <Badge variant={twoFactorEnabled ? "default" : "destructive"}>
                  {twoFactorEnabled ? (
                    <>
                      <Lock className="h-3 w-3 mr-1" />
                      Enabled
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3 w-3 mr-1" />
                      Disabled
                    </>
                  )}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground">
                Two-factor authentication adds an extra layer of security to your account by requiring a code from your
                phone in addition to your password.
              </div>

              {twoFactorEnabled ? (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    View Backup Codes
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Disable 2FA
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Are you sure you want to disable two-factor authentication? This will make your account less
                          secure.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="destructive" onClick={handleDisable2FA} className="flex-1">
                            Yes, Disable 2FA
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Button onClick={handleEnable2FA} className="w-full">
                  Enable 2FA
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Security Preferences */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Security Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Security Notifications</div>
                <div className="text-sm text-muted-foreground">Receive email alerts for security events</div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Login Alerts</div>
                <div className="text-sm text-muted-foreground">Get notified of new login attempts</div>
              </div>
              <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* Login History */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Recent Login Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      login.status === "success" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    {login.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{login.device}</div>
                    <div className="text-sm text-muted-foreground">{login.location}</div>
                    <div className="text-xs text-muted-foreground">{new Date(login.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {login.current && <Badge className="bg-primary/10 text-primary">Current Session</Badge>}
                  <Badge variant={login.status === "success" ? "default" : "destructive"}>
                    {login.status === "success" ? "Success" : "Failed"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
