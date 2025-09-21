import { useState } from "react";
import { IndicatorList } from "@/components/IndicatorList";
import { IndicatorDetail } from "@/components/IndicatorDetail";
import { useAtomValue } from "jotai";
import { jsonDataAtom } from "@/lib/utils";

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

const CensusIndicators = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(
    null
  );
  const getData = useAtomValue(jsonDataAtom);

  // Mock indicators data
  const indicators: Indicator[] = getData["census-indicators"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-card-foreground">
          Census Indicators
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze all 131 census indicators with detailed breakdowns
          and progress tracking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel - Indicator List */}
        <div className="lg:col-span-2">
          <IndicatorList
            indicators={indicators}
            selectedIndicator={selectedIndicator}
            onSelectIndicator={setSelectedIndicator}
          />
        </div>

        {/* Right Panel - Indicator Details */}
        <div className="lg:col-span-3">
          <IndicatorDetail indicator={selectedIndicator} />
        </div>
      </div>
    </div>
  );
};

export default CensusIndicators;
