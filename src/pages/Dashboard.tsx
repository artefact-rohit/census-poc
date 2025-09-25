import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  // Mock data for demonstration
  const getData = useAtomValue(jsonDataAtom);

  const mockData = getData.overview.cardData;

  const [resolvedItems, setResolvedItems] = useState<number[]>([]);
  const [indicatorStatusFilter, setIndicatorStatusFilter] =
    useState("calc-in-progress");

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

  const getIndicatorTotal = () => {
    return indicatorStatusFilter == "in-progress"
      ? mockData.indicators.inProgress
      : indicatorStatusFilter == "not-started"
      ? mockData.indicators.notStarted
      : indicatorStatusFilter == "computed"
      ? mockData.indicators?.computed
      : indicatorStatusFilter == "validated"
      ? mockData.indicators?.validated
      : 0;
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
                Week ending September 25, 2025
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
          {/* Indicators Card with Status Filter */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Indicators
                </CardTitle>
                {/* <div className="flex items-center space-x-2">
                  {getTrendIcon(mockData.indicators.weeklyProgress)}
                  <span className="text-sm font-medium">
                    {mockData.indicators.weeklyProgress > 0 ? "+" : ""}
                    {mockData.indicators.weeklyProgress}% WoW
                  </span>
                </div> */}
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                <Button
                  variant={
                    indicatorStatusFilter === "not-started"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setIndicatorStatusFilter("not-started")}
                  className={`h-[45px] ${
                    indicatorStatusFilter === "not-started"
                      ? "bg-muted text-muted-foreground hover:bg-muted/80"
                      : "hover:bg-muted/50"
                  }`}
                >
                  Not Started
                </Button>
                <Button
                  variant={
                    indicatorStatusFilter === "method-in-progress"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setIndicatorStatusFilter("method-in-progress")}
                  className={`max-w-[150px] px-4 h-[45px] ${
                    indicatorStatusFilter === "method-in-progress"
                      ? "bg-status-warning text-status-warning-foreground hover:bg-status-warning/90"
                      : "hover:bg-status-warning/20 border-status-warning/30"
                  }`}
                >
                  Methodology
                  <br /> in progress
                </Button>
                <Button
                  variant={
                    indicatorStatusFilter === "calc-in-progress"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setIndicatorStatusFilter("calc-in-progress")}
                  className={`max-w-[150px] px-4 h-[45px] ${
                    indicatorStatusFilter === "calc-in-progress"
                      ? "bg-status-warning text-status-warning-foreground hover:bg-status-warning/90"
                      : "hover:bg-status-warning/20 border-status-warning/30"
                  }`}
                >
                  Calculation
                  <br /> in Progress
                </Button>
                <Button
                  variant={
                    indicatorStatusFilter === "computed" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setIndicatorStatusFilter("computed")}
                  className={` h-[45px] ${
                    indicatorStatusFilter === "computed"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-primary/20 border-primary/30"
                  }`}
                >
                  Computed
                </Button>
                <Button
                  variant={
                    indicatorStatusFilter === "validated"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setIndicatorStatusFilter("validated")}
                  className={` h-[45px] ${
                    indicatorStatusFilter === "validated"
                      ? "bg-status-success text-status-success-foreground hover:bg-status-success/90"
                      : "hover:bg-status-success/20 border-status-success/30"
                  }`}
                >
                  Validated
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-card-foreground">
                    {getIndicatorTotal()}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{mockData.indicators.total}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-status-success">
                    {(
                      (getIndicatorTotal() / mockData.indicators.total) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (getIndicatorTotal() / mockData.indicators.total) * 100
                  }
                />
              </div>

              {/* Breakdown by Basket */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-card-foreground">
                  Breakdown by Basket (out of {mockData.indicators.total})
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Population
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.population?.completed
                        }
                        /
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.population?.total
                        }
                      </span>
                      <div className="w-16">
                        <Progress
                          value={
                            (mockData.indicators.baskets?.[
                              indicatorStatusFilter
                            ]?.population?.completed /
                              mockData.indicators.baskets?.[
                                indicatorStatusFilter
                              ]?.population?.total) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Family Characteristics
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.family?.completed
                        }
                        /
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.family?.total
                        }
                      </span>
                      <div className="w-16">
                        <Progress
                          value={
                            (mockData.indicators.baskets?.[
                              indicatorStatusFilter
                            ]?.family?.completed /
                              mockData.indicators.baskets?.[
                                indicatorStatusFilter
                              ]?.family?.total) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Economic
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.economic?.completed
                        }
                        /
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.economic?.total
                        }
                      </span>
                      <div className="w-16">
                        <Progress
                          value={
                            (mockData.indicators.baskets?.[
                              indicatorStatusFilter
                            ]?.economic?.completed /
                              mockData.indicators.baskets?.[
                                indicatorStatusFilter
                              ]?.economic?.total) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Buildings
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.buildings?.completed
                        }
                        /
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.buildings?.total
                        }
                      </span>
                      <div className="w-16">
                        <Progress
                          value={
                            (mockData.indicators.baskets?.[
                              indicatorStatusFilter
                            ]?.buildings?.completed /
                              mockData.indicators.baskets?.[
                                indicatorStatusFilter
                              ]?.buildings?.total) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Establishments
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.establishments?.completed
                        }
                        /
                        {
                          mockData.indicators.baskets?.[indicatorStatusFilter]
                            ?.establishments?.total
                        }
                      </span>
                      <div className="w-16">
                        <Progress
                          value={
                            (mockData.indicators.baskets?.[
                              indicatorStatusFilter
                            ]?.establishments?.completed /
                              mockData.indicators.baskets?.[
                                indicatorStatusFilter
                              ]?.establishments?.total) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Planned vs Actual */}
              <div className="pt-2  border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Planned: {mockData.indicators.planned}% | Actual:{" "}
                    {mockData.indicators.actual}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Registers
                </CardTitle>
                {/* <div className="flex items-center space-x-2">
            {getTrendIcon(weeklyProgress)}
            <span className="text-sm font-medium">
              {weeklyProgress > 0 ? "+" : ""}
              {weeklyProgress}% WoW
            </span>
          </div> */}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Progress */}
              <div className="space-y-2 ">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-card-foreground">
                    <span className={`text-status-success`}>
                      {mockData.registers.completed.toFixed(1)}%
                    </span>
                  </span>
                </div>
                <Progress value={mockData.registers.completed} />
              </div>

              {/* Breakdown */}
              <div className="space-y-2 pb-12">
                <h4 className="text-sm font-medium text-card-foreground">
                  Update
                </h4>

                <div className="pt-0.5 space-y-2">
                  <ul className="pl-5">
                    {[
                      "Core registers (Population & Households, Buildings, Establishments) are being designed in collaboration with subject-matter expert, in alignment with international standards",
                      "Specific methodology is being developed at field level",
                      "Full completion of design is expected by 30 November 2025",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between pb-2"
                      >
                        <span className="text-sm text-muted-foreground">
                          - {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Planned vs Actual */}
              <div className="pt-2  border-t  border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {`Planned: ${mockData.registers.planned}% | Actual: ${mockData.registers.actual}%`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <SummaryCard
            title="Registers"
            completed={mockData.registers.completed}
            total={mockData.registers.total}
            weeklyProgress={mockData.registers.weeklyProgress}
            plannedVsActual={mockData.registers.actual}
            planned={mockData.registers.planned}
            showFraction={false}
            breakdown={}
          /> */}

          <SummaryCard
            title="Datasets"
            completed={mockData.datasets.acquired}
            total={mockData.datasets.total}
            weeklyProgress={mockData.datasets.weeklyProgress}
            plannedVsActual={mockData.datasets.actual}
            planned={mockData.datasets.planned}
            hideProgressBar={true}
            hideTotal={true}
            breakdown={[
              {
                label: "Access Secured",
                value: mockData.datasets.byStatus.accessSecured.completed,
                total: mockData.datasets.byStatus.accessSecured.total,
              },

              {
                label: "Requested",
                value: mockData.datasets.byStatus.requested.completed,
                total: mockData.datasets.byStatus.requested.total,
              },
              {
                label: "Validation In Progress",
                value:
                  mockData.datasets.byStatus.validationInProgress.completed,
                total: mockData.datasets.byStatus.validationInProgress.total,
              },
            ]}
          />

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Dissemination
                </CardTitle>
                {/* <div className="flex items-center space-x-2">
                  {getTrendIcon(mockData.dissemination.weeklyProgress)}
                  <span className="text-sm font-medium">
                    {mockData.dissemination.weeklyProgress > 0 ? "+" : ""}
                    {mockData.dissemination.weeklyProgress}% WoW
                  </span>
                </div> */}
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
                    status={mockData.dissemination.baskets["ui/ux"]}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Development</span>
                  <StatusBadge
                    status={mockData.dissemination.baskets.platform}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">KPI Integration</span>
                  <StatusBadge status={mockData.dissemination.baskets.kpi} />
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Planned: {mockData.dissemination.planned}% | Actual:{" "}
                    {mockData.dissemination.actual}%
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
              Actions Items
            </CardTitle>
            {/* <p className="text-sm text-muted-foreground mt-1">
              Items requiring DG/SG attention - start weekly meetings with this
              section
            </p> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Topic</TableHead>
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
                    <TableCell>{item.topic}</TableCell>
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
