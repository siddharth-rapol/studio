
import AIAgent from '@/components/agri-genius/ai-agent';
import Header from '@/components/agri-genius/header';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-hidden pt-16">
        <AIAgent />
      </main>
    </div>
  );
}
