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
        calcInProgress: 2,
        methodInProgress: 14,
        computed: 0,
        validated: 0,
        baskets: {
          "not-started": {
            population: { completed: 30, total: 34 },
            family: { completed: 17, total: 17 },
            economic: { completed: 40, total: 41 },
            buildings: { completed: 16, total: 23 },
            establishments: { completed: 12, total: 16 },
          },
          "calc-in-progress": {
            population: { completed: 0, total: 34 },
            family: { completed: 0, total: 17 },
            economic: { completed: 1, total: 41 },
            buildings: { completed: 0, total: 23 },
            establishments: { completed: 1, total: 16 },
          },
          "method-in-progress": {
            population: { completed: 4, total: 34 },
            family: { completed: 0, total: 17 },
            economic: { completed: 0, total: 41 },
            buildings: { completed: 7, total: 23 },
            establishments: { completed: 3, total: 16 },
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
        actual: 7.0,
      },
      datasets: {
        acquired: 45,
        primaryTotal: 97,
        secondaryTotal: 26,
        byStatus: [
          {
            name: "Primary",
            "To be requested": 9,
            "Access requested": 38,
            "Access secured": 0,
            "Integration in progress": 1,
            "Validation in progress": 45,
            Validated: 4,
          },
          {
            name: "Secondary",
            "To be requested": 0,
            "Access requested": 13,
            "Access secured": 0,
            "Integration in progress": 1,
            "Validation in progress": 6,
            Validated: 6,
          },
        ],
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
        item: "Preliminary computations of indicators of Qatari Employees in Private Sector and Total Establishemnts by Establishment Type",
        owner: "Artefact/ Malomatia",
        criticality: "High",
        status: "In Progress",
        dueDate: "2025-09-30",
        topic: "Census Indicators",
      },
      {
        id: 2,
        item: "Development of 3 AI-uses led by Artefact AI Specialist, supporting the Buildings & Economic characteristics baskets",
        owner: "Artefact/ Malomatia",
        criticality: "Medium",
        status: "In Progress",
        dueDate: "2025-09-30",
        topic: "AI/ML use-cases",
      },
    ],
  },
  "census-indicators": [
    {
      id: "IND001",
      name: "Total Establishments by Establishment Type",
      basket: "Economic Characteristics",
      status: "in-progress",
      lastUpdate: "2025-08-11",
      coverage: "84,284 - 105,486",
      qdti: 91,
      methodology: "sef",
    },
    {
      id: "IND002",
      name: "Qatari Employee in Private Sector",
      basket: "Economic Characteristics",
      status: "in-progress",
      lastUpdate: "2025-08-11",
      coverage: "13,883 - 14,008",
      qdti: 96,
      methodology:
        "Aggregated from household composition data using statistical modeling and cross-validation",
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
