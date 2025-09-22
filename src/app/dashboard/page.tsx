"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Droplets, Sun, TrendingUp, TrendingDown, Leaf, AlertTriangle } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

const yieldData = [
    { month: "Jul", yield: 180 },
    { month: "Aug", yield: 195 },
    { month: "Sep", yield: 210 },
    { month: "Oct", yield: 205 },
];

const yieldChartConfig = {
    yield: {
        label: "Yield (bushels/acre)",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

const marketData = [
    { crop: "Corn", price: "$5.50", trend: "up" },
    { crop: "Soybeans", price: "$14.20", trend: "down" },
    { crop: "Wheat", price: "$7.80", trend: "stable" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, Farmer!</h1>
                <p className="text-muted-foreground">Here's a summary of your farm's status.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Weather</CardTitle>
                        <Sun className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28°C, Sunny</div>
                        <p className="text-xs text-muted-foreground">Wind: 10km/h ESE, Humidity: 65%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45%</div>
                        <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
                        <Leaf className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Good</div>
                        <p className="text-xs text-muted-foreground">No significant stress detected</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Active Alerts</CardTitle>
                        <CardDescription>Immediate actions may be required.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>High Risk of Corn Blight</AlertTitle>
                            <AlertDescription>
                                Weather conditions are favorable for corn blight development. Consider preventive spraying.
                            </AlertDescription>
                        </Alert>
                        <Alert>
                             <Bell className="h-4 w-4" />
                            <AlertTitle>Irrigation Needed</AlertTitle>
                            <AlertDescription>
                                Soil moisture in Zone B is below the optimal threshold. Schedule irrigation soon.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Market Overview</CardTitle>
                        <CardDescription>Quick look at current crop prices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Crop</TableHead>
                                    <TableHead className="text-right">Price/bushel</TableHead>
                                    <TableHead className="text-right">Trend</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {marketData.map(item => (
                                <TableRow key={item.crop}>
                                    <TableCell className="font-medium">{item.crop}</TableCell>
                                    <TableCell className="text-right">{item.price}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'} className="capitalize">
                                            {item.trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : item.trend === 'down' ? <TrendingDown className="mr-1 h-3 w-3" /> : null}
                                            {item.trend}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Yield Forecast</CardTitle>
                    <CardDescription>Predicted yield for the current corn crop.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={yieldChartConfig} className="h-[250px] w-full">
                        <BarChart data={yieldData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="yield" fill="var(--color-yield)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
}
