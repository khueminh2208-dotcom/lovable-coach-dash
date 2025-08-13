import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getKPIData } from "@/data/mockData";
import { TrendingUp, TrendingDown, Users, Target, AlertTriangle, BookOpen, HelpCircle } from "lucide-react";

interface FilterProps {
  selectedClass: string;
  selectedGroup: string;
  selectedTopic: string;
  timeRange: string;
}

interface KPICardsProps {
  filters: FilterProps;
}

export function KPICards({ filters }: KPICardsProps) {
  const kpiData = getKPIData();

  const kpiCards = [
    {
      title: "Điểm trung vị lớp",
      value: kpiData.medianScore.toFixed(1),
      icon: Target,
      trend: "stable",
      description: "Điểm số ở giữa của lớp"
    },
    {
      title: "Điểm cao nhất",
      value: kpiData.highestScore.toFixed(1),
      icon: TrendingUp,
      trend: "up",
      description: "Thành tích tốt nhất lớp"
    },
    {
      title: "Điểm thấp nhất", 
      value: kpiData.lowestScore.toFixed(1),
      icon: TrendingDown,
      trend: "down",
      description: "Cần quan tâm đặc biệt"
    },
    {
      title: "Học sinh đã nộp",
      value: kpiData.studentsSubmitted.toString(),
      icon: Users,
      trend: "stable",
      description: "Tổng số bài đã thu"
    },
    {
      title: "Điểm rủi ro TB",
      value: kpiData.avgRiskScore.toString(),
      icon: AlertTriangle,
      trend: kpiData.avgRiskScore > 50 ? "warning" : "stable",
      description: "Mức độ rủi ro trung bình"
    },
    {
      title: `Tỷ lệ nắm chủ đề`,
      value: `${kpiData.topicMastery}%`,
      icon: BookOpen,
      trend: kpiData.topicMastery > 70 ? "up" : "warning",
      description: filters.selectedTopic
    },
    {
      title: "Câu hỏi cần sửa",
      value: kpiData.lowQualityQuestions.toString(),
      icon: HelpCircle,
      trend: kpiData.lowQualityQuestions > 2 ? "warning" : "stable",
      description: "Số câu chất lượng thấp"
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-accent";
      case "down": return "text-destructive";
      case "warning": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getTrendBadgeVariant = (trend: string) => {
    switch (trend) {
      case "up": return "default";
      case "down": return "destructive";
      case "warning": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Tổng quan lớp học</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <IconComponent className={`h-4 w-4 ${getTrendColor(card.trend)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">
                    {card.value}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {card.description}
                  </p>
                  <Badge variant={getTrendBadgeVariant(card.trend)} className="text-xs">
                    {card.trend === "up" && "Tích cực"}
                    {card.trend === "down" && "Cần cải thiện"}
                    {card.trend === "warning" && "Cảnh báo"}
                    {card.trend === "stable" && "Ổn định"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}