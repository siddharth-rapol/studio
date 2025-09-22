
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { agentFlow } from '@/ai/flows/agent-flow';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Paperclip, Send, Sparkles, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

type Message = {
  role: 'user' | 'model';
  content: string;
  image?: string;
};

const formSchema = z.object({
  prompt: z.string().min(1, 'Message cannot be empty.'),
});

type FormData = z.infer<typeof formSchema>;

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: FormData) {
    const userMessage: Message = { role: 'user', content: data.prompt, image: imagePreview ?? undefined };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }

    try {
      const response = await agentFlow({
        history: messages,
        prompt: data.prompt,
        image: imagePreview ?? undefined,
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
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
                <Card className="bg-transparent border-dashed border-primary/50">
                    <CardContent className="p-6 text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Sparkles className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-primary/90">Welcome to AgriGenius!</h2>
                        <p className="text-muted-foreground mt-2">
                           I am your farming assistant, powered by Gemini. Ask me about crops, soil, weather, or anything else to help your farm succeed. You can also upload an image of a plant to get a disease diagnosis.
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
                    'max-w-xl rounded-lg p-3 text-base shadow-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border rounded-bl-none'
                  )}>
                    {message.image && (
                        <Image src={message.image} alt="User upload" width={200} height={200} className="rounded-md mb-2" />
                    )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
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
        <div className="max-w-3xl mx-auto">
          {imagePreview && (
            <div className="relative mb-2 w-24 h-24">
              <Image src={imagePreview} alt="Image preview" layout="fill" className="rounded-md object-cover"/>
              <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted text-muted-foreground" onClick={removeImage}>
                <X className="h-4 w-4"/>
              </Button>
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
            <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
              <Paperclip className="w-5 h-5" />
              <span className="sr-only">Attach Image</span>
            </Button>
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />
            <Input
              {...form.register('prompt')}
              placeholder="Ask about your crops or upload an image..."
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
    </div>
  );
}
