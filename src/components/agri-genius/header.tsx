
import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className={cn("px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-20 transition-all duration-300 bg-background/80 backdrop-blur-sm border-b")}>
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Sprout className="h-6 w-6 text-primary" />
        <span className={cn("ml-2 text-lg font-bold text-foreground")}>AgriGenius</span>
      </Link>
    </header>
  );
}
