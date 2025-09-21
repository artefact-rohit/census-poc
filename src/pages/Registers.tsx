import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, BarChart3 } from "lucide-react";
import { RegisterTable } from "@/components/RegisterTable";

const Registers = () => {
  const coreRegisters = [
    {
      id: "REG001",
      name: "Population & Household Register",
      type: "Core",
      status: "completed",
      progress: 100,
      contact: "Dr. Amina Al-Mahmoud",
      description: "Comprehensive registry of all residents and household compositions",
      aiUseCase: "Identity verification and relationship mapping using ML algorithms",
      aiProgress: 95,
      fields: [
        { 
          name: "Personal ID", 
          progress: 100, 
          aiUseCases: [
            { name: "Duplicate Detection", status: "completed" as const, progress: 100 },
            { name: "Identity Validation", status: "completed" as const, progress: 95 }
          ]
        },
        { 
          name: "Demographics", 
          progress: 100, 
          aiUseCases: [
            { name: "Age Validation", status: "completed" as const, progress: 100 },
            { name: "Cross-reference Analysis", status: "completed" as const, progress: 92 }
          ]
        },
        { 
          name: "Household Composition", 
          progress: 98, 
          aiUseCases: [
            { name: "Relationship Mapping", status: "in-progress" as const, progress: 98 },
            { name: "Household Structure Analysis", status: "completed" as const, progress: 89 }
          ]
        },
        { 
          name: "Address History", 
          progress: 92, 
          aiUseCases: [
            { name: "Mobility Pattern Analysis", status: "in-progress" as const, progress: 85 },
            { name: "Geocoding Validation", status: "completed" as const, progress: 98 }
          ]
        }
      ]
    },
    {
      id: "REG002", 
      name: "Buildings & Dwellings Register",
      type: "Core",
      status: "completed",
      progress: 98,
      contact: "Eng. Khalid Al-Thani",
      description: "Registry of all residential and non-residential buildings",
      aiUseCase: "Building classification and occupancy prediction using satellite imagery",
      aiProgress: 87,
      fields: [
        { 
          name: "Building Structure", 
          progress: 100, 
          aiUseCases: [
            { name: "Building Type Classification", status: "completed" as const, progress: 100 }
          ]
        },
        { 
          name: "Unit Classification", 
          progress: 98, 
          aiUseCases: [
            { name: "Residential vs Commercial ID", status: "in-progress" as const, progress: 98 },
            { name: "Usage Pattern Analysis", status: "completed" as const, progress: 87 }
          ]
        },
        { 
          name: "Construction Details", 
          progress: 95, 
          aiUseCases: [
            { name: "Construction Year Estimation", status: "completed" as const, progress: 95 },
            { name: "Imagery Analysis", status: "in-progress" as const, progress: 82 }
          ]
        },
        { 
          name: "Utilities Connection", 
          progress: 93, 
          aiUseCases: [
            { name: "Service Connection Validation", status: "completed" as const, progress: 93 }
          ]
        }
      ]
    },
    {
      id: "REG003",
      name: "Establishments Register", 
      type: "Core",
      status: "in-progress",
      progress: 85,
      contact: "Ms. Fatima Al-Kuwari",
      description: "Registry of all business establishments and economic units",
      aiUseCase: "Economic activity classification and validation using NLP and business intelligence",
      aiProgress: 78,
      fields: [
        { 
          name: "Business Classification", 
          progress: 90, 
          aiUseCases: [
            { name: "ISIC Code Assignment", status: "completed" as const, progress: 92 },
            { name: "Business Description NLP", status: "in-progress" as const, progress: 88 }
          ]
        },
        { 
          name: "Employment Data", 
          progress: 82, 
          aiUseCases: [
            { name: "Employee Count Estimation", status: "in-progress" as const, progress: 82 },
            { name: "Administrative Source Matching", status: "completed" as const, progress: 75 }
          ]
        },
        { 
          name: "Revenue Information", 
          progress: 78, 
          aiUseCases: [
            { name: "Revenue Prediction Modeling", status: "in-progress" as const, progress: 78 }
          ]
        },
        { 
          name: "Location Verification", 
          progress: 88, 
          aiUseCases: [
            { name: "GPS Validation", status: "completed" as const, progress: 95 },
            { name: "Address Standardization", status: "in-progress" as const, progress: 81 }
          ]
        }
      ]
    }
  ];

  const secondaryRegisters = [
    {
      id: "REG004",
      name: "Statistical Business Register (SBR)",
      type: "Secondary", 
      status: "completed",
      progress: 100,
      contact: "Mr. Ahmed Al-Ansari",
      description: "Comprehensive business intelligence and economic indicators registry",
      aiUseCase: "Business intelligence and economic forecasting using predictive analytics",
      aiProgress: 92,
      fields: [
        { 
          name: "Business Profiles", 
          progress: 100, 
          aiUseCases: [
            { name: "Company Profiling", status: "completed" as const, progress: 100 },
            { name: "Sector Analysis", status: "completed" as const, progress: 95 }
          ]
        },
        { 
          name: "Economic Indicators", 
          progress: 98, 
          aiUseCases: [
            { name: "Real-time Trend Analysis", status: "completed" as const, progress: 98 },
            { name: "Forecasting Models", status: "in-progress" as const, progress: 85 }
          ]
        },
        { 
          name: "Market Analysis", 
          progress: 95, 
          aiUseCases: [
            { name: "Market Segmentation", status: "completed" as const, progress: 97 },
            { name: "Competitive Landscape Analysis", status: "in-progress" as const, progress: 93 }
          ]
        }
      ]
    },
    {
      id: "REG005",
      name: "Education Records Register",
      type: "Secondary",
      status: "in-progress", 
      progress: 78,
      contact: "Dr. Maryam Al-Zahra",
      description: "Educational attainment and institutional enrollment data",
      aiUseCase: "Educational attainment analysis and academic outcome prediction",
      aiProgress: 65,
      fields: [
        { 
          name: "Student Enrollment", 
          progress: 85, 
          aiUseCases: [
            { name: "Enrollment Trend Analysis", status: "completed" as const, progress: 90 },
            { name: "Capacity Planning ML", status: "in-progress" as const, progress: 80 }
          ]
        },
        { 
          name: "Academic Records", 
          progress: 72, 
          aiUseCases: [
            { name: "Performance Prediction", status: "in-progress" as const, progress: 75 },
            { name: "Intervention Identification", status: "not-started" as const, progress: 15 }
          ]
        },
        { 
          name: "Institutional Data", 
          progress: 77, 
          aiUseCases: [
            { name: "Institution Classification", status: "in-progress" as const, progress: 82 },
            { name: "Resource Optimization", status: "not-started" as const, progress: 25 }
          ]
        }
      ]
    },
    {
      id: "REG006", 
      name: "Health Records Register",
      type: "Secondary",
      status: "in-progress",
      progress: 72,
      contact: "Dr. Omar Al-Rashid",
      description: "Healthcare utilization and demographic health indicators",
      aiUseCase: "Health demographics analysis and service planning using epidemiological models", 
      aiProgress: 58,
      fields: [
        { 
          name: "Service Utilization", 
          progress: 78, 
          aiUseCases: [
            { name: "Demand Forecasting", status: "in-progress" as const, progress: 80 },
            { name: "Resource Allocation", status: "in-progress" as const, progress: 76 }
          ]
        },
        { 
          name: "Demographics Health", 
          progress: 68, 
          aiUseCases: [
            { name: "Population Health Trends", status: "in-progress" as const, progress: 70 },
            { name: "Risk Factor Identification", status: "not-started" as const, progress: 35 }
          ]
        },
        { 
          name: "Provider Network", 
          progress: 70, 
          aiUseCases: [
            { name: "Accessibility Analysis", status: "in-progress" as const, progress: 72 },
            { name: "Network Optimization", status: "not-started" as const, progress: 28 }
          ]
        }
      ]
    },
    {
      id: "REG007",
      name: "Transportation Register",
      type: "Secondary", 
      status: "not-started",
      progress: 25,
      contact: "Eng. Sara Al-Malki",
      description: "Vehicle registration and transportation infrastructure data",
      aiUseCase: "Mobility pattern analysis and transportation planning using GPS and traffic data",
      aiProgress: 15,
      fields: [
        { 
          name: "Vehicle Registration", 
          progress: 35, 
          aiUseCases: [
            { name: "Vehicle Classification", status: "not-started" as const, progress: 40 },
            { name: "Ownership Pattern Analysis", status: "not-started" as const, progress: 30 }
          ]
        },
        { 
          name: "Traffic Patterns", 
          progress: 20, 
          aiUseCases: [
            { name: "Traffic Flow Analysis", status: "not-started" as const, progress: 25 },
            { name: "Congestion Prediction", status: "not-started" as const, progress: 15 }
          ]
        },
        { 
          name: "Infrastructure Mapping", 
          progress: 20, 
          aiUseCases: []
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-card-foreground">Registers</h1>
        <p className="text-muted-foreground mt-2">
          Monitor core and secondary registers with detailed field-level progress and AI implementation
        </p>
      </div>

      <Tabs defaultValue="core" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="core" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Core Registers</span>
          </TabsTrigger>
          <TabsTrigger value="secondary" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Secondary Registers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="space-y-6">
          {coreRegisters.map((register) => (
            <RegisterTable key={register.id} register={register} />
          ))}
        </TabsContent>

        <TabsContent value="secondary" className="space-y-6">
          {secondaryRegisters.map((register) => (
            <RegisterTable key={register.id} register={register} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Registers;