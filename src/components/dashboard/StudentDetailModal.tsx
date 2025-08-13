import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Student, getRiskScoreLabel, getRiskScoreColor, calculateRiskScore } from "@/data/mockData";
import { FileText, Send, Users, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentDetailModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
  const { toast } = useToast();

  // Mock score history data
  const scoreHistory = [
    { test: "Bài 1", score: 6.5 },
    { test: "Bài 2", score: 5.8 },
    { test: "Bài 3", score: 7.2 },
    { test: "Bài 4", score: student.avgScore },
  ];

  // Mock question details
  const questionDetails = [
    { question: "Câu 1: Giải hệ PT", result: "Đúng", error: "-", score: 8 },
    { question: "Câu 2: Tìm nghiệm", result: "Sai", error: student.mainError, score: 4 },
    { question: "Câu 3: Kiểm tra", result: "Đúng", error: "-", score: 9 },
    { question: "Câu 4: Biện luận", result: "Sai", error: "Tính toán sai", score: 5 },
  ];

  // Mock step performance
  const stepPerformance = [
    { step: "Xác định nghiệm", correct: true },
    { step: "Giải phương trình", correct: false },
    { step: "Kiểm tra nghiệm", correct: true },
    { step: "Kết luận", correct: false },
  ];

  const chartConfig = {
    score: {
      label: "Điểm số",
      color: "hsl(var(--primary))"
    }
  };

  const handleAction = (action: string) => {
    toast({
      title: "Thao tác thành công",
      description: `Đã thực hiện ${action} cho ${student.name}`,
    });
    onClose();
  };

  // Risk score breakdown
  const avgScoreComponent = (1 - student.avgScore / 10) * 0.5;
  const severityComponent = (3 / 5) * 0.3; // Mock severity
  const repetitionComponent = (2 / 5) * 0.2; // Mock repetition

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết học sinh - {student.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mã số</p>
                  <p className="font-medium">{student.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nhóm</p>
                  <p className="font-medium">Nhóm {student.group}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Điểm trung bình</p>
                  <p className="font-medium">{student.avgScore.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <Badge 
                    style={{ backgroundColor: getRiskScoreColor(student.riskScore) }}
                    className="text-white"
                  >
                    {student.riskScore} - {getRiskScoreLabel(student.riskScore)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Biểu đồ điểm số</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreHistory}>
                      <XAxis dataKey="test" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="var(--color-score)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-score)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Step Performance Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chi tiết các bước</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stepPerformance.map((step, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{step.step}</span>
                      <Badge variant={step.correct ? "default" : "destructive"}>
                        {step.correct ? "Đúng" : "Sai"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Details Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chi tiết từng câu hỏi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Câu hỏi</th>
                      <th className="text-left p-2">Kết quả</th>
                      <th className="text-left p-2">Loại lỗi</th>
                      <th className="text-left p-2">Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionDetails.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.question}</td>
                        <td className="p-2">
                          <Badge variant={item.result === "Đúng" ? "default" : "destructive"}>
                            {item.result}
                          </Badge>
                        </td>
                        <td className="p-2 text-muted-foreground">{item.error}</td>
                        <td className="p-2 font-medium">{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Risk Score Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Phân tích Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Thành phần điểm số (50%)</span>
                  <span>{(avgScoreComponent * 100).toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mức độ nghiêm trọng (30%)</span>
                  <span>{(severityComponent * 100).toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tần suất lặp lại (20%)</span>
                  <span>{(repetitionComponent * 100).toFixed(1)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Tổng Risk Score</span>
                  <span>{student.riskScore}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hành động đề xuất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => handleAction("gửi bài tập cá nhân")}
                  className="h-auto py-3 flex flex-col gap-1"
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">Gửi bài tập</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => handleAction("gửi tài liệu hỗ trợ")}
                  className="h-auto py-3 flex flex-col gap-1"
                >
                  <Send className="h-4 w-4" />
                  <span className="text-xs">Gửi tài liệu</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => handleAction("thông báo phụ huynh")}
                  className="h-auto py-3 flex flex-col gap-1"
                >
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Báo phụ huynh</span>
                </Button>
                
                <Button 
                  variant="default"
                  onClick={() => handleAction("tự động soạn nội dung")}
                  className="h-auto py-3 flex flex-col gap-1"
                >
                  <Bot className="h-4 w-4" />
                  <span className="text-xs">Tự động soạn</span>
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Gợi ý hành động:</p>
                <p className="text-sm text-muted-foreground">
                  Dựa trên lỗi "{student.mainError}" và Risk Score {student.riskScore}, 
                  học sinh cần được hỗ trợ đặc biệt về kiến thức cơ bản. 
                  Đề xuất gặp riêng và cung cấp tài liệu ôn tập có hướng dẫn chi tiết.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}