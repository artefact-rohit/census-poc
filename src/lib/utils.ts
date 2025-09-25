import { clsx, type ClassValue } from "clsx";
import { atom } from "jotai";
import { twMerge } from "tailwind-merge";
import { atomWithStorage } from "jotai/utils";
import { addDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sample large JSON object
const initialJsonData = {
  overview: {
    cardData: {
      indicators: {
        completed: 98,
        total: 131,
        notStarted: 116,
        inProgress: 15,
        computed: 0,
        validated: 0,
        baskets: {
          "not-started": {
            population: { completed: 30, total: 34 },
            family: { completed: 17, total: 17 },
            economic: { completed: 41, total: 41 },
            buildings: { completed: 16, total: 23 },
            establishments: { completed: 12, total: 16 },
          },
          "in-progress": {
            population: { completed: 4, total: 34 },
            family: { completed: 0, total: 17 },
            economic: { completed: 0, total: 41 },
            buildings: { completed: 7, total: 23 },
            establishments: { completed: 4, total: 16 },
          },
          computed: {
            population: { completed: 0, total: 34 },
            family: { completed: 0, total: 17 },
            economic: { completed: 0, total: 41 },
            buildings: { completed: 0, total: 23 },
            establishments: { completed: 0, total: 16 },
          },
          validated: {
            population: { completed: 0, total: 34 },
            family: { completed: 0, total: 17 },
            economic: { completed: 0, total: 41 },
            buildings: { completed: 0, total: 23 },
            establishments: { completed: 0, total: 16 },
          },
        },
        weeklyProgress: 12,
        planned: 5,
        actual: 5.7,
      },
      registers: {
        completed: 7,
        total: 100,
        baskets: {
          population: { completed: 7, total: 1 },
          sbr: { completed: 3, total: 10 },
          buildings: { completed: 7, total: 1 },
          establishments: { completed: 8, total: 1 },
        },
        weeklyProgress: 8.5,
        planned: 5.0,
        actual: 6.0,
      },
      datasets: {
        acquired: 45,
        total: 106,
        byStatus: {
          accessSecured: 16,
          integrated: 16,
          qualityAssured: 16,
          validated: 16,
          notStarted: 13,
        },
        weeklyProgress: 6,
        planned: 78.5,
        actual: 86.5,
      },
      dissemination: {
        progress: 0,
        weeklyProgress: 15,
        baskets: {
          "ui/ux": "Initiates on 28th September",
          platform: "Initiates on 27th October",
          kpi: "Initiates on 16th November",
        },
        planned: 0,
        actual: 0,
      },
    },
    actionItems: [
      {
        id: 1,
        item: "Approve Economic Indicators Methodology",
        owner: "Dr. Al-Mahmoud",
        criticality: "High",
        status: "Pending",
        dueDate: "2024-09-20",
      },
      {
        id: 2,
        item: "Review SBR Data Integration Plan",
        owner: "Ms. Al-Kuwari",
        criticality: "Medium",
        status: "In Review",
        dueDate: "2024-09-22",
      },
      {
        id: 3,
        item: "Sign MOU with Education Ministry",
        owner: "Mr. Al-Thani",
        criticality: "High",
        status: "Pending",
        dueDate: "2024-09-25",
      },
      {
        id: 4,
        item: "Data Quality Assessment - Buildings Register",
        owner: "Ms. Al-Ansari",
        criticality: "Medium",
        status: "In Progress",
        dueDate: "2024-09-21",
      },
    ],
  },
  "census-indicators": [
    {
      id: "IND001",
      name: "Total Establishments by Establishment Type",
      basket: "Establishments",
      status: "in-progress",
      lastUpdate: "2025-09-24",
      coverage: 53,
      qdti: 93,
      methodology: "sef",
    },
    {
      id: "IND002",
      name: "Qatari Employee in Private Sector",
      basket: "Establishments",
      status: "in-progress",
      lastUpdate: "2025-09-24",
      coverage: 80,
      qdti: 94,
      methodology:
        "Aggregated from household composition data using statistical modeling and cross-validation",
    },
    {
      id: "IND003",
      name: "Labor Force Participation Rate",
      basket: "Economic Characteristics",
      status: "in-progress",
      lastUpdate: "2024-09-13",
      coverage: 85.2,
      qdti: 87.5,
      methodology:
        "Statistical modeling with proxy indicators from employment authorization records and economic surveys",
    },
    {
      id: "IND004",
      name: "Building Age Distribution",
      basket: "Buildings & Units",
      status: "completed",
      lastUpdate: "2024-09-16",
      coverage: 92.1,
      qdti: 89.3,
      methodology:
        "Building permits cross-referenced with satellite imagery analysis and municipal records",
    },
    {
      id: "IND005",
      name: "Economic Activity by Sector",
      basket: "Establishments",
      status: "delayed",
      lastUpdate: "2024-09-10",
      coverage: 78.9,
      qdti: 82.1,
      methodology:
        "SBR integration with ML classification algorithms for economic activity categorization",
    },
    {
      id: "IND006",
      name: "Age-Sex Pyramid",
      basket: "Population",
      status: "completed",
      lastUpdate: "2024-09-16",
      coverage: 99.1,
      qdti: 97.8,
      methodology:
        "Direct extraction from Population Register with demographic validation algorithms",
    },
    {
      id: "IND007",
      name: "Educational Attainment Levels",
      basket: "Family Characteristics",
      status: "in-progress",
      lastUpdate: "2024-09-12",
      coverage: 88.4,
      qdti: 85.6,
      methodology:
        "Integration of education records with population data using probabilistic matching",
    },
    {
      id: "IND008",
      name: "Unemployment Rate by Municipality",
      basket: "Economic Characteristics",
      status: "not-started",
      lastUpdate: "2024-09-08",
      coverage: 45.2,
      qdti: 52.3,
      methodology:
        "Labor force surveys combined with administrative employment records analysis",
    },
    {
      id: "IND009",
      name: "Housing Tenure Status",
      basket: "Buildings & Units",
      status: "in-progress",
      lastUpdate: "2024-09-14",
      coverage: 91.7,
      qdti: 88.9,
      methodology:
        "Property ownership records linked with household survey data and utility connections",
    },
    {
      id: "IND010",
      name: "Business Establishment Density",
      basket: "Establishments",
      status: "completed",
      lastUpdate: "2024-09-15",
      coverage: 94.6,
      qdti: 92.1,
      methodology:
        "Commercial registration database analysis with geographical information systems mapping",
    },
  ],
  datasets: [
    {
      id: "DS001",
      name: "Civil Registration Database",
      source: "Ministry of Interior (MOI)",
      type: "Primary",
      status: "acquired",
      acquisitionDate: "2024-08-15",
      linkedRegisters: ["Population & Household"],
      recordCount: "2.8M",
      description: "Birth, death, marriage, and divorce records",
    },
    {
      id: "DS002",
      name: "Commercial Registration Database",
      source: "Ministry of Commerce & Industry (MOCI)",
      type: "Primary",
      status: "ingestion-complete",
      acquisitionDate: "2024-08-22",
      linkedRegisters: ["Establishments"],
      recordCount: "145K",
      description: "Business licenses and commercial registrations",
    },
    {
      id: "DS003",
      name: "Utility Connection Records",
      source: "Kahramaa",
      type: "Secondary",
      status: "acquired",
      acquisitionDate: "2024-09-01",
      linkedRegisters: ["Buildings & Dwellings", "Establishments"],
      recordCount: "890K",
      description: "Electricity and water connection data",
    },
    {
      id: "DS004",
      name: "Student Enrollment Database",
      source: "Ministry of Education & Higher Education",
      type: "Secondary",
      status: "agreement-sent",
      acquisitionDate: "-",
      linkedRegisters: ["Population & Household"],
      recordCount: "450K (estimated)",
      description: "School and university enrollment records",
    },
    {
      id: "DS005",
      name: "Healthcare Provider Database",
      source: "Ministry of Public Health",
      type: "Secondary",
      status: "signed",
      acquisitionDate: "-",
      linkedRegisters: ["Population & Household"],
      recordCount: "1.2M (estimated)",
      description: "Healthcare service utilization records",
    },
    {
      id: "DS006",
      name: "Vehicle Registration Database",
      source: "Ministry of Interior (MOI)",
      type: "Secondary",
      status: "acquired",
      acquisitionDate: "2024-09-10",
      linkedRegisters: ["Population & Household", "Establishments"],
      recordCount: "1.1M",
      description: "Vehicle ownership and registration data",
    },
    {
      id: "DS007",
      name: "Building Permits Database",
      source: "Ministry of Municipality",
      type: "Primary",
      status: "ingestion-complete",
      acquisitionDate: "2024-08-28",
      linkedRegisters: ["Buildings & Dwellings"],
      recordCount: "78K",
      description: "Construction permits and building approvals",
    },
    {
      id: "DS008",
      name: "Employment Authorization Records",
      source: "Ministry of Administrative Development, Labour & Social Affairs",
      type: "Primary",
      status: "agreement-sent",
      acquisitionDate: "-",
      linkedRegisters: ["Population & Household", "Establishments"],
      recordCount: "850K (estimated)",
      description: "Work permits and employment authorizations",
    },
  ],
};

// Jotai atoms
const jsonDataAtom = atomWithStorage("initialJsonData", initialJsonData);
const isEditingAtom = atom(false);
const jsonStringAtom = atom(JSON.stringify(initialJsonData, null, 2));
const validationErrorAtom = atom(null);

function getNextWeekDate() {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  return format(nextWeek, "yyyy-MM-dd");
}

function getTodayDate() {
  const today = new Date();
  return format(today, "yyyy-MM-dd");
}

export {
  jsonDataAtom,
  jsonStringAtom,
  isEditingAtom,
  validationErrorAtom,
  initialJsonData,
  getNextWeekDate,
  getTodayDate,
};
