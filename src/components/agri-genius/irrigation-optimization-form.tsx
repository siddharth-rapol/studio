
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { optimizeIrrigationSchedule } from "@/ai/flows/optimize-irrigation-schedule";
import type { OptimizeIrrigationScheduleOutput } from "@/ai/schema";
import { useToast } from "@/hooks/use-toast";
import { CROP_TYPES, IRRIGATION_METHODS, SOIL_TYPES, WATER_SOURCES } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Droplets, GanttChartSquare } from "lucide-react";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  soilType: z.enum(SOIL_TYPES),
  weatherConditions: z.string().min(1, "Weather conditions are required."),
  cropType: z.enum(CROP_TYPES),
  farmSize: z.coerce.number().positive("Farm size must be a positive number."),
  waterSource: z.enum(WATER_SOURCES),
  irrigationMethod: z.enum(IRRIGATION_METHODS),
  cropHistory: z.string().min(1, "Crop history is required."),
  gpsLocation: z.string().min(1, "GPS location is required."),
  elevation: z.coerce.number(),
});

type FormData = z.infer<typeof formSchema>;

export default function IrrigationOptimizationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeIrrigationScheduleOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilType: "loam",
      weatherConditions: "Sunny, 28°C, light breeze",
      cropType: "corn",
      farmSize: 100,
      waterSource: "well",
      irrigationMethod: "drip",
      cropHistory: "Corn for 2 years, soybeans for 1 year",
      gpsLocation: "40.7128° N, 74.0060° W",
      elevation: 33,
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await optimizeIrrigationSchedule(data);
      setResult(response);
    } catch (error) {
      console.error("Error optimizing schedule:", error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get irrigation schedule. Please try again.",
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
              <CardTitle>Farm &amp; Crop Details</CardTitle>
              <CardDescription>Enter detailed information to get a hyper-personalized irrigation schedule.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <FormField control={form.control} name="cropType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a crop" /></SelectTrigger></FormControl>
                        <SelectContent>{CROP_TYPES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="farmSize" render={({ field }) => (
                    <FormItem><FormLabel>Farm Size (acres)</FormLabel><FormControl><Input type="number" placeholder="100" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="elevation" render={({ field }) => (
                    <FormItem><FormLabel>Elevation (feet)</FormLabel><FormControl><Input type="number" placeholder="33" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField control={form.control} name="soilType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a soil type" /></SelectTrigger></FormControl>
                        <SelectContent>{SOIL_TYPES.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="irrigationMethod" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Irrigation Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a method" /></SelectTrigger></FormControl>
                        <SelectContent>{IRRIGATION_METHODS.map(i => <SelectItem key={i} value={i} className="capitalize">{i.replace('_', '-')}</SelectItem>)}</SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="waterSource" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a source" /></SelectTrigger></FormControl>
                        <SelectContent>{WATER_SOURCES.map(w => <SelectItem key={w} value={w} className="capitalize">{w.replace('_', ' ')}</SelectItem>)}</SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                )}/>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="weatherConditions" render={({ field }) => (
                    <FormItem><FormLabel>Current Weather Conditions</FormLabel><FormControl><Input placeholder="e.g., Sunny, 28°C" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="gpsLocation" render={({ field }) => (
                    <FormItem><FormLabel>GPS Location</FormLabel><FormControl><Input placeholder="e.g., 40.7128° N, 74.0060° W" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
              <FormField control={form.control} name="cropHistory" render={({ field }) => (
                  <FormItem><FormLabel>Crop History &amp; Notes</FormLabel><FormControl><Textarea placeholder="e.g., Planted corn on April 15. Previous crop was soybeans..." {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...</> : "Optimize Schedule"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Our AI is calculating the optimal schedule...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent" />Optimized Irrigation Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><GanttChartSquare className="h-5 w-5" />Irrigation Schedule</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{result.irrigationSchedule}</div>
             </div>
             <Separator/>
             <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><Droplets className="h-5 w-5" />Estimated Water Usage</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{result.waterUsageEstimate}</div>
             </div>
             <Separator/>
             <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">Notes &amp; Recommendations</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{result.notes}</div>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
