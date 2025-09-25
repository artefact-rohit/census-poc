import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, CalendarIcon } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

interface IndicatorListProps {
  indicators: Indicator[];
  selectedIndicator: Indicator | null;
  onSelectIndicator: (indicator: Indicator) => void;
}

export const IndicatorList = ({
  indicators,
  selectedIndicator,
  onSelectIndicator,
}: IndicatorListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBasket, setSelectedBasket] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const filteredIndicators = indicators.filter((indicator) => {
    const matchesSearch =
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBasket =
      selectedBasket === "all" || indicator.basket === selectedBasket;
    const matchesStatus =
      selectedStatus === "all" || indicator.status === selectedStatus;

    // Date range filtering
    let matchesDateRange = true;
    if (dateFrom || dateTo) {
      const indicatorDate = new Date(indicator.lastUpdate);
      if (dateFrom && indicatorDate < dateFrom) matchesDateRange = false;
      if (dateTo && indicatorDate > dateTo) matchesDateRange = false;
    }

    return matchesSearch && matchesBasket && matchesStatus && matchesDateRange;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-status-success/10 border-status-success/20";
      case "validated":
        return "bg-status-success/10 border-status-success/20";
      case "in-progress":
        return "bg-status-warning/10 border-status-warning/20";
      case "delayed":
        return "bg-status-danger/10 border-status-danger/20";
      default:
        return "bg-muted/10 border-border";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Census Indicators</CardTitle>

        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search indicators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedBasket} onValueChange={setSelectedBasket}>
            <SelectTrigger>
              <SelectValue placeholder="All Baskets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Baskets</SelectItem>
              <SelectItem value="Population">Population</SelectItem>
              <SelectItem value="Family Characteristics">
                Family Characteristics
              </SelectItem>
              <SelectItem value="Economic Characteristics">
                Economic Characteristics
              </SelectItem>
              <SelectItem value="Buildings & Units">
                Buildings & Units
              </SelectItem>
              <SelectItem value="Establishments">Establishments</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "MMM d, yyyy") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto px-6">
          {filteredIndicators.map((indicator) => (
            <div
              key={indicator.id}
              onClick={() => onSelectIndicator(indicator)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                selectedIndicator?.id === indicator.id
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : getStatusColor(indicator.status)
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-card-foreground truncate">
                    {indicator.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {indicator.id}
                    </Badge>
                    <StatusBadge status={indicator.status as any} />
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {indicator.basket}
              </div>

              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-muted-foreground">
                  Confidence Range: {indicator.coverage}
                </span>
                <span className="text-muted-foreground">
                  QDTI: {indicator.qdti}%
                </span>
              </div>
            </div>
          ))}

          {filteredIndicators.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No indicators found
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
