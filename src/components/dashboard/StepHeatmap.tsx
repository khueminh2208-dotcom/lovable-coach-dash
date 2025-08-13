import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStepSuccessRates } from "@/data/mockData";

interface FilterProps {
  selectedClass: string;
  selectedGroup: string;
  selectedTopic: string;
  timeRange: string;
}

interface StepHeatmapProps {
  filters: FilterProps;
}

export function StepHeatmap({ filters }: StepHeatmapProps) {
  const stepData = getStepSuccessRates();

  const getHeatmapColor = (rate: number) => {
    if (rate >= 80) return "bg-accent text-white";
    if (rate >= 60) return "bg-warning-light text-warning-foreground";
    if (rate >= 40) return "bg-warning text-warning-foreground";
    return "bg-destructive-light text-destructive-foreground";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Tỷ lệ đúng theo bước giải
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {filters.selectedTopic}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stepData.map((step, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{step.stepName}</span>
                <span className="text-muted-foreground">{step.successRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getHeatmapColor(step.successRate)}`}
                  style={{ width: `${step.successRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Thang đánh giá:</p>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-accent rounded" />
              <span className="text-xs">Tốt (≥80%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-warning-light rounded" />
              <span className="text-xs">Khá (60-79%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-warning rounded" />
              <span className="text-xs">TB (40-59%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-destructive-light rounded" />
              <span className="text-xs">Yếu (&lt;40%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}