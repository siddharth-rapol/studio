"use client";

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroCarousel() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

  return (
    <Carousel
      className="w-full h-full"
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      opts={{ loop: true }}
    >
      <CarouselContent className="w-full h-full">
        {heroImages.map((image, index) => (
          <CarouselItem key={image.id} className="w-full h-full">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
