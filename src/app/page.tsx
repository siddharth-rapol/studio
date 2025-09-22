import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import LandingPageHeader from '@/components/agri-genius/landing-page-header';
import { Bot, Droplets, Sun, AreaChart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HeroCarousel from '@/components/agri-genius/hero-carousel';

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'AI Agent',
    description: 'Get instant answers to your farming questions with our conversational AI assistant.',
    link: '/dashboard/ai-agent',
  },
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: 'Irrigation Optimization',
    description: 'Receive optimized irrigation schedules based on soil type, weather, and crop.',
    link: '/dashboard/irrigation-optimization',
  },
  {
    icon: <Sun className="h-10 w-10 text-primary" />,
    title: 'Climate-Adaptive Advice',
    description: 'Enhance crop yield and resilience with advice tailored to changing weather patterns.',
    link: '/dashboard/climate-advice',
  },
  {
    icon: <AreaChart className="h-10 w-10 text-primary" />,
    title: 'Market Insights',
    description: 'Stay ahead with real-time market demand and price trends for profitability.',
    link: '/dashboard/market-insights',
  }
];

export default function Home() {
  const dashboardImage = PlaceHolderImages.find(img => img.id === 'dashboard-showcase');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingPageHeader />
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
            <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="relative container mx-auto px-4 md:px-6 text-center text-primary-foreground">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                Smarter Farming, Greener Future
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl mt-4 text-gray-200 mx-auto">
                Leverage the power of AI to optimize your farm's productivity, resilience, and profitability.
                </p>
                <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/dashboard">
                    Get Started Now
                    </Link>
                </Button>
                </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-20 lg:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features to Revolutionize Your Farm</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                        AgriGenius provides a suite of AI-powered tools designed to help modern farmers thrive.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 md:grid-cols-2 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Data-Driven Decisions Made Simple</h2>
                        <p className="mt-4 text-muted-foreground">
                            Our intuitive dashboard brings all your critical farm data into one place. From soil moisture to market trends, get the insights you need to make informed decisions quickly and confidently.
                        </p>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><strong>Holistic Dashboard:</strong> View weather, soil, crop health, and market data at a glance.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><strong>Actionable Alerts:</strong> Receive timely notifications for pest risks, irrigation needs, and more.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span><strong>Yield Forecasting:</strong> Predict future yields based on historical data and current conditions.</span>
                            </li>
                        </ul>
                    </div>
                     <div>
                        {dashboardImage && (
                            <Image
                                src={dashboardImage.imageUrl}
                                alt={dashboardImage.description}
                                width={600}
                                height={400}
                                className="rounded-lg shadow-xl"
                                data-ai-hint={dashboardImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="py-6 px-4 md:px-6 border-t bg-background">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AgriGenius. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
