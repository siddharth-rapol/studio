
"use client";

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function LandingPageHeader() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <header className={cn("px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-20 transition-all duration-300 bg-background/80 backdrop-blur-sm border-b")}>
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Sprout className="h-6 w-6 text-primary" />
        <span className={cn("ml-2 text-lg font-bold text-foreground")}>AgriGenius</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {loading ? (
          <div className="h-9 w-20 animate-pulse rounded-md bg-muted/50" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-9 w-9">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/')}>
                <User className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size="sm" variant={"default"}>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
