"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setIsDarkMode } from "@/redux/state"
import { toast } from "react-toastify"
import { User, Palette, Globe, Shield, Download, Trash2, Camera } from "lucide-react"

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { isDarkMode } = useAppSelector((state) => state.global)
  const { user } = useAppSelector((state) => state.auth)

  const [profile, setProfile] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    username: user?.username || "johndoe",
    bio: "Crypto enthusiast and DeFi explorer",
    website: "https://johndoe.com",
    twitter: "@johndoe",
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    numberFormat: "1,234.56",
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showPortfolio: false,
    showTrades: false,
    allowMessages: true,
  })

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully")
  }

  const handlePreferencesUpdate = () => {
    toast.success("Preferences updated successfully")
  }

  const handlePrivacyUpdate = () => {
    toast.success("Privacy settings updated successfully")
  }

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email when ready.")
  }

  const handleDeleteAccount = () => {
    toast.error("Account deletion is not available in demo mode")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={profile.username} />
                    <AvatarFallback className="text-lg">
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={profile.firstName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input
                      value={profile.username}
                      onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Bio</Label>
                  <textarea
                    className="w-full p-2 border border-border rounded-md bg-background h-20"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Website</Label>
                    <Input
                      value={profile.website}
                      onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <Label>Twitter</Label>
                    <Input
                      value={profile.twitter}
                      onChange={(e) => setProfile((prev) => ({ ...prev, twitter: e.target.value }))}
                      placeholder="@username"
                    />
                  </div>
                </div>

                <Button onClick={handleProfileUpdate}>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={(checked) => dispatch(setIsDarkMode(checked))} />
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Localization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Language</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={preferences.language}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, timezone: e.target.value }))}
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">Greenwich Mean Time</option>
                    </select>
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={preferences.currency}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <Label>Date Format</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, dateFormat: e.target.value }))}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handlePreferencesUpdate}>Update Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Public Profile</div>
                    <div className="text-sm text-muted-foreground">Allow others to view your profile</div>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, profilePublic: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Portfolio</div>
                    <div className="text-sm text-muted-foreground">Display portfolio value on profile</div>
                  </div>
                  <Switch
                    checked={privacy.showPortfolio}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showPortfolio: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Trading Activity</div>
                    <div className="text-sm text-muted-foreground">Display recent trades on profile</div>
                  </div>
                  <Switch
                    checked={privacy.showTrades}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showTrades: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow Messages</div>
                    <div className="text-sm text-muted-foreground">Let other users send you messages</div>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, allowMessages: checked }))}
                  />
                </div>
                <Button onClick={handlePrivacyUpdate}>Update Privacy Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Download a copy of your data including profile information, trading history, and account activity.
                </p>
                <Button onClick={handleExportData} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
              </CardContent>
            </Card>

            <Card className="crypto-card border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button onClick={handleDeleteAccount} variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
