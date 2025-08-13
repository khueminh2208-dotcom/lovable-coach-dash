import { useState } from "react";
import { KPICards } from "./KPICards";
import { QuickActions } from "./QuickActions";
import { AnalyticsRow } from "./AnalyticsRow";
import { StudentDetailModal } from "./StudentDetailModal";
import { Student } from "@/data/mockData";

interface FilterProps {
  selectedClass: string;
  selectedGroup: string;
  selectedTopic: string;
  timeRange: string;
  setSelectedClass: (value: string) => void;
  setSelectedGroup: (value: string) => void;
  setSelectedTopic: (value: string) => void;
  setTimeRange: (value: string) => void;
}

interface DashboardMainProps {
  filters: FilterProps;
}

export function DashboardMain({ filters }: DashboardMainProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedError, setSelectedError] = useState<string | null>(null);

  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      {/* Row 1: KPI Cards and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <KPICards filters={filters} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Row 2: Analytics Components */}
      <AnalyticsRow 
        filters={filters}
        onStudentSelect={setSelectedStudent}
        selectedError={selectedError}
        onErrorSelect={setSelectedError}
      />

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </main>
  );
}