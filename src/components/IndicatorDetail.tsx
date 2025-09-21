import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Indicator {
  id: string;
  name: string;
  basket: string;
  status: string;
  lastUpdate: string;
  coverage: number;
  qdti: number;
  methodology: string;
}

interface IndicatorDetailProps {
  indicator: Indicator | null;
}

export const IndicatorDetail = ({ indicator }: IndicatorDetailProps) => {
  if (!indicator) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-card-foreground mb-2">Select an Indicator</h3>
            <p className="text-sm text-muted-foreground">
              Choose an indicator from the list to view detailed information
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-status-success";
    if (percentage >= 70) return "text-status-warning";
    return "text-status-danger";
  };

  // Mock additional data for demonstration
  const mockDetailData = {
    weeklyChange: {
      coverage: +2.4,
      qdti: +1.8
    },
    plannedVsActual: {
      coverage: 94.2,
      qdti: 87.5
    },
    dataSources: [
      "Population Register",
      "MOI Civil Records", 
      "Educational Records"
    ],
    computationFrequency: "Weekly",
    nextUpdate: "2024-09-25",
    dependencies: [
      "Population Register completion",
      "Data quality validation"
    ],
    issues: [
      {
        type: "warning",
        message: "Coverage below target in Al Rayyan municipality",
        eta: "2024-09-22"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{indicator.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">{indicator.id}</Badge>
                <Badge>{indicator.basket}</Badge>
                <StatusBadge status={indicator.status as any} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Coverage</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className={`text-2xl font-bold ${getStatusColor(indicator.coverage)}`}>
                    {indicator.coverage}%
                  </span>
                  <span className="text-sm text-status-success">
                    +{mockDetailData.weeklyChange.coverage}% WoW
                  </span>
                </div>
                <Progress value={indicator.coverage} />
                <div className="text-xs text-muted-foreground">
                  Planned vs Actual: {mockDetailData.plannedVsActual.coverage}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">QDTI Score</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className={`text-2xl font-bold ${getStatusColor(indicator.qdti)}`}>
                    {indicator.qdti}%
                  </span>
                  <span className="text-sm text-status-success">
                    +{mockDetailData.weeklyChange.qdti}% WoW
                  </span>
                </div>
                <Progress value={indicator.qdti} />
                <div className="text-xs text-muted-foreground">
                  Planned vs Actual: {mockDetailData.plannedVsActual.qdti}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <div className="text-lg font-medium">{indicator.lastUpdate}</div>
              <div className="text-xs text-muted-foreground">
                Next: {mockDetailData.nextUpdate}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Methodology</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{indicator.methodology}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium mb-2">Data Sources</h4>
              <ul className="space-y-1">
                {mockDetailData.dataSources.map((source, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-status-success" />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Computation Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequency:</span>
                  <span>{mockDetailData.computationFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dependencies:</span>
                  <span>{mockDetailData.dependencies.length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabulations - Actual Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Tabulations & Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sample Tabulation Table */}
              <div>
                <h4 className="font-medium mb-3">By Municipality</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">Municipality</th>
                        <th className="text-right py-2">Count</th>
                        <th className="text-right py-2">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-2">Doha</td>
                        <td className="text-right py-2">456,789</td>
                        <td className="text-right py-2">42.3%</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">Al Rayyan</td>
                        <td className="text-right py-2">298,456</td>
                        <td className="text-right py-2">27.6%</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">Al Wakrah</td>
                        <td className="text-right py-2">145,234</td>
                        <td className="text-right py-2">13.4%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Total</td>
                        <td className="text-right py-2 font-medium">1,080,479</td>
                        <td className="text-right py-2 font-medium">100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Cross-tabulation */}
              <div>
                <h4 className="font-medium mb-3">By Age Group & Gender</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">Age Group</th>
                        <th className="text-right py-2">Male</th>
                        <th className="text-right py-2">Female</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-2">0-14</td>
                        <td className="text-right py-2">98,456</td>
                        <td className="text-right py-2">94,321</td>
                        <td className="text-right py-2">192,777</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">15-64</td>
                        <td className="text-right py-2">542,123</td>
                        <td className="text-right py-2">298,456</td>
                        <td className="text-right py-2">840,579</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">65+</td>
                        <td className="text-right py-2">32,456</td>
                        <td className="text-right py-2">24,667</td>
                        <td className="text-right py-2">57,123</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Total</td>
                        <td className="text-right py-2 font-medium">673,035</td>
                        <td className="text-right py-2 font-medium">417,444</td>
                        <td className="text-right py-2 font-medium">1,090,479</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Data Notes:</strong> Figures are preliminary and based on current register coverage of {indicator.coverage}%. 
                Final tabulations will be available upon completion of all data validation processes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues & Dependencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-status-warning" />
              <span>Active Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockDetailData.issues.length > 0 ? (
              <div className="space-y-3">
                {mockDetailData.issues.map((issue, index) => (
                  <div key={index} className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-lg">
                    <p className="text-sm text-card-foreground">{issue.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">ETA: {issue.eta}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No active issues</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Dependencies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockDetailData.dependencies.map((dependency, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-status-success" />
                  <span className="text-muted-foreground">{dependency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};