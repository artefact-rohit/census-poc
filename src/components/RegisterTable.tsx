import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { Bot, Database } from "lucide-react";

interface AIUseCase {
  name: string;
  status: "completed" | "in-progress" | "not-started" | "delayed";
  progress: number;
}

interface RegisterField {
  name: string;
  progress: number;
  aiUseCases: AIUseCase[];
}

interface Register {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  contact: string;
  description: string;
  aiUseCase: string;
  aiProgress: number;
  fields: RegisterField[];
}

interface RegisterTableProps {
  register: Register;
}

export const RegisterTable = ({ register }: RegisterTableProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-status-success";
    if (progress >= 70) return "text-status-warning";
    return "text-status-danger";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{register.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{register.id} • {register.contact}</p>
            </div>
          </div>
          <StatusBadge status={register.status as any} />
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-3">{register.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className={`text-sm font-medium ${getProgressColor(register.progress)}`}>
                  {register.progress}%
                </span>
              </div>
              <Progress value={register.progress} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI Implementation</span>
                <span className={`text-sm font-medium ${getProgressColor(register.aiProgress)}`}>
                  {register.aiProgress}%
                </span>
              </div>
              <Progress value={register.aiProgress} className="h-2" />
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">
              <strong>AI/ML Use Case:</strong> {register.aiUseCase}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Field-Level Progress</h4>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead className="w-[120px]">Progress</TableHead>
                <TableHead>AI/Big Data Use Cases</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {register.fields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{field.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={field.progress} className="h-2 flex-1" />
                      <span className={`text-sm font-medium ${getProgressColor(field.progress)} min-w-[40px]`}>
                        {field.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {field.aiUseCases.length > 0 ? (
                      <div className="space-y-2">
                        {field.aiUseCases.map((useCase, useCaseIndex) => (
                          <div key={useCaseIndex} className="flex items-center justify-between p-2 bg-secondary/30 rounded-sm">
                            <div className="flex-1">
                              <div className="text-sm font-medium">{useCase.name}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Progress value={useCase.progress} className="h-1 flex-1" />
                                <span className="text-xs text-muted-foreground">{useCase.progress}%</span>
                              </div>
                            </div>
                            <div className="ml-2">
                              <StatusBadge status={useCase.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">No AI/Big Data use cases</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};