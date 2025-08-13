import { StepHeatmap } from "./StepHeatmap";
import { ErrorChart } from "./ErrorChart";
import { StudentsTable } from "./StudentsTable";
import { Student } from "@/data/mockData";

interface FilterProps {
  selectedClass: string;
  selectedGroup: string;
  selectedTopic: string;
  timeRange: string;
}

interface AnalyticsRowProps {
  filters: FilterProps;
  onStudentSelect: (student: Student) => void;
  selectedError: string | null;
  onErrorSelect: (error: string | null) => void;
}

export function AnalyticsRow({ 
  filters, 
  onStudentSelect, 
  selectedError, 
  onErrorSelect 
}: AnalyticsRowProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Phân tích chi tiết</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap - Left */}
        <div className="lg:col-span-4">
          <StepHeatmap filters={filters} />
        </div>

        {/* Error Chart - Center */}
        <div className="lg:col-span-4">
          <ErrorChart 
            selectedError={selectedError}
            onErrorSelect={onErrorSelect}
          />
        </div>

        {/* Students Table - Right */}
        <div className="lg:col-span-4">
          <StudentsTable 
            filters={filters}
            onStudentSelect={onStudentSelect}
            selectedError={selectedError}
          />
        </div>
      </div>
    </div>
  );
}