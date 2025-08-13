import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { studentsData, Student, getRiskScoreColor, getRiskScoreLabel } from "@/data/mockData";

interface FilterProps {
  selectedClass: string;
  selectedGroup: string;
  selectedTopic: string;
  timeRange: string;
}

interface StudentsTableProps {
  filters: FilterProps;
  onStudentSelect: (student: Student) => void;
  selectedError: string | null;
}

export function StudentsTable({ filters, onStudentSelect, selectedError }: StudentsTableProps) {
  // Filter students based on selected group and error
  const filteredStudents = studentsData.filter(student => {
    const groupMatch = filters.selectedGroup === "Tất cả" || student.group === filters.selectedGroup;
    const errorMatch = !selectedError || student.mainError === selectedError;
    return groupMatch && errorMatch;
  });

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 70) return "destructive";
    if (score >= 50) return "secondary";
    if (score >= 30) return "outline";
    return "default";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Danh sách học sinh
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {filteredStudents.length} học sinh
          {selectedError && ` (lọc theo: ${selectedError})`}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredStudents.map((student) => (
            <div 
              key={student.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {student.id} • Nhóm {student.group}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStudentSelect(student)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Điểm TB:</span>
                  <span className="font-medium">{student.avgScore.toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span>Risk Score:</span>
                  <Badge 
                    variant={getRiskBadgeVariant(student.riskScore)}
                    className="text-xs"
                  >
                    {student.riskScore} - {getRiskScoreLabel(student.riskScore)}
                  </Badge>
                </div>
                
                <div className="text-xs">
                  <span className="text-muted-foreground">Lỗi chính: </span>
                  <span className="font-medium">{student.mainError || "Không có"}</span>
                </div>
                
                <div className="text-xs">
                  <span className="text-muted-foreground">Đề xuất: </span>
                  <span className="text-primary">{student.lastAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Không có học sinh phù hợp với bộ lọc</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}