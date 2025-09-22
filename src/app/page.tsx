
import AIAgent from '@/components/agri-genius/ai-agent';
import LandingPageHeader from '@/components/agri-genius/landing-page-header';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <LandingPageHeader />
      <main className="flex-1 flex flex-col pt-16">
        <AIAgent />
      </main>
      <footer className="py-4 px-4 md:px-6 border-t bg-background">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AgriGenius. Built for the Indian Farmer.
        </div>
      </footer>
    </div>
  );
}
