import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Clock,
  CheckCircle,
} from "lucide-react";
import { SummaryCard } from "@/components/SummaryCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useAtomValue } from "jotai";
import { jsonDataAtom } from "@/lib/utils";

const Dashboard = () => {
  // Mock data for demonstration
  const getData = useAtomValue(jsonDataAtom);

  const mockData = getData.overview.cardData;

  const [resolvedItems, setResolvedItems] = useState<number[]>([]);

  const actionItems = getData.overview.actionItems;

  const handleResolve = (id: number) => {
    setResolvedItems([...resolvedItems, id]);
  };

  const getCriticalityBadge = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case "high":
        return <Badge variant="destructive">{criticality}</Badge>;
      case "medium":
        return <Badge variant="secondary">{criticality}</Badge>;
      default:
        return <Badge variant="outline">{criticality}</Badge>;
    }
  };

  const getTrendIcon = (value: number) => {
    if (value > 0)
      return <TrendingUp className="h-4 w-4 text-status-success" />;
    if (value < 0)
      return <TrendingDown className="h-4 w-4 text-status-danger" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Registers-Based Census: Weekly Progress Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Week ending September 18, 2024
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  // Handle data update functionality here
                  console.log("Update data clicked");
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Update Data</span>
              </Button>
              <div className="flex items-center space-x-2 text-xs bg-muted px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                <span>Last updated: 09:45 AM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryCard
            title="Indicators"
            completed={mockData.indicators.completed}
            total={mockData.indicators.total}
            weeklyProgress={mockData.indicators.weeklyProgress}
            plannedVsActual={mockData.indicators.plannedVsActual}
            breakdown={[
              {
                label: "Population",
                value: mockData.indicators.baskets.population.completed,
                total: mockData.indicators.baskets.population.total,
              },
              {
                label: "Family Characteristics",
                value: mockData.indicators.baskets.family.completed,
                total: mockData.indicators.baskets.family.total,
              },
              {
                label: "Economic",
                value: mockData.indicators.baskets.economic.completed,
                total: mockData.indicators.baskets.economic.total,
              },
              {
                label: "Buildings & Units",
                value: mockData.indicators.baskets.buildings.completed,
                total: mockData.indicators.baskets.buildings.total,
              },
              {
                label: "Establishments",
                value: mockData.indicators.baskets.establishments.completed,
                total: mockData.indicators.baskets.establishments.total,
              },
            ]}
          />

          <SummaryCard
            title="Registers"
            completed={mockData.registers.completed}
            total={mockData.registers.total}
            weeklyProgress={mockData.registers.weeklyProgress}
            plannedVsActual={mockData.registers.plannedVsActual}
            breakdown={[
              {
                label: "Population & Household",
                value: mockData.registers.baskets.population.completed,
                total: mockData.registers.baskets.population.total,
              },
              {
                label: "Buildings & Units",
                value: mockData.registers.baskets.buildings.completed,
                total: mockData.registers.baskets.buildings.total,
              },
              {
                label: "Establishments",
                value: mockData.registers.baskets.establishments.completed,
                total: mockData.registers.baskets.establishments.total,
              },
              {
                label: "SBR (Secondary)",
                value: mockData.registers.baskets.sbr.completed,
                total: mockData.registers.baskets.sbr.total,
              },
            ]}
          />

          <SummaryCard
            title="Datasets"
            completed={mockData.datasets.acquired}
            total={mockData.datasets.total}
            weeklyProgress={mockData.datasets.weeklyProgress}
            plannedVsActual={mockData.datasets.plannedVsActual}
            breakdown={[
              {
                label: "MOI Data",
                value: mockData.datasets.baskets.moi.completed,
                total: mockData.datasets.baskets.moi.total,
              },
              {
                label: "MOCI Records",
                value: mockData.datasets.baskets.moci.completed,
                total: mockData.datasets.baskets.moci.total,
              },
              {
                label: "Kahramaa",
                value: mockData.datasets.baskets.kahramaa.completed,
                total: mockData.datasets.baskets.kahramaa.total,
              },
              {
                label: "Education Ministry",
                value: mockData.datasets.baskets.education.completed,
                total: mockData.datasets.baskets.education.total,
              },
            ]}
          />

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Dissemination
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(mockData.dissemination.weeklyProgress)}
                  <span className="text-sm font-medium">
                    {mockData.dissemination.weeklyProgress > 0 ? "+" : ""}
                    {mockData.dissemination.weeklyProgress}% WoW
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">
                    {mockData.dissemination.progress}%
                  </span>
                </div>
                <Progress value={mockData.dissemination.progress} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">UI/UX Design</span>
                  <StatusBadge
                    status={
                      mockData.dissemination.baskets["ui/ux"] || "completed"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Development</span>
                  <StatusBadge
                    status={
                      mockData.dissemination.baskets.platform || "in-progress"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">KPI Integration</span>
                  <StatusBadge
                    status={mockData.dissemination.baskets.kpi || "not-started"}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Planned vs Actual
                  </span>
                  <span className="font-medium">
                    {mockData.dissemination.plannedVsActual}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions & Support Needed */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Actions & Support Needed
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Items requiring DG/SG attention - start weekly meetings with this
              section
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Criticality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={
                      resolvedItems.includes(item.id) ? "opacity-50" : ""
                    }
                  >
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>
                      {getCriticalityBadge(item.criticality)}
                    </TableCell>
                    <TableCell>
                      {resolvedItems.includes(item.id) ? (
                        <div className="flex items-center space-x-1 text-status-success">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Resolved</span>
                        </div>
                      ) : (
                        <StatusBadge
                          status={
                            item.status.toLowerCase() === "pending"
                              ? "not-started"
                              : item.status.toLowerCase() === "in review"
                              ? "in-progress"
                              : (item.status
                                  .toLowerCase()
                                  .replace(" ", "-") as any)
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolve(item.id)}
                        disabled={resolvedItems.includes(item.id)}
                        className="text-xs"
                      >
                        {resolvedItems.includes(item.id)
                          ? "Resolved"
                          : "Resolve"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
