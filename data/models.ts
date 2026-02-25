export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface KeySpec {
  label: string;
  value: string;
  unit: string;
}

export interface MotorSpecs {
  type?: string;
  power?: string;
  torque?: string;
  topSpeed?: string;
  acceleration?: string;
}

export interface BatterySpecs {
  capacity?: string;
  chemistry?: string;
  range?: string;
  charging?: string;
  chargingTime?: string;
  warranty?: string;
}

export interface ElectronicsSpecs {
  abs?: string;
  tractionControl?: string;
  ridingModes?: string;
  display?: string;
  connectivity?: string;
  dataRecorder?: string;
}

export interface CyclePartsSpecs {
  frame?: string;
  frontSuspension?: string;
  rearSuspension?: string;
  frontBrake?: string;
  rearBrake?: string;
  frontTyre?: string;
  rearTyre?: string;
}

export interface DimensionSpecs {
  seatHeight?: string;
  wheelbase?: string;
  length?: string;
  weight?: string;
  fuelCapacity?: string;
}

export interface ModelSpecs {
  motor: MotorSpecs;
  battery: BatterySpecs;
  electronics: ElectronicsSpecs;
  dimensions: DimensionSpecs;
  cycleParts: CyclePartsSpecs;
}

export interface BikeModel {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  heroImage: string;
  lifestyleImages: string[];
  colors: ColorOption[];
  keySpecs: KeySpec[];
  specs: ModelSpecs;
  storyParagraphs?: string[];
  callout?: { stat: string; label: string };
}

// Note: paths with spaces are URL-encoded for browser safety
export const models: BikeModel[] = [
  {
    id: "experia",
    name: "Experia",
    tagline: "Born to be wind",
    headline: "Europe's First Electric Green Tourer",
    description:
      "Purpose-driven performance meets long-distance capability. The Experia redefines what an electric tourer can be — with 420 km of city range, rapid DC charging, and Italian craftsmanship built for the open road.",
    storyParagraphs: [
      "New High-Tech Platform built on a decade of MotoE engineering. The Experia represents Energica's most ambitious project — a machine that proves electric touring doesn't mean compromise.",
      "With 22.5 kWh of onboard energy, the Experia holds the title for the largest battery capacity of any production electric motorcycle. That translates to real-world range: 420 km of city riding, 256 km combined, without stopping to charge.",
      "DC fast charging via CCS Combo means 80% in under 40 minutes at any public network across Europe and beyond. The Experia turns the entire charging grid into your personal fuel station.",
    ],
    callout: {
      stat: "22.5 kWh",
      label: "Largest battery of any production electric motorcycle",
    },
    heroImage: "/images/Pagina%20Experia/Energica_Experia.png",
    lifestyleImages: [
      "/images/Pagina%20Experia/Experia_MM_0218.jpg",
      "/images/Pagina%20Experia/0N-Experia_MM_0656_mod.jpg",
      "/images/Pagina%20Experia/ANN7719_mod-rc.jpg",
    ],
    colors: [
      {
        name: "Bormio ICE",
        hex: "#8BB8D4",
        image: "/images/Pagina%20Experia/Energica_Experia.png",
      },
      {
        name: "White Flame",
        hex: "#F5F5F5",
        image: "/images/Pagina%20Experia/Energica_Experia.png",
      },
      {
        name: "Metal Black",
        hex: "#1a1a1a",
        image: "/images/Pagina%20Experia/Energica_Experia.png",
      },
    ],
    keySpecs: [
      { label: "Peak Power", value: "102", unit: "HP" },
      { label: "0–100 km/h", value: "3.5", unit: "sec" },
      { label: "City Range", value: "420", unit: "km" },
      { label: "Top Speed", value: "180", unit: "km/h" },
    ],
    specs: {
      motor: {
        type: "Permanent Magnet Assisted Synchronous Reluctance (PMASynRM)",
        power: "75 kW / 102 HP peak",
        torque: "115 Nm — 900 Nm at wheel",
        topSpeed: "180 km/h",
        acceleration: "0–100 km/h in 3.5 sec",
      },
      battery: {
        capacity: "22.5 kWh gross (19.6 kWh nominal)",
        chemistry: "Lithium Polymer",
        range: "City: 420 km / Combined: 256 km / Highway: 161 km",
        charging: "DC Fast Charge Level 3 — CCS Combo",
        chargingTime: "0–80% in under 40 min (DC fast)",
        warranty: "3 years / 31,000 miles",
      },
      electronics: {
        abs: "Bosch 9.3MP ABS + Cornering ABS",
        tractionControl: "Bosch MSC — Motorcycle Stability Control",
        ridingModes: "Urban · Eco · Rain · Sport · Boost · Custom",
        display: "5\" TFT full-colour touchscreen",
        connectivity: "My Energica App — iOS & Android · Bluetooth · 4G",
        dataRecorder: "On-board data logger — ride telemetry",
      },
      dimensions: {
        seatHeight: "847 mm",
        wheelbase: "1,513 mm",
        length: "2,132 mm",
        weight: "260 kg",
        fuelCapacity: "Equivalent 22.5 kWh",
      },
      cycleParts: {
        frame: "Tubular steel trellis",
        frontSuspension: "48 mm USD Marzocchi fork — 120 mm travel",
        rearSuspension: "Öhlins TTX36 monoshock — 127 mm travel",
        frontBrake: "Brembo M4.32 radial — 330 mm disc",
        rearBrake: "Brembo single piston — 260 mm disc",
        frontTyre: "120/70-ZR17",
        rearTyre: "180/55-ZR17",
      },
    },
  },
  {
    id: "esseesse9",
    name: "EsseEsse9+",
    tagline: "The Naked Champion",
    headline: "Pure. Naked. Electrifying.",
    description:
      "The most aggressive electric naked on the market. Born from racing DNA, the EsseEsse9+ delivers supercar acceleration and relentless torque in a stripped-down package that demands attention.",
    storyParagraphs: [
      "The EsseEsse9+ is aggression made tangible. Every component stripped to its essential function, every curve sculpted for air and authority.",
      "200 Nm of wheel torque hits at 0 rpm and never backs down. The 0–100 km/h sprint in 3.2 seconds is clinical, repeatable, and addictive — without the drama of a combustion engine between your knees.",
      "This is Energica's racing heritage riding on public roads. The SS9 shares its motor architecture with the MotoE race machines — the same platform that has powered every FIM Enel MotoE grid since 2019.",
    ],
    callout: {
      stat: "200 Nm",
      label: "Wheel torque — from the moment you twist the throttle",
    },
    heroImage: "/images/Pagina%20SS9/ss9-1.png",
    lifestyleImages: [
      "/images/Pagina%20SS9/ss9_featured_740x660_7766.jpg",
      "/images/Pagina%20SS9/ANN7756.jpg",
      "/images/Pagina%20SS9/ANN7824.jpg",
      "/images/Pagina%20SS9/ss9_mosaico_ANN4384.jpg",
    ],
    colors: [
      {
        name: "Sunrise Red",
        hex: "#CC2200",
        image:
          "/images/Pagina%20SS9/esseesse9-sunrisered-plus-Colored-belly-pan-resize-5.png",
      },
      {
        name: "Metal Black",
        hex: "#1a1a1a",
        image: "/images/Pagina%20SS9/egoplus-black-red-frame-resize-5.png",
      },
      {
        name: "RS Edition",
        hex: "#8B0000",
        image: "/images/Pagina%20SS9/ss9RS.png",
      },
    ],
    keySpecs: [
      { label: "Peak Power", value: "107", unit: "HP" },
      { label: "0–100 km/h", value: "3.2", unit: "sec" },
      { label: "City Range", value: "261", unit: "km" },
      { label: "Top Speed", value: "200", unit: "km/h" },
    ],
    specs: {
      motor: {
        type: "Permanent Magnet Assisted Synchronous Reluctance (PMASynRM)",
        power: "80 kW / 107 HP peak",
        torque: "200 Nm at wheel",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 3.2 sec",
      },
      battery: {
        capacity: "21.5 kWh gross",
        chemistry: "Lithium Polymer",
        range: "City: 261 km / Combined: 180 km",
        charging: "DC Fast Charge Level 3 — CCS Combo",
        chargingTime: "0–80% in under 40 min (DC fast)",
        warranty: "3 years / 31,000 miles",
      },
      electronics: {
        abs: "Bosch 9.3MP ABS + Cornering ABS",
        tractionControl: "Bosch MSC — Motorcycle Stability Control",
        ridingModes: "Urban · Eco · Rain · Sport · Boost · Custom",
        display: "5\" TFT full-colour touchscreen",
        connectivity: "My Energica App — iOS & Android · Bluetooth · 4G",
        dataRecorder: "On-board data logger — ride telemetry",
      },
      dimensions: {
        seatHeight: "820 mm",
        wheelbase: "1,440 mm",
        length: "2,060 mm",
        weight: "260 kg",
      },
      cycleParts: {
        frame: "Tubular steel trellis",
        frontSuspension: "48 mm USD Marzocchi fork — 120 mm travel",
        rearSuspension: "Öhlins TTX36 monoshock — 127 mm travel",
        frontBrake: "Brembo M4.32 radial — 330 mm disc",
        rearBrake: "Brembo single piston — 260 mm disc",
        frontTyre: "120/70-ZR17",
        rearTyre: "180/55-ZR17",
      },
    },
  },
  {
    id: "eva-ribelle",
    name: "Eva Ribelle",
    tagline: "The Rebel",
    headline: "Redefine Every Road.",
    description:
      "Where Italian design meets electric power. The Eva Ribelle is a statement — sculpted for those who refuse to follow. Every line, every curve, an act of rebellion against the ordinary.",
    storyParagraphs: [
      "Eva Ribelle means Eva the Rebel. A name that carries a philosophy. This is a motorcycle built not to fit in but to stand out — on every road, in every city, in every photograph.",
      "The same 107 HP motor and 21.5 kWh battery as the EsseEsse9+ lives within a body shaped by Italian design masters. Form and function in equal measure.",
      "Three colourways, each its own character. Rebel Black for the urban anarchist. RS Edition for the track-day convert. Tricolore for those who wear their Italian pride.",
    ],
    callout: {
      stat: "107 HP",
      label: "Pure Italian electric performance",
    },
    heroImage: "/images/Pagina%20Eva/Eva-Ribelle-1.png",
    lifestyleImages: [
      "/images/Pagina%20Eva/evaribelle_slider1440x930_5533-1.jpg",
      "/images/Pagina%20Eva/ANN5461.jpg",
      "/images/Pagina%20Eva/ANN5814.jpg",
      "/images/Pagina%20Eva/evaribelle_mosaico_ANN4110.jpg",
    ],
    colors: [
      {
        name: "Rebel Black",
        hex: "#111111",
        image: "/images/Pagina%20Eva/evaribelle.png",
      },
      {
        name: "RS Edition",
        hex: "#CC2200",
        image: "/images/Pagina%20Eva/evaribelle-RS.png",
      },
      {
        name: "Tricolore",
        hex: "#009246",
        image: "/images/Pagina%20Eva/evaribelle-tricolore_670x377.png",
      },
    ],
    keySpecs: [
      { label: "Peak Power", value: "107", unit: "HP" },
      { label: "0–100 km/h", value: "3.2", unit: "sec" },
      { label: "City Range", value: "261", unit: "km" },
      { label: "Top Speed", value: "200", unit: "km/h" },
    ],
    specs: {
      motor: {
        type: "Permanent Magnet Assisted Synchronous Reluctance (PMASynRM)",
        power: "80 kW / 107 HP peak",
        torque: "200 Nm at wheel",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 3.2 sec",
      },
      battery: {
        capacity: "21.5 kWh gross",
        chemistry: "Lithium Polymer",
        range: "City: 261 km / Combined: 180 km",
        charging: "DC Fast Charge Level 3 — CCS Combo",
        chargingTime: "0–80% in under 40 min (DC fast)",
        warranty: "3 years / 31,000 miles",
      },
      electronics: {
        abs: "Bosch 9.3MP ABS + Cornering ABS",
        tractionControl: "Bosch MSC — Motorcycle Stability Control",
        ridingModes: "Urban · Eco · Rain · Sport · Boost · Custom",
        display: "5\" TFT full-colour touchscreen",
        connectivity: "My Energica App — iOS & Android · Bluetooth · 4G",
        dataRecorder: "On-board data logger — ride telemetry",
      },
      dimensions: {
        seatHeight: "830 mm",
        wheelbase: "1,440 mm",
        length: "2,070 mm",
        weight: "260 kg",
      },
      cycleParts: {
        frame: "Tubular steel trellis",
        frontSuspension: "48 mm USD Marzocchi fork — 120 mm travel",
        rearSuspension: "Öhlins TTX36 monoshock — 127 mm travel",
        frontBrake: "Brembo M4.32 radial — 330 mm disc",
        rearBrake: "Brembo single piston — 260 mm disc",
        frontTyre: "120/70-ZR17",
        rearTyre: "180/55-ZR17",
      },
    },
  },
  {
    id: "ego",
    name: "Ego+",
    tagline: "Track Tested. Street Legal.",
    headline: "Born on the Circuit.",
    description:
      "MotoE-derived technology for the road. The Ego+ carries championship-winning DNA from the FIM Enel MotoE World Cup — raw, uncompromising, and built to make the streets your personal circuit.",
    storyParagraphs: [
      "Seven seasons of MotoE. One motorcycle built from everything Energica learned on the grid. The Ego+ is the closest thing to a race bike you can ride to work — and park legally.",
      "145 HP. 0–100 in 2.6 seconds. A top speed of 200 km/h. These are numbers borrowed from the race track, delivered in a package that passes every road-legal test.",
      "The Ego+ doesn't compromise. Full Öhlins suspension. Brembo brakes front and rear. A chassis geometry tuned on the same circuits where MotoE champions trained.",
    ],
    callout: {
      stat: "145 HP",
      label: "MotoE-derived peak power — road legal",
    },
    heroImage: "/images/Pagina%20EGO/Ego-1.png",
    lifestyleImages: [
      "/images/Pagina%20EGO/ego_mosaico_ANN4320.jpg",
      "/images/Pagina%20EGO/ANN4778.jpg",
      "/images/Pagina%20EGO/ANN4779.jpg",
      "/images/Pagina%20EGO/ANN4787.jpg",
    ],
    colors: [
      {
        name: "Tricolore",
        hex: "#009246",
        image: "/images/Pagina%20EGO/ego-tricolore_670x377.png",
      },
      {
        name: "RS Edition",
        hex: "#8B0000",
        image: "/images/Pagina%20EGO/Ego-RS.png",
      },
      {
        name: "Carbon Black",
        hex: "#0d0d0d",
        image: "/images/Pagina%20EGO/Ego-1.png",
      },
    ],
    keySpecs: [
      { label: "Peak Power", value: "145", unit: "HP" },
      { label: "0–100 km/h", value: "2.6", unit: "sec" },
      { label: "City Range", value: "261", unit: "km" },
      { label: "Top Speed", value: "200", unit: "km/h" },
    ],
    specs: {
      motor: {
        type: "Permanent Magnet Assisted Synchronous Reluctance (PMASynRM)",
        power: "107 kW / 145 HP peak",
        torque: "215 Nm at wheel",
        topSpeed: "200 km/h",
        acceleration: "0–100 km/h in 2.6 sec",
      },
      battery: {
        capacity: "21.5 kWh gross",
        chemistry: "Lithium Polymer",
        range: "City: 261 km / Combined: 180 km",
        charging: "DC Fast Charge Level 3 — CCS Combo",
        chargingTime: "0–80% in under 40 min (DC fast)",
        warranty: "3 years / 31,000 miles",
      },
      electronics: {
        abs: "Bosch 9.3MP ABS + Cornering ABS",
        tractionControl: "Bosch MSC — Motorcycle Stability Control",
        ridingModes: "Urban · Eco · Rain · Sport · Boost · Custom",
        display: "5\" TFT full-colour touchscreen",
        connectivity: "My Energica App — iOS & Android · Bluetooth · 4G",
        dataRecorder: "On-board data logger — MotoE-spec telemetry",
      },
      dimensions: {
        seatHeight: "805 mm",
        wheelbase: "1,430 mm",
        length: "2,050 mm",
        weight: "260 kg",
      },
      cycleParts: {
        frame: "Tubular steel trellis — MotoE derived",
        frontSuspension: "48 mm USD Marzocchi fork — 120 mm travel",
        rearSuspension: "Öhlins TTX36 monoshock — 127 mm travel",
        frontBrake: "Brembo M4.32 radial — 330 mm disc",
        rearBrake: "Brembo single piston — 260 mm disc",
        frontTyre: "120/70-ZR17",
        rearTyre: "180/55-ZR17",
      },
    },
  },
];

export function getModelById(id: string): BikeModel | undefined {
  return models.find((m) => m.id === id);
}
