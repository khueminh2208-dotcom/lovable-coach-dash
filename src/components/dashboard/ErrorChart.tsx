import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { getTopErrors } from "@/data/mockData";

interface ErrorChartProps {
  selectedError: string | null;
  onErrorSelect: (error: string | null) => void;
}

export function ErrorChart({ selectedError, onErrorSelect }: ErrorChartProps) {
  const errorData = getTopErrors();

  const chartConfig = {
    count: {
      label: "Số lần xuất hiện",
      color: "hsl(var(--primary))"
    }
  };

  const handleBarClick = (data: any) => {
    if (selectedError === data.error) {
      onErrorSelect(null);
    } else {
      onErrorSelect(data.error);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Top 5 lỗi phổ biến
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click vào cột để lọc học sinh
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorData} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
              <XAxis 
                dataKey="error" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-count)"
                className="cursor-pointer"
                onClick={handleBarClick}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {selectedError && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Đã lọc theo lỗi:</p>
            <p className="text-sm text-muted-foreground">{selectedError}</p>
            <button 
              onClick={() => onErrorSelect(null)}
              className="text-xs text-primary hover:underline mt-1"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}