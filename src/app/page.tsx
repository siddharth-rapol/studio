import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sprout } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-farm');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-20">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Sprout className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">AgriGenius</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-screen">
          {heroImage ? (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Smarter Farming, Greener Future
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl mt-4">
              Leverage the power of AI to optimize your farm's productivity, resilience, and profitability.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
