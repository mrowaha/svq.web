import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut, Settings, User, Bell } from 'lucide-react';
import Link from 'next/link';

interface ProfileButtonProps {
    userName?: string;
    avatarUrl?: string;
}

const ProfileButton = ({ userName = "Alicia Koch", avatarUrl }: ProfileButtonProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={userName}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <UserCircle className="w-4 h-4 text-zinc-400" />
                        )}
                    </div>
                    <span className="text-zinc-200">{userName}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-zinc-900 border-zinc-800">
                <div className="flex flex-col gap-1">
                    <div className="px-2 py-1.5 mb-1">
                        <div className="font-medium text-white">{userName}</div>
                        <div className="text-xs text-zinc-400">admin@svq.ai</div>
                    </div>
                    <Link href="/settings/notifications" passHref>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                            <Bell size={16} />
                            Notifications
                        </Button>
                    </Link>
                    <Link href="/settings" passHref>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                            <Settings size={16} />
                            Settings
                        </Button>
                    </Link>
                    <div className="h-px my-1 bg-zinc-800" />
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-zinc-300 hover:text-red-500 hover:bg-zinc-800"
                        onClick={() => {
                            // Handle logout
                            console.log('Logout clicked');
                        }}
                    >
                        <LogOut size={16} />
                        Log out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ProfileButton;