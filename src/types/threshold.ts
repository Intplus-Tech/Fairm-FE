export interface ThresholdRequest {
  useIndustryBenchmarks?: boolean;
  useSystemThreshold?: boolean;
  mortalityRate: {
    warning: number;
    critical: number;
  };
  temperatureRange: {
    min: number;
    max: number;
  };
  feedConsumptionDeviation: {
    lowerLimit: {
      warning: number;
      critical: number;
    };
    upperLimit: {
      warning: number;
      critical: number;
    };
  };
  eggProductionPerBird: {
    ageRange: string;
    eggsPerWeek: number;
  }[];
}

export interface ThresholdResponse {
  _id: string;
  useIndustryBenchmarks?: boolean;
  useSystemThreshold?: boolean;
  mortalityRate: {
    warning: number;
    critical: number;
  };
  temperatureRange: {
    min: number;
    max: number;
  };
  feedConsumptionDeviation: {
    lowerLimit: {
      warning: number;
      critical: number;
    };
    upperLimit: {
      warning: number;
      critical: number;
    };
  };
  eggProductionPerBird: [
    {
      ageRange: string;
      eggsPerWeek: number;
    },
    {
      ageRange: string;
      eggsPerWeek: number;
    },
    {
      ageRange: string;
      eggsPerWeek: number;
    },
    {
      ageRange: string;
      eggsPerWeek: number;
    },
  ];
  createdAt: string;
  updatedAt: string;
}
