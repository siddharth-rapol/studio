import DiseasePredictionForm from "@/components/agri-genius/disease-prediction-form";

export default function DiseasePredictionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Pest &amp; Disease Prediction</h1>
                <p className="text-muted-foreground mt-1">
                    Utilize AI to predict potential crop diseases and pest infestations based on your farm's data.
                </p>
            </div>
            <DiseasePredictionForm />
        </div>
    );
}
