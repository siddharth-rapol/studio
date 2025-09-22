import IrrigationOptimizationForm from "@/components/agri-genius/irrigation-optimization-form";

export default function IrrigationOptimizationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Irrigation Optimization</h1>
                <p className="text-muted-foreground mt-1">
                    Suggests optimized irrigation schedules tailored to your farm's soil and weather conditions.
                </p>
            </div>
            <IrrigationOptimizationForm />
        </div>
    );
}
