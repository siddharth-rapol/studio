"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictCropDisease, type PredictCropDiseaseOutput } from "@/ai/flows/predict-crop-disease";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ShieldAlert, Sparkles } from "lucide-react";
import { SOIL_TYPES } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  farmSize: z.string().min(1, "Farm size is required."),
  soilType: z.enum(SOIL_TYPES),
  cropHistory: z.string().min(1, "Crop history is required."),
  weatherObservations: z.string().min(1, "Weather observations are required."),
  gpsLocation: z.string().min(1, "GPS location is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function DiseasePredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictCropDiseaseOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmSize: "",
      soilType: "loam",
      cropHistory: "",
      weatherObservations: "",
      gpsLocation: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await predictCropDisease(data);
      setResult(response);
    } catch (error) {
      console.error("Error predicting disease:", error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get disease prediction. Please try again.",
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
              <CardDescription>Enter your farm's information to predict potential diseases and pests.</CardDescription>
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
                name="gpsLocation"
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
                    Predicting...
                  </>
                ) : "Predict Diseases"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Our AI is scanning for potential threats...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" />
              AI-Powered Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <ShieldAlert className="h-5 w-5" />
                Disease &amp; Pest Prediction
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {result.diseasePrediction}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Recommended Preventive Measures</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {result.preventiveMeasures}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
