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
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordian";
import { addDays } from "date-fns";
import { getNextWeekDate } from "@/lib/utils";

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
  const method1 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="729" /><col width="133" /><col width="100" /><col width="2" /></colgroup>
<tbody>
<tr>
<td colspan="4" rowspan="1"><strong>Integrate Data Sources</strong><br /> - Link MoCI establishment data to get establishment and thier operational status data.<br /> - Get data from QFZ, QFC and QSTP for comprehensive coverage of establishments.<br /> - Ensure all commercial establishments are covered under one consolidated view under MoCI.<br /> - Use CGB to get public sector establishments and employment information<br /> <br /> <strong>Confirm Establishment Validity</strong><br /> - Include establishments with valid or recently expired (&le;90 days) Commercial Registration (CR) and Commercial Permit (CP).<br /> - Verify operational status directly against MoCI CR records for commercial establishments.<br /> - Verify establishment status for establishments across sources<br /> <br /> <strong>Extract Key Information</strong><br /> - Consolidate identifiers and key attributes such as EID, CR, CP, issue/expiry dates, status<br /> <br /> <strong>Apply Quality Controls</strong><br /> - Remove duplicate records across registers.<br /> - Validate active status using CR/CP validity dates.<br /> - Calculate the QDTI score<br /> <br /> <strong>Produce the Outputs</strong><br /> - Generate establishment-level summaries and aggregated results.</td>
</tr>
</tbody>
</table>`;

  const dataSource1 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="547" /><col width="34" /><col width="100" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="5" rowspan="1"><strong>MOCI</strong><br /> - Commercial establishments characteristics with active status for the establishment<br /> <br /> <strong>CGB</strong><br /> - Supplies data on the public sector workforce<br /><br /> <strong>QFZ</strong><br /> - Supplies data on Qatar Free Zone establishments <br /><br /> <strong>QFC</strong><br /> - Supplies establishment data for Qatar Financial Center<br /><br /> <strong>QSTP</strong><br /> - Qatar Science &amp; Technology Park is a source for international technology establishments within Qatar</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const method2 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="723" /><col width="34" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="4" rowspan="1"><strong>Integrate Data Sources</strong><br /> - Integrate estalishment data from GRSIA, QFC and QFZ<br /> <br /> <strong>Confirm Establishment and Employment Validity</strong><br /> - Include establishments with valid or active operational status. <br /> - Include only Qatari employees with following criterion<br /> a. Establishment sector should be private<br /> b. Active employment status based on job start date and job end date value<br /> c. Exclude pensioners based on data from pensioners dataset <br /> <br /> <strong>Extract Key Information</strong><br /> - Consolidate identifiers and key attributes such as Employment information, Establishment details and status, issue/expiry dates<br /> <br /> <strong>Apply Quality Controls</strong><br /> - Remove duplicate records across registers.<br /> - Validate active status against datasets.<br /> - Calculate the QDTI score<br /> <br /> <strong>Produce the Outputs</strong><br /> - Generate establishment sector level aggregated results for employment.</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const dataSource2 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="432" /><col width="41" /><col width="100" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="5" rowspan="1"><strong>GRSIA</strong><br /> -Employment Information for establishments for Qatari Employees<br /> <br /> <strong>QFC</strong><br /> -Employment Information for financial establishments in Qatar<br /> <br /> <strong>QFZ</strong><br /> -Employees working under Qatar Free Zone authority</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const mainData1 = [
    {
      nextStep:
        "Secure access to the right MoCI and MoI databases from Wassim Qasim to get the latest updated data",
      dependency: "N/A",
      targetDate: "2025-09-25",
    },
    {
      nextStep:
        "Reach out to MoCI to address the data gaps for missing establishment status (active or inactive) for x establishments ",
      dependency: "MoCI",
      targetDate: "2025-09-25",
    },
    {
      nextStep: "Request establishment datasets from QFZ",
      dependency: "QFZ",
      targetDate: "2025-09-25",
    },
    {
      nextStep: "Request the latest establishment datasets from QSTP",
      dependency: "QSTP",
      targetDate: "2025-09-25",
    },
    {
      nextStep:
        "Define farm eligibility criteria to be considered as establishment and request MOM to share the farm records to populate the existing table (current status: Farm table exists but empty)",
      dependency: "MOM",
      targetDate: "2025-09-25",
    },
    {
      nextStep:
        "Prototype big data use case to curate the google places data for establishments in Qatar, and classify between establishment types (private vs public) leveragin GenAI capabilities to serve as validation mechanism",
      dependency: "N/A",
      targetDate: "2025-10-19",
    },
    {
      nextStep:
        "Document the underlying indicator computation methodology following Establishments register - UNEC, ILO and UN Standards",
      dependency: "N/A",
      targetDate: "2025-10-30",
    },
  ];

  const mainData2 = [
    {
      nextStep: "Request employment datasets from QFC",
      dependency: "QFC",
      targetDate: "2025-09-25",
    },
    {
      nextStep:
        "Finalize the data gaps from GRSIA and request for updates- current identified data gaps include duplications (1.8%)",
      dependency: "GRSIA",
      targetDate: "2025-09-28",
    },
    {
      nextStep:
        "Document the underlying indicator computation methodology following Employment register - ILO and UN Standards",
      dependency: "N/A",
      targetDate: "2025-10-30",
    },
  ];

  if (!indicator) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-card-foreground mb-2">
              Select an Indicator
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose an indicator from the list to view detailed information
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isQatariIndicator: boolean = indicator.id === "IND002";

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-status-success";
    if (percentage >= 70) return "text-status-warning";
    return "text-status-danger";
  };

  // Mock additional data for demonstration

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
                <span className="text-sm font-medium">Confidence</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span
                    className={`text-2xl font-bold ${getStatusColor(
                      indicator.coverage
                    )}`}
                  >
                    {indicator.coverage}%
                  </span>
                  {/* <span className="text-sm text-status-success">
                    +{mockDetailData.weeklyChange.coverage}% WoW
                  </span> */}
                </div>
                <Progress value={indicator.coverage} />
                {/* <div className="text-xs text-muted-foreground">
                  Planned vs Actual: {mockDetailData.plannedVsActual.coverage}%
                </div> */}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">QDTI Score</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span
                    className={`text-2xl font-bold ${getStatusColor(
                      indicator.qdti
                    )}`}
                  >
                    {indicator.qdti}%
                  </span>
                  {/* <span className="text-sm text-status-success">
                    +{mockDetailData.weeklyChange.qdti}% WoW
                  </span> */}
                </div>
                <Progress value={indicator.qdti} />
                {/* <div className="text-xs text-muted-foreground">
                  Planned vs Actual: {mockDetailData.plannedVsActual.qdti}%
                </div> */}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <div className="text-lg font-medium">{indicator.lastUpdate}</div>
              <div className="text-xs text-muted-foreground">
                Next: {getNextWeekDate()}
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
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Sample Tabulation Table */}
              <div>
                <div className="overflow-x-auto">
                  {isQatariIndicator ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2">
                            Qatari Employee Count in Private Sector
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-2">13883</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2">Sector</th>
                          <th className="text-right py-2">
                            Total Establishment
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Commercial</td>
                          <td className="text-right py-2">71921</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Government</td>
                          <td className="text-right py-2">111</td>
                        </tr>

                        <tr>
                          <td className="py-2 font-medium">Total</td>
                          <td className="text-right py-2 font-medium">72032</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Data Notes:</strong> Figures are preliminary and based
                on current register confidence of {indicator.coverage}%. Final
                tabulations will be available upon completion of all data
                validation processes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card className="pr-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Methodology</span>
                </CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: isQatariIndicator ? method2 : method1,
                  }}
                ></p>

                <div className="grid grid-cols-1  gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Data Sources</h4>
                    <p
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: isQatariIndicator ? dataSource2 : dataSource1,
                      }}
                    ></p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Computation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>Weekly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Dependencies:
                      </span>
                      <span>
                        {(isQatariIndicator ? mainData2 : mainData1).length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Issues & Dependencies */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-status-warning" />
              <span>Next Steps & Dependencies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(isQatariIndicator ? mainData2 : mainData1).length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 w-[60%]">Next steps</th>
                    <th className="text-left py-2 ">Dependencies</th>
                    <th className="py-2 text-center">Target Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(isQatariIndicator ? mainData2 : mainData1).map(
                    (issue, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-2 ">{issue.nextStep}</td>
                        <td className="py-2 text-center">{issue.dependency}</td>
                        <td className="py-2 text-center">{issue.targetDate}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-muted-foreground">No active issues</p>
            )}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Dependencies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockDetailData.dependencies.map((dependency, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <CheckCircle className="h-3 w-3 text-status-success" />
                  <span className="text-muted-foreground">{dependency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
