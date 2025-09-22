"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const marketData = {
    "usa-midwest": [
        { crop: "Corn", price: 5.50, currency: "USD", unit: "bushel", trend: "up", change: "+2.5%" },
        { crop: "Soybeans", price: 14.20, currency: "USD", unit: "bushel", trend: "down", change: "-1.2%" },
        { crop: "Wheat", price: 7.80, currency: "USD", unit: "bushel", trend: "stable", change: "+0.1%" },
        { crop: "Oats", price: 3.90, currency: "USD", unit: "bushel", trend: "up", change: "+3.1%" },
    ],
    "europe-west": [
        { crop: "Wheat", price: 250, currency: "EUR", unit: "ton", trend: "up", change: "+1.8%" },
        { crop: "Barley", price: 220, currency: "EUR", unit: "ton", trend: "up", change: "+2.3%" },
        { crop: "Rapeseed", price: 450, currency: "EUR", unit: "ton", trend: "down", change: "-0.5%" },
        { crop: "Sugar Beet", price: 45, currency: "EUR", unit: "ton", trend: "stable", change: "0.0%" },
    ],
};

const priceHistory = [
    { month: "Jan", price: 5.20 }, { month: "Feb", price: 5.35 }, { month: "Mar", price: 5.30 },
    { month: "Apr", price: 5.45 }, { month: "May", price: 5.60 }, { month: "Jun", price: 5.50 },
];

const chartConfig = {
    price: {
        label: "Price (USD)",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export default function MarketInsightsPage() {
    const [location, setLocation] = useState&lt;keyof typeof marketData&gt;("usa-midwest");
    const data = marketData[location];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Market Insights</h1>
                <p className="text-muted-foreground mt-1">
                    Real-time market demand and price trends to guide crop selection for profitability.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Crop Prices</CardTitle>
                        <Select onValueChange={(value: keyof typeof marketData) => setLocation(value)} defaultValue={location}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usa-midwest">USA Midwest</SelectItem>
                                <SelectItem value="europe-west">Europe West</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Crop</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Trend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.crop}>
                                    <TableCell className="font-medium">{item.crop}</TableCell>
                                    <TableCell className="text-right">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency }).format(item.price)} / {item.unit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <TrendIcon trend={item.trend} />
                                            <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'} className="w-[60px] justify-center">{item.change}</Badge>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Corn Price History (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={priceHistory} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} tickFormatter={(value) => `$${value}`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="price" fill="var(--color-price)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
