"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { agentFlow } from '@/ai/flows/agent-flow';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const formSchema = z.object({
  prompt: z.string().min(1, 'Message cannot be empty.'),
});

type FormData = z.infer<typeof formSchema>;

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  async function onSubmit(data: FormData) {
    const userMessage: Message = { role: 'user', content: data.prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    try {
      const response = await agentFlow({
        history: messages,
        prompt: data.prompt,
      });
      const modelMessage: Message = { role: 'model', content: response.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error with AI Agent:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to get a response from the AI. Please try again.',
      });
      setMessages(prev => prev.slice(0, -1)); // Remove user message if API fails
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
                <Card className="bg-green-50 dark:bg-green-900/20 border-dashed border-green-200 dark:border-green-800">
                    <CardContent className="p-6 text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Sparkles className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100">Welcome to AgriGenius!</h2>
                        <p className="text-muted-foreground mt-2">
                           I am your farming assistant, powered by Gemini. Ask me about crops, soil, weather, or anything else to help your farm succeed.
                        </p>
                    </CardContent>
                </Card>
            )}
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8 border">
                     <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                    'max-w-xl rounded-lg p-3 text-base whitespace-pre-wrap shadow-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border rounded-bl-none'
                  )}>
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
                <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg p-3 text-sm bg-card border rounded-bl-none">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>AgriGenius is thinking...</span>
                        </div>
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto flex gap-2">
          <Input
            {...form.register('prompt')}
            placeholder="Type your question for the AI assistant..."
            autoComplete="off"
            disabled={isLoading}
            className="flex-1 h-12 text-base"
          />
          <Button type="submit" disabled={isLoading} size="lg">
            <Send className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
