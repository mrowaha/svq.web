"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, Moon, Sun, User } from 'lucide-react';

const SettingsPage = () => {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>

                {/* Profile Settings */}
                <Card className="bg-zinc-900/50 border-0">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-zinc-400" />
                            <CardTitle className="text-white">Profile Settings</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-400">
                            Manage your profile information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-zinc-400">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-zinc-400">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-400">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="bg-zinc-900/50 border-0">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-zinc-400" />
                            <CardTitle className="text-white">Notifications</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-400">
                            Configure how you want to be notified
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-white">Email Notifications</Label>
                                <p className="text-sm text-zinc-400">Receive updates via email</p>
                            </div>
                            <Switch />
                        </div>
                        <Separator className="bg-zinc-800" />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-white">Push Notifications</Label>
                                <p className="text-sm text-zinc-400">Receive push notifications</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card className="bg-zinc-900/50 border-0">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            {isDark ? (
                                <Moon className="w-5 h-5 text-zinc-400" />
                            ) : (
                                <Sun className="w-5 h-5 text-zinc-400" />
                            )}
                            <CardTitle className="text-white">Appearance</CardTitle>
                        </div>
                        <CardDescription className="text-zinc-400">
                            Customize your interface
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-zinc-400">Theme</Label>
                            <Select defaultValue="system" onValueChange={(value) => setIsDark(value === 'dark')}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                    <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-400">Font Size</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                    <SelectValue placeholder="Choose font size" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="small">Small</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button variant="ghost" className="bg-zinc-800 text-white hover:bg-zinc-700">
                        Cancel
                    </Button>
                    <Button className="bg-white text-black hover:bg-zinc-200">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;