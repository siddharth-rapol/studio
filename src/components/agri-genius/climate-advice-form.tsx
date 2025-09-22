
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { climateAdaptiveAdvice } from "@/ai/flows/climate-adaptive-advice";
import type { ClimateAdaptiveAdviceOutput } from "@/ai/schema";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { SOIL_TYPES } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  farmSize: z.string().min(1, "Farm size is required."),
  soilType: z.enum(SOIL_TYPES),
  cropHistory: z.string().min(1, "Crop history is required."),
  weatherObservations: z.string().min(1, "Weather observations are required."),
  location: z.string().min(1, "GPS location is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function ClimateAdviceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClimateAdaptiveAdviceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmSize: "",
      soilType: "loam",
      cropHistory: "",
      weatherObservations: "",
      location: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await climateAdaptiveAdvice(data);
      setResult(response);
    } catch (error) {
      console.error("Error getting climate advice:", error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get climate advice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
              <CardDescription>Enter your farm's information to receive tailored climate-adaptive advice.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="farmSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Size (acres)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a soil type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SOIL_TYPES.map(type => <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPS Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 40.7128° N, 74.0060° W" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cropHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Corn for 3 years, then soybeans for 2 years." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherObservations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Weather Observations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Unusually dry spring, higher than average temperatures." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : "Get Advice"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Our AI is analyzing your farm's data...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" />
              Your Climate-Adaptive Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {result.advice}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
