import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  FileText,
  Building2,
  Car,
  GraduationCap,
  Heart,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useAtomValue } from "jotai";
import { jsonDataAtom } from "@/lib/utils";

const Datasets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const getData = useAtomValue(jsonDataAtom);

  // Mock datasets data
  const datasets = getData.datasets;

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource =
      selectedSource === "all" || dataset.source === selectedSource;
    const matchesType = selectedType === "all" || dataset.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || dataset.status === selectedStatus;

    return matchesSearch && matchesSource && matchesType && matchesStatus;
  });

  const getSourceIcon = (source: string) => {
    if (source.includes("Interior")) return <Building2 className="h-4 w-4" />;
    if (source.includes("Commerce")) return <FileText className="h-4 w-4" />;
    if (source.includes("Education"))
      return <GraduationCap className="h-4 w-4" />;
    if (source.includes("Health")) return <Heart className="h-4 w-4" />;
    if (source.includes("Municipality"))
      return <Building2 className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const statusLabels = {
    "agreement-sent": "Agreement Sent",
    signed: "Signed",
    acquired: "Acquired",
    "ingestion-complete": "Ingestion Complete",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-card-foreground">Datasets</h1>
        <p className="text-muted-foreground mt-2">
          Track acquisition and integration of datasets from government entities
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Ministry of Interior (MOI)">MOI</SelectItem>
                <SelectItem value="Ministry of Commerce & Industry (MOCI)">
                  MOCI
                </SelectItem>
                <SelectItem value="Kahramaa">Kahramaa</SelectItem>
                <SelectItem value="Ministry of Education & Higher Education">
                  Education
                </SelectItem>
                <SelectItem value="Ministry of Public Health">
                  Health
                </SelectItem>
                <SelectItem value="Ministry of Municipality">
                  Municipality
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Primary">Primary</SelectItem>
                <SelectItem value="Secondary">Secondary</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="agreement-sent">Agreement Sent</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="acquired">Acquired</SelectItem>
                <SelectItem value="ingestion-complete">
                  Ingestion Complete
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredDatasets.length} of {datasets.length} datasets
        </p>
      </div>

      {/* Datasets Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Acquired</TableHead>
                <TableHead>Linked Registers</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {dataset.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dataset.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(dataset.source)}
                      <span className="text-sm">{dataset.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        dataset.type === "Primary" ? "default" : "secondary"
                      }
                    >
                      {dataset.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        dataset.status === "ingestion-complete"
                          ? "completed"
                          : dataset.status === "acquired"
                          ? "in-progress"
                          : dataset.status === "signed"
                          ? "validated"
                          : "not-started"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{dataset.recordCount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {dataset.acquisitionDate || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {dataset.linkedRegisters.map((register, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {register}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // In a real app, this would open a detailed view
                        console.log("Viewing details for:", dataset.name);
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredDatasets.length === 0 && (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-card-foreground mb-2">
              No datasets found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Datasets;
