import ClimateAdviceForm from "@/components/agri-genius/climate-advice-form";

export default function ClimateAdvicePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Climate Adaptive Advice</h1>
                <p className="text-muted-foreground mt-1">
                    Receive AI-powered advice to enhance crop yield and resilience against changing weather patterns.
                </p>
            </div>
            <ClimateAdviceForm />
        </div>
    );
}
