// Mock data for the dashboard based on CSV structure

export interface Student {
  id: string;
  name: string;
  group: string;
  avgScore: number;
  riskScore: number;
  mainError: string;
  lastAction: string;
}

export interface Response {
  studentId: string;
  questionId: string;
  score: number;
  errorType: string;
  severity: number;
  timestamp: string;
}

export interface TopicStep {
  topicId: string;
  stepId: string;
  stepName: string;
  totalQuestions: number;
  correctAnswers: number;
}

export interface Question {
  id: string;
  topicId: string;
  stepId: string;
  content: string;
  pValue: number;
  discrimination: number;
  distractorRate: number;
  quality: 'high' | 'medium' | 'low';
}

// Mock students data
export const studentsData: Student[] = [
  { id: "HS001", name: "Nguyễn Văn An", group: "A1", avgScore: 7.5, riskScore: 25, mainError: "Sai quy tắc dấu", lastAction: "Gửi bài tập cá nhân" },
  { id: "HS002", name: "Trần Thị Bình", group: "A1", avgScore: 4.2, riskScore: 75, mainError: "Không hiểu khái niệm", lastAction: "Cần gặp riêng" },
  { id: "HS003", name: "Lê Minh Cường", group: "A2", avgScore: 8.3, riskScore: 15, mainError: "Tính toán sai", lastAction: "Hoàn thành tốt" },
  { id: "HS004", name: "Phạm Thị Dung", group: "A2", avgScore: 5.8, riskScore: 55, mainError: "Sai bước giải", lastAction: "Gửi tài liệu" },
  { id: "HS005", name: "Hoàng Văn Em", group: "B1", avgScore: 6.7, riskScore: 42, mainError: "Thiếu kiến thức cơ bản", lastAction: "Ôn tập nhóm" },
  { id: "HS006", name: "Nguyễn Thị Phương", group: "B1", avgScore: 9.1, riskScore: 8, mainError: "Không có", lastAction: "Tiếp tục theo dõi" },
  { id: "HS007", name: "Vũ Minh Hải", group: "B2", avgScore: 3.8, riskScore: 82, mainError: "Không nắm bài", lastAction: "Cần hỗ trợ khẩn cấp" },
  { id: "HS008", name: "Đỗ Thị Hồng", group: "B2", avgScore: 7.9, riskScore: 20, mainError: "Sai công thức", lastAction: "Luyện tập thêm" },
];

// Mock responses data
export const responsesData: Response[] = [
  { studentId: "HS001", questionId: "Q001", score: 8, errorType: "Sai quy tắc dấu", severity: 2, timestamp: "2024-01-15" },
  { studentId: "HS002", questionId: "Q001", score: 3, errorType: "Không hiểu khái niệm", severity: 4, timestamp: "2024-01-15" },
  { studentId: "HS003", questionId: "Q001", score: 9, errorType: "Tính toán sai", severity: 1, timestamp: "2024-01-15" },
  { studentId: "HS004", questionId: "Q002", score: 5, errorType: "Sai bước giải", severity: 3, timestamp: "2024-01-15" },
  { studentId: "HS005", questionId: "Q002", score: 6, errorType: "Thiếu kiến thức cơ bản", severity: 3, timestamp: "2024-01-15" },
  { studentId: "HS006", questionId: "Q003", score: 10, errorType: "", severity: 0, timestamp: "2024-01-15" },
  { studentId: "HS007", questionId: "Q003", score: 2, errorType: "Không nắm bài", severity: 5, timestamp: "2024-01-15" },
  { studentId: "HS008", questionId: "Q004", score: 8, errorType: "Sai công thức", severity: 2, timestamp: "2024-01-15" },
];

// Mock topics and steps
export const topicsStepsData: TopicStep[] = [
  { topicId: "T001", stepId: "S001", stepName: "Xác định nghiệm", totalQuestions: 10, correctAnswers: 6 },
  { topicId: "T001", stepId: "S002", stepName: "Giải phương trình", totalQuestions: 10, correctAnswers: 4 },
  { topicId: "T001", stepId: "S003", stepName: "Kiểm tra nghiệm", totalQuestions: 10, correctAnswers: 8 },
  { topicId: "T001", stepId: "S004", stepName: "Kết luận", totalQuestions: 10, correctAnswers: 7 },
];

// Mock questions
export const questionsData: Question[] = [
  { id: "Q001", topicId: "T001", stepId: "S001", content: "Giải hệ phương trình bậc nhất 2 ẩn", pValue: 0.65, discrimination: 0.45, distractorRate: 0.25, quality: 'high' },
  { id: "Q002", topicId: "T001", stepId: "S002", content: "Tìm nghiệm của hệ phương trình", pValue: 0.35, discrimination: 0.60, distractorRate: 0.40, quality: 'medium' },
  { id: "Q003", topicId: "T001", stepId: "S003", content: "Kiểm tra tính đúng sai nghiệm", pValue: 0.80, discrimination: 0.30, distractorRate: 0.15, quality: 'low' },
  { id: "Q004", topicId: "T001", stepId: "S004", content: "Biện luận số nghiệm", pValue: 0.55, discrimination: 0.50, distractorRate: 0.30, quality: 'high' },
];

// Calculate risk score based on the formula
export function calculateRiskScore(avgScore: number, severity: number, repetitionCount: number, maxRepetition: number = 5): number {
  const avgScoreComponent = (1 - avgScore / 10) * 0.5;
  const severityComponent = (severity / 5) * 0.3;
  const repetitionComponent = (repetitionCount / maxRepetition) * 0.2;
  
  return Math.round((avgScoreComponent + severityComponent + repetitionComponent) * 100);
}

// Calculate topic mastery
export function calculateTopicMastery(steps: TopicStep[]): number {
  const totalStepsCorrect = steps.reduce((sum, step) => sum + step.correctAnswers, 0);
  const totalStepsTotal = steps.reduce((sum, step) => sum + step.totalQuestions, 0);
  
  return Math.round((totalStepsCorrect / totalStepsTotal) * 100);
}

// Get KPI data
export function getKPIData() {
  const scores = studentsData.map(s => s.avgScore);
  const submittedCount = studentsData.length;
  const topicMastery = calculateTopicMastery(topicsStepsData);
  const avgRiskScore = Math.round(studentsData.reduce((sum, s) => sum + s.riskScore, 0) / studentsData.length);
  const lowQualityQuestions = questionsData.filter(q => q.quality === 'low').length;

  return {
    medianScore: scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)],
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    studentsSubmitted: submittedCount,
    avgRiskScore,
    topicMastery,
    lowQualityQuestions
  };
}

// Get top errors
export function getTopErrors() {
  const errorCounts: { [key: string]: number } = {};
  
  responsesData.forEach(response => {
    if (response.errorType) {
      errorCounts[response.errorType] = (errorCounts[response.errorType] || 0) + 1;
    }
  });

  return Object.entries(errorCounts)
    .map(([error, count]) => ({ error, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

// Get step-wise success rates for heatmap
export function getStepSuccessRates() {
  return topicsStepsData.map(step => ({
    stepName: step.stepName,
    successRate: Math.round((step.correctAnswers / step.totalQuestions) * 100)
  }));
}

// Risk score color mapping
export function getRiskScoreColor(score: number): string {
  if (score >= 70) return 'hsl(0 72% 70%)'; // very-high
  if (score >= 50) return 'hsl(25 95% 53%)'; // high  
  if (score >= 30) return 'hsl(48 96% 65%)'; // medium
  return 'hsl(132 30% 62.7%)'; // low
}

export function getRiskScoreLabel(score: number): string {
  if (score >= 70) return 'Rất cao';
  if (score >= 50) return 'Cao';
  if (score >= 30) return 'Trung bình';
  return 'Thấp';
}