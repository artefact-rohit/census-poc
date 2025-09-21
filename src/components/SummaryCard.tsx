import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BreakdownItem {
  label: string;
  value: number;
  total: number;
}

interface SummaryCardProps {
  title: string;
  completed: number;
  total: number;
  weeklyProgress: number;
  plannedVsActual: number;
  breakdown?: BreakdownItem[];
}

export const SummaryCard = ({ 
  title, 
  completed, 
  total, 
  weeklyProgress, 
  plannedVsActual, 
  breakdown 
}: SummaryCardProps) => {
  const completionRate = (completed / total) * 100;
  
  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-status-success" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-status-danger" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-status-success";
    if (percentage >= 70) return "text-status-warning";
    return "text-status-danger";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {getTrendIcon(weeklyProgress)}
            <span className="text-sm font-medium">
              {weeklyProgress > 0 ? '+' : ''}{weeklyProgress}% WoW
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-card-foreground">
              {completed}
              <span className="text-lg font-normal text-muted-foreground">/{total}</span>
            </span>
            <span className={`text-sm font-medium ${getStatusColor(completionRate)}`}>
              {completionRate.toFixed(1)}%
            </span>
          </div>
          <Progress value={completionRate} />
        </div>

        {/* Breakdown */}
        {breakdown && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-card-foreground">Breakdown</h4>
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {item.value}/{item.total}
                    </span>
                    <div className="w-16">
                      <Progress value={(item.value / item.total) * 100} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Planned vs Actual */}
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Planned vs Actual</span>
            <span className={`font-medium ${getStatusColor(plannedVsActual)}`}>
              {plannedVsActual}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};