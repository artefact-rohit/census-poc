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
import { PopulationGraphTemp } from "./temp";
import { BarGraph } from "./BarGraph";
import { PopulationGraph } from "./PopulationGraph";

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
  const method1 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="805" /><col width="133" /><col width="118" /><col width="2" /></colgroup>
<tbody>
<tr>
<td colspan="4" rowspan="1"><strong>Integrate Data Sources</strong><br /> - Get data from below entities<br /> MOCI for commercial establishments<br /> QFZ for Qatar Free Zone establishments <br /> QFC for finanical firms in Qatar.<br /> QSTP for science and information technology establishments.<br /> MOM for farming establishments.<br /> GRSIA for government establishments based on employment data.<br /> MOI for rest other establishments related to non-profit, government, publlic sector<br /> - Ensure all commercial establishments are covered under one consolidated view.<br /> <br /> <strong>Confirm Establishment Validity</strong><br /> - Include establishments with valid or recently expired (&le;90 days) Commercial Permit (CP) for commercial establishments.<br /> - Use Kahramaa electricity number to validate operational status for the establishments<br /> - Verify establishment status for establishments across sources<br /> <br /> <strong>Extract Key Information</strong><br /> - Consolidate identifiers and key attributes such as EID, CR, CP, issue/expiry dates, operational status, establishment type<br /> <br /> <strong>Apply Quality Controls</strong><br /> - Remove duplicate records across registers.<br /> - Validate active status using CR/CP validity dates.<br /> - Calculate the QDTI score<br /> <br /> <strong>Produce the Outputs</strong><br /> - Generate establishment-level summaries and aggregated results.</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const dataSource1 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="547" /><col width="34" /><col width="100" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="5" rowspan="1">
<p><strong>MOCI (<span style="color: #339966;">Integrated</span>)</strong> <br /> - Ministry of Commerce and Industry <br /><br /> <strong>QFZ (<span style="color: #ff0000;">To Be Integrated</span>)</strong><br /> - Qatar Free Zone<br /><br /> <strong>QFC (<span style="color: #339966;">Integrated</span>)</strong><br /> - Qatar Financial Center<br /><br /> <strong>QSTP (<span style="color: #ff0000;">To Be Integrated</span>)</strong><br /> - Qatar Science &amp; Technology Park<br /><br /> <strong>MOM (<span style="color: #ff6600;">Integrated, additional dataset required</span>)</strong><br /> - Ministry of Municipality<br /><br /> <strong>MOI (<span style="color: #339966;">Integrated</span>)</strong><br /> - Ministry of Interiors<br /><br /> <strong>GRSIA (<span style="color: #339966;">Integrated</span>)</strong><br /> - General Retirement and Social Insurance Authority<br /><br /> <strong>KAHRAMAA (<span style="color: #339966;">Integrated</span>)</strong><br />- Qatar General Electricity &amp; Water Corporation</p>
<p>&nbsp;</p>
<p><strong>CGB (<span style="color: #ff6600;">Unmasking required</span>)</strong><br />-Civil Service and Government Bureau</p>
</td>
</tr>
</tbody>
</table>`;

  const method2 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="723" /><col width="98" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="4" rowspan="1"><strong>Integrate Data Sources</strong><br /> - Combine establishment records with employment contributions, pension enrollments, and beneficiary information from GRSIA<br /> - Incorporate private-sector QFC, QFZ and QSTP employment data and verify corresponding records in GRSIA<br /> <br /> <strong>Confirm Active Employment Validity</strong><br /> - Include only Qatari employees with following criterion<br /> a. Employed in the private sector<br /> b. Have a valid start date and no end date or a future end date for their current job<br /> c. Are not receiving active pension benefits<br /> d. Are not deceased (as indicated by beneficiary records) and validate it against MOPH death dataset.<br /> <br /> <strong>Extract Key Information</strong><br /> - Gather unique employee identifiers, employment start/end dates, and working sector information<br /> <br /> <strong>Apply Quality Controls</strong><br /> - Remove duplicate records across registers.<br /> - Validate active status against datasets.<br /> - Calculate the QDTI score<br /> <br /> <strong>Produce the Outputs</strong><br /> - Provide aggregated counts of active Qatari employees by establishment sector, focusing exclusively on the private sector</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const dataSource2 = `<table dir="ltr" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="432" /><col width="41" /><col width="100" /><col width="100" /><col width="100" /></colgroup>
<tbody>
<tr>
<td colspan="5" rowspan="1"><strong>GRSIA (<span style="color: #339966;">Integrated</span>)</strong><br /> - General Retirement and Social Insurance Authority<br /><br /><strong>QFC (<span style="color: #ff6600;">Integrated, additional dataset required</span>)</strong><br />- Qatar Financial Center<br /><br /><strong>QFZ (<span style="color: #ff0000;">To Be Integrated</span>)</strong><br />- Qatar Financial Zone<br /><br /><strong>QSTP (<span style="color: #ff0000;">To Be Integrated</span>)</strong><br /> - Qatar Science &amp; Technology Park<br /><br /><strong>MOPH (<span style="color: #339966;">Integrated</span>)</strong><br /> - Ministry of Public Health</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`;

  const mainData1 = [
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Consolidate Establishment Data into a Unified Statistical Register</strong><br />Move from fragmented administrative records toward a single, authoritative register of establishments.<br />-Secure access to updated MoCI and MoI databases for latest establishment records.<br />-Request establishment datasets from QFZ and QSTP to capture specialized economic activities.<br />-*Request unmasked establishment names and identifiers from CGB to accurately classify government units.</span></p>`,
      dependency: "MOCI, MOI, QFZ, QSTP, CGB",
      targetDate: "2025-10-19",
    },
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Improve Establishment Validity and Coverage</strong><br />-Reach out to MoCI to resolve data gaps on establishment status (currently 5,033 establishments missing active/inactive classification).<br />-Apply CP validity rules (active or &le;90 days expired) and cross-check operational status via Kahramaa electricity data.<br />-Define farm eligibility criteria with MOM and request farm records to populate the empty farm table.</span></p>`,
      dependency: "MOCI, MOM",
      targetDate: "2025-10-19",
    },
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Enhance Data Quality and Validation through Innovation</strong><br />-Deduplicate records across sources to establish a unique, harmonized entity view.<br />-Prototype a big data use case leveraging Google Places data, with GenAI classification to differentiate private vs. public establishments.<br />-Apply the QDTI framework (completeness, accuracy, timeliness, validity) to measure and improve data quality.<br /></span></p>`,
      dependency: "N/A",
      targetDate: "2025-10-19",
    },
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Institutionalize Methodology and Transparency</strong><br />Document the underlying indicator computation methodology following Establishments register - UNEC, ILO and UN Standards</span></p>`,
      dependency: "N/A",
      targetDate: "2025-10-30",
    },
  ];

  const mainData2 = [
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Strengthen the Employment Register as a Core Statistical Asset</strong><br />Transform disparate administrative datasets into a cohesive statistical register by applying &ldquo;sign of life&rdquo; criteria (active employment, non-deceased, no pension drawdowns)<br />-Validate identified data gaps from GRSIA (e.g., duplicate cases at 1.8%) and request structured updates.<br />-Request and integrate employment datasets from QFC, QFZ, and QSTP to expand private-sector coverage.</span></p>`,
      dependency: "QFC, QFZ, QSTP",
      targetDate: "2025-10-19",
    },
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Enhance Data Quality and Statistical Validity</strong><br />Improve reliability of national labor statistics by embedding validation and quality controls that align with ILO and UN frameworks<br />-For new datasets: Cross-validate active employment status against MOPH death datasets and pension beneficiary records.<br />-Define technical and business data quality rules and implement QDTI framework to support the development of the employment register.</span></p>`,
      dependency: "QFC, QFZ, QSTP",
      targetDate: "2025-10-23",
    },
    {
      nextStep: `<p><span data-sheets-root="1"><strong>Institutionalize Methodology and Transparency</strong><br />-Document the computation approach in line with Employment Register standards from ILO and UN.</span></p>`,
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
    // if (percentage >= 90) return "text-status-success";
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
                <span className="text-sm font-medium">Confidence Range</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span
                    className={`text-2xl font-bold ${getStatusColor(
                      indicator.coverage
                    )}`}
                  >
                    {isQatariIndicator ? "13,887 - 14,008" : "73,938 - 108,793"}
                  </span>
                  {/* <span className="text-sm text-status-success">
                    +{mockDetailData.weeklyChange.coverage}% WoW
                  </span> */}
                </div>
                {/* <Progress value={indicator.coverage} /> */}
                {/* <div className="text-xs text-muted-foreground">
                  Planned vs Actual: {mockDetailData.plannedVsActual.coverage}%
                </div> */}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">QDTI Score*</span>
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
          <div className="mt-4 text-xs text-muted-foreground">
            *Data Sources :{" "}
            {isQatariIndicator ? "GRSIA, MOPH" : "MOCI, QFC, GRSIA, KAHRAMAA"}
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
                          <th className="text-right py-2">
                            2025 Census (Preliminary)
                          </th>
                          <th className="text-right py-2 px-8">2020 Census</th>
                          <th className="text-right py-2">2023 Labour Force</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Male</td>
                          <td className="text-right py-2">
                            7940{" "}
                            <span className="text-muted-foreground">
                              (57.18%)
                            </span>
                          </td>
                          <td className="text-right py-2">
                            5270{" "}
                            <span className="text-muted-foreground">
                              (61.92%)
                            </span>
                          </td>
                          <td className="text-right py-2">
                            6509{" "}
                            <span className="text-muted-foreground">
                              (60.70%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Female</td>
                          <td className="text-right py-2">
                            5947{" "}
                            <span className="text-muted-foreground">
                              (42.82%)
                            </span>
                          </td>
                          <td className="text-right py-2">
                            3241{" "}
                            <span className="text-muted-foreground">
                              (38.08%)
                            </span>
                          </td>
                          <td className="text-right py-2">
                            4215{" "}
                            <span className="text-muted-foreground">
                              (39.30%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 font-semibold">Total</td>
                          <td className="text-right py-2 font-semibold">
                            13,887
                          </td>
                          <td className="text-right py-2 font-semibold">
                            8,511
                          </td>
                          <td className="text-right py-2 font-semibold">
                            10,724
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2">Establishment</th>
                          <th className="text-right py-2">
                            2025 Census (Preliminary)
                          </th>
                          <th className="text-right py-2">2020 Census</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Government</td>
                          <td className="text-right py-2">
                            277{" "}
                            <span className="text-muted-foreground">
                              (0.26%)*
                            </span>
                          </td>
                          <td className="text-right py-2">
                            317{" "}
                            <span className="text-muted-foreground">
                              (0.44%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2">Non-Government</td>
                          <td className="text-right py-2">
                            108,516{" "}
                            <span className="text-muted-foreground">
                              (99.74%)
                            </span>
                          </td>
                          <td className="text-right py-2">
                            70,886{" "}
                            <span className="text-muted-foreground">
                              (99.55%)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 font-semibold">Total</td>
                          <td className="text-right py-2 font-semibold">
                            108,793
                          </td>
                          <td className="text-right py-2 font-semibold">
                            71,203
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            {isQatariIndicator && (
              <div>
                <PopulationGraphTemp />
                {/* <PopulationGraph /> */}
                <BarGraph />
              </div>
            )}

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Data Notes:</strong> Figures are preliminary and based
                on current register confidence of {indicator.coverage}. Final
                tabulations will be available upon completion of all data
                validation processes.
              </p>
            </div>
          </div>
        </CardContent>
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
                    <th className="text-center py-2 w-[20%]">Dependencies</th>
                    <th className="py-2 text-center">Target Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(isQatariIndicator ? mainData2 : mainData1).map(
                    (issue, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-2 ">
                          <p
                            className=" text-black"
                            dangerouslySetInnerHTML={{
                              __html: issue.nextStep,
                            }}
                          ></p>
                        </td>
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
                {/* <div>
                  <h4 className="font-medium mb-2 mt-4">Computation Details</h4>
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
                </div> */}
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <div className="h-4"></div>
    </div>
  );
};
