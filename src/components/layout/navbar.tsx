import React from 'react';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
    href: string;
    label: string;
    active?: boolean;
}

interface NavbarProps {
    userName?: string;
    avatarUrl?: string;
}

const Navbar = ({ userName = "Alicia Koch", avatarUrl }: NavbarProps) => {
    const navItems: NavItem[] = [
        { href: "#", label: "Dashboard", active: true },
        { href: "#", label: "Data" },
        { href: "#", label: "Pricing" },
        { href: "#", label: "Settings" }
    ];

    return (
        <header className="border-b border-zinc-800">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-8">
                    <Image src="/logo.svg" alt="Logo" width={100} height={32} />
                    <nav className="flex gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={item.active ? "text-white" : "text-zinc-400 hover:text-white"}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-900">
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
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;