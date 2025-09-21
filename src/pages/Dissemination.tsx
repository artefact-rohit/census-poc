import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Palette, 
  Code, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Users,
  Figma,
  Globe
} from "lucide-react";

const Dissemination = () => {
  const uiuxStream = {
    overall: 95,
    milestones: [
      { name: "User Research", status: "completed", progress: 100, dueDate: "2024-07-15" },
      { name: "Information Architecture", status: "completed", progress: 100, dueDate: "2024-07-28" },
      { name: "Wireframes", status: "completed", progress: 100, dueDate: "2024-08-10" },
      { name: "UI Design System", status: "completed", progress: 100, dueDate: "2024-08-25" },
      { name: "Mockups & Prototypes", status: "completed", progress: 98, dueDate: "2024-09-05" },
      { name: "Usability Testing", status: "in-progress", progress: 85, dueDate: "2024-09-20" },
      { name: "Design Finalization", status: "not-started", progress: 0, dueDate: "2024-09-30" }
    ],
    deliverables: [
      { name: "Design System Documentation", status: "completed", link: "#" },
      { name: "Interactive Prototypes", status: "completed", link: "#" },
      { name: "Accessibility Guidelines", status: "in-progress", link: "#" },
      { name: "Mobile Responsive Designs", status: "completed", link: "#" }
    ]
  };

  const developmentStream = {
    overall: 72,
    milestones: [
      { name: "Backend Architecture", status: "completed", progress: 100, dueDate: "2024-08-01" },
      { name: "Database Design", status: "completed", progress: 100, dueDate: "2024-08-15" },
      { name: "API Development", status: "in-progress", progress: 85, dueDate: "2024-09-15" },
      { name: "Frontend Framework Setup", status: "completed", progress: 100, dueDate: "2024-08-20" },
      { name: "UI Component Library", status: "in-progress", progress: 78, dueDate: "2024-09-25" },
      { name: "Data Visualization Components", status: "in-progress", progress: 65, dueDate: "2024-10-05" },
      { name: "Authentication & Security", status: "not-started", progress: 20, dueDate: "2024-10-15" },
      { name: "Performance Optimization", status: "not-started", progress: 0, dueDate: "2024-10-30" }
    ],
    techStack: [
      { name: "React.js", status: "implemented" },
      { name: "Node.js", status: "implemented" },
      { name: "PostgreSQL", status: "implemented" },
      { name: "Redis", status: "in-progress" },
      { name: "Docker", status: "implemented" },
      { name: "AWS", status: "in-progress" }
    ]
  };

  const kpiStream = {
    overall: 45,
    indicators: [
      { basket: "Population", total: 35, live: 28, tested: 32 },
      { basket: "Family Characteristics", total: 28, live: 15, tested: 22 },
      { basket: "Economic Characteristics", total: 25, live: 8, tested: 18 },
      { basket: "Buildings & Units", total: 22, live: 6, tested: 15 },
      { basket: "Establishments", total: 21, live: 2, tested: 12 }
    ],
    issues: [
      { 
        indicator: "Labor Force Participation Rate", 
        issue: "Data quality threshold not met", 
        priority: "high",
        eta: "2024-09-25"
      },
      {
        indicator: "Household Income Distribution",
        issue: "Privacy compliance review needed",
        priority: "medium", 
        eta: "2024-09-30"
      },
      {
        indicator: "Economic Activity Classification",
        issue: "API integration pending",
        priority: "high",
        eta: "2024-09-22"
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-status-success" />;
      case "in-progress": return <Clock className="h-4 w-4 text-status-warning" />;
      case "not-started": return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const MilestoneCard = ({ milestone }: { milestone: any }) => (
    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
      <div className="flex items-center space-x-3">
        {getStatusIcon(milestone.status)}
        <div>
          <h4 className="font-medium text-card-foreground">{milestone.name}</h4>
          <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{milestone.progress}%</span>
        <div className="w-16">
          <Progress value={milestone.progress} className="h-1.5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-card-foreground">Dissemination</h1>
        <p className="text-muted-foreground mt-2">
          Track progress across UI/UX design, platform development, and KPI integration
        </p>
      </div>

      <Tabs defaultValue="uiux" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="uiux" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>UI/UX Design</span>
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Development</span>
          </TabsTrigger>
          <TabsTrigger value="kpi" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>KPI Integration</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uiux" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Design Progress</span>
                  <span className="text-2xl font-bold text-status-success">{uiuxStream.overall}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={uiuxStream.overall} className="mb-4" />
                <div className="space-y-3">
                  {uiuxStream.milestones.map((milestone, index) => (
                    <MilestoneCard key={index} milestone={milestone} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Figma className="h-5 w-5" />
                  <span>Deliverables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uiuxStream.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(deliverable.status)}
                        <span className="font-medium">{deliverable.name}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Development Progress</span>
                  <span className="text-2xl font-bold text-status-warning">{developmentStream.overall}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={developmentStream.overall} className="mb-4" />
                <div className="space-y-3">
                  {developmentStream.milestones.map((milestone, index) => (
                    <MilestoneCard key={index} milestone={milestone} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Technology Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {developmentStream.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{tech.name}</span>
                      <StatusBadge 
                        status={tech.status === "implemented" ? "completed" : 
                               tech.status === "in-progress" ? "in-progress" : "not-started"} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpi" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>KPI Availability</span>
                  <span className="text-2xl font-bold text-status-danger">{kpiStream.overall}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpiStream.indicators.map((basket, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{basket.basket}</span>
                        <span className="text-sm text-muted-foreground">
                          {basket.live}/{basket.total} live ({((basket.live / basket.total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Total</div>
                          <div className="font-medium">{basket.total}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Tested</div>
                          <div className="font-medium text-status-warning">{basket.tested}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Live</div>
                          <div className="font-medium text-status-success">{basket.live}</div>
                        </div>
                      </div>
                      <Progress value={(basket.live / basket.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-status-danger" />
                  <span>Issues Requiring Attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {kpiStream.issues.map((issue, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-card-foreground">{issue.indicator}</h4>
                        <Badge variant={issue.priority === "high" ? "destructive" : "secondary"}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.issue}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">ETA: {issue.eta}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dissemination;