import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Thao tác thành công",
      description: `Đã thực hiện: ${action}`,
    });
  };

  const actions = [
    {
      title: "Tạo bài tập cho lớp",
      description: "Tạo bài tập dựa trên lỗi phổ biến",
      icon: FileText,
      variant: "default" as const,
      action: "Tạo bài tập cho lớp"
    },
    {
      title: "Gửi tài liệu cá nhân",
      description: "Gửi tài liệu hỗ trợ cho học sinh",
      icon: Send,
      variant: "outline" as const,
      action: "Gửi tài liệu cá nhân"
    },
    {
      title: "Gửi báo cáo phụ huynh",
      description: "Báo cáo tình hình học tập",
      icon: Users,
      variant: "secondary" as const,
      action: "Gửi báo cáo phụ huynh"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hành động nhanh</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant}
              className="w-full h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => handleAction(action.action)}
            >
              <div className="flex items-center gap-2 w-full">
                <IconComponent className="h-5 w-5" />
                <span className="font-medium text-sm">{action.title}</span>
              </div>
              <p className="text-xs text-left opacity-80 leading-relaxed">
                {action.description}
              </p>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}