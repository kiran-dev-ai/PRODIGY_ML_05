import { useState } from "react";
import { Utensils } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { NutritionResults } from "@/components/NutritionResults";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FoodItem {
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

interface AnalysisResult {
  items: FoodItem[];
  totalCalories: number;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleImageSelected = async (imageData: string) => {
    setIsAnalyzing(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-food", {
        body: { imageData },
      });

      if (error) {
        console.error("Function error:", error);
        toast.error("Failed to analyze image. Please try again.");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResults(data);
      toast.success("Food analyzed successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">NutriVision</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Food Recognition & Calorie Tracker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
        {results && <NutritionResults items={results.items} totalCalories={results.totalCalories} />}
      </main>
    </div>
  );
};

export default Index;
