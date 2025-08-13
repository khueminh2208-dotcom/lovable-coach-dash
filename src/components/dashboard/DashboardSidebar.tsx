import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface DashboardSidebarProps {
  filters: FilterProps;
}

export function DashboardSidebar({ filters }: DashboardSidebarProps) {
  const {
    selectedClass,
    selectedGroup,
    selectedTopic,
    timeRange,
    setSelectedClass,
    setSelectedGroup,
    setSelectedTopic,
    setTimeRange
  } = filters;

  return (
    <Sidebar className="w-72">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Bộ lọc dữ liệu</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4 p-4">
            
            {/* Class filter */}
            <div className="space-y-2">
              <Label htmlFor="class-select" className="text-sm font-medium">
                Lớp học
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9A1">9A1</SelectItem>
                  <SelectItem value="9A2">9A2</SelectItem>
                  <SelectItem value="9B1">9B1</SelectItem>
                  <SelectItem value="9B2">9B2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Group filter */}
            <div className="space-y-2">
              <Label htmlFor="group-select" className="text-sm font-medium">
                Nhóm học sinh
              </Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger id="group-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="A1">Nhóm A1</SelectItem>
                  <SelectItem value="A2">Nhóm A2</SelectItem>
                  <SelectItem value="B1">Nhóm B1</SelectItem>
                  <SelectItem value="B2">Nhóm B2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Topic filter */}
            <div className="space-y-2">
              <Label htmlFor="topic-select" className="text-sm font-medium">
                Chủ đề
              </Label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger id="topic-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hệ phương trình bậc nhất 2 ẩn">
                    Hệ phương trình bậc nhất 2 ẩn
                  </SelectItem>
                  <SelectItem value="Phương trình bậc hai">
                    Phương trình bậc hai
                  </SelectItem>
                  <SelectItem value="Hàm số bậc nhất">
                    Hàm số bậc nhất
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time range filter */}
            <div className="space-y-2">
              <Label htmlFor="time-select" className="text-sm font-medium">
                Khoảng thời gian
              </Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="time-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 ngày qua">7 ngày qua</SelectItem>
                  <SelectItem value="30 ngày qua">30 ngày qua</SelectItem>
                  <SelectItem value="Học kỳ này">Học kỳ này</SelectItem>
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}