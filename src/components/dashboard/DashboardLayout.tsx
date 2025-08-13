import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardMain } from "./DashboardMain";

export function DashboardLayout() {
  const [selectedClass, setSelectedClass] = useState("9A1");
  const [selectedGroup, setSelectedGroup] = useState("Tất cả");
  const [selectedTopic, setSelectedTopic] = useState("Hệ phương trình bậc nhất 2 ẩn");
  const [timeRange, setTimeRange] = useState("7 ngày qua");

  const filters = {
    selectedClass,
    selectedGroup, 
    selectedTopic,
    timeRange,
    setSelectedClass,
    setSelectedGroup,
    setSelectedTopic,
    setTimeRange
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar filters={filters} />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <DashboardMain filters={filters} />
        </div>
      </div>
    </SidebarProvider>
  );
}