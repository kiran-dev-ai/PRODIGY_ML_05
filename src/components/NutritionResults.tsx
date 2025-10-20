import { Apple, Flame, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FoodItem {
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

interface NutritionResultsProps {
  items: FoodItem[];
  totalCalories: number;
}

export const NutritionResults = ({ items, totalCalories }: NutritionResultsProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-primary text-primary-foreground";
    if (confidence >= 60) return "bg-secondary text-secondary-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Total Calories Card */}
      <Card className="p-6 bg-gradient-hero shadow-glow border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium">Total Calories</p>
              <p className="text-white text-3xl font-bold">{totalCalories}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm font-medium">Detected Items</p>
            <p className="text-white text-2xl font-bold">{items.length}</p>
          </div>
        </div>
      </Card>

      {/* Food Items */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Apple className="w-5 h-5 text-primary" />
          Nutritional Breakdown
        </h3>
        {items.map((item, index) => (
          <Card key={index} className="p-6 bg-gradient-card shadow-soft hover:shadow-glow transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.servingSize}</p>
                </div>
                <Badge className={getConfidenceColor(item.confidence)}>
                  {item.confidence}% confident
                </Badge>
              </div>

              {/* Calories */}
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <Flame className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-2xl font-bold text-foreground">{item.calories}</p>
                </div>
              </div>

              {/* Macros */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Macronutrients</span>
                </div>
                
                {/* Protein */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium text-foreground">{item.protein}g</span>
                  </div>
                  <Progress value={item.protein} className="h-2" />
                </div>

                {/* Carbs */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbohydrates</span>
                    <span className="font-medium text-foreground">{item.carbs}g</span>
                  </div>
                  <Progress value={item.carbs} className="h-2" />
                </div>

                {/* Fat */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fat</span>
                    <span className="font-medium text-foreground">{item.fat}g</span>
                  </div>
                  <Progress value={item.fat} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
