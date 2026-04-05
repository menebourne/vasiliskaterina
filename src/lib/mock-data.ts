import type {
  Product,
  Supplier,
  Location,
  InventoryItem,
  UsageRecord,
  ProcedureTemplate,
  Invoice,
  Alert,
  AlertRule,
  WeeklyUsage,
} from "./types";

// ── Suppliers ──
export const suppliers: Supplier[] = [
  {
    id: "sup_1",
    name: "Henry Schein",
    contactEmail: "orders@henryschein.com",
    phone: "(800) 372-4346",
    website: "https://henryschein.com",
    accountNumber: "HS-44821",
  },
  {
    id: "sup_2",
    name: "Patterson Dental",
    contactEmail: "orders@pattersondental.com",
    phone: "(800) 328-5536",
    website: "https://pattersondental.com",
    accountNumber: "PD-91037",
  },
  {
    id: "sup_3",
    name: "Benco Dental",
    contactEmail: "orders@benco.com",
    phone: "(800) 462-3626",
    website: "https://benco.com",
    accountNumber: "BD-66219",
  },
];

// ── Locations ──
export const locations: Location[] = [
  { id: "loc_1", name: "Operatory 1", description: "Primary treatment room" },
  { id: "loc_2", name: "Operatory 2", description: "Secondary treatment room" },
  { id: "loc_3", name: "Operatory 3", description: "Hygiene room A" },
  { id: "loc_4", name: "Operatory 4", description: "Hygiene room B" },
  { id: "loc_5", name: "Storage Room", description: "Main inventory storage" },
  { id: "loc_6", name: "Sterilization", description: "Sterilization center" },
];

// ── Products (40+) ──
export const products: Product[] = [
  // Composites
  { id: "prod_1", name: "Filtek Supreme Ultra", manufacturer: "3M", sku: "3M-FSU-A2B", barcode: "70200734812", category: "composites", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 42.50, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_2", name: "Filtek Z250", manufacturer: "3M", sku: "3M-Z250-A3", barcode: "70200749421", category: "composites", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 38.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_3", name: "Tetric EvoCeram", manufacturer: "Ivoclar", sku: "IV-TEC-A2", barcode: "76186021543", category: "composites", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 55.00, lowStockThreshold: 3, createdAt: "2024-02-01" },
  { id: "prod_4", name: "Venus Diamond", manufacturer: "Kulzer", sku: "KZ-VD-A1", barcode: "40066338217", category: "composites", unitsPerPackage: 1, defaultSupplierId: "sup_3", lastPrice: 48.75, lowStockThreshold: 3, createdAt: "2024-02-01" },

  // Cements
  { id: "prod_5", name: "RelyX Unicem 2", manufacturer: "3M", sku: "3M-RU2-A2", barcode: "70200762114", category: "cements", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 125.00, lowStockThreshold: 3, createdAt: "2024-01-20" },
  { id: "prod_6", name: "Fuji IX GP", manufacturer: "GC America", sku: "GC-F9GP", barcode: "48011037284", category: "cements", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 78.50, lowStockThreshold: 3, createdAt: "2024-01-20" },
  { id: "prod_7", name: "Ketac Molar", manufacturer: "3M", sku: "3M-KM-A3", barcode: "70200751009", category: "cements", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 65.00, lowStockThreshold: 3, createdAt: "2024-03-01" },

  // Impression Materials
  { id: "prod_8", name: "Impregum Penta Soft", manufacturer: "3M", sku: "3M-IPS", barcode: "70200771284", category: "impression_materials", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 185.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_9", name: "Aquasil Ultra", manufacturer: "Dentsply", sku: "DS-AQU", barcode: "80611821036", category: "impression_materials", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 165.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_10", name: "Alginate (Jeltrate Plus)", manufacturer: "Dentsply", sku: "DS-JP-454", barcode: "80611891226", category: "impression_materials", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 28.50, lowStockThreshold: 3, createdAt: "2024-02-10" },

  // Anesthetics
  { id: "prod_11", name: "Lidocaine 2% w/ Epi 1:100k", manufacturer: "Septodont", sku: "SP-LID2E", barcode: "30191322147", category: "anesthetics", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 42.00, lowStockThreshold: 3, createdAt: "2024-01-10" },
  { id: "prod_12", name: "Articaine 4% w/ Epi 1:100k", manufacturer: "Septodont", sku: "SP-ART4E", barcode: "30191344210", category: "anesthetics", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 55.00, lowStockThreshold: 3, createdAt: "2024-01-10" },
  { id: "prod_13", name: "Mepivacaine 3% (Carbocaine)", manufacturer: "Septodont", sku: "SP-MEP3", barcode: "30191367819", category: "anesthetics", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 38.50, lowStockThreshold: 3, createdAt: "2024-01-10" },
  { id: "prod_14", name: "Bupivacaine 0.5% w/ Epi", manufacturer: "Septodont", sku: "SP-BUP05E", barcode: "30191388214", category: "anesthetics", unitsPerPackage: 50, defaultSupplierId: "sup_3", lastPrice: 47.00, lowStockThreshold: 3, createdAt: "2024-03-05" },

  // Burs
  { id: "prod_15", name: "Diamond Bur Kit (FG)", manufacturer: "Komet", sku: "KM-DBK-FG", barcode: "40421198302", category: "burs", unitsPerPackage: 5, defaultSupplierId: "sup_2", lastPrice: 32.00, lowStockThreshold: 3, createdAt: "2024-02-15" },
  { id: "prod_16", name: "Carbide Bur #330 (FG)", manufacturer: "SS White", sku: "SSW-330FG", barcode: "90811224516", category: "burs", unitsPerPackage: 10, defaultSupplierId: "sup_1", lastPrice: 18.50, lowStockThreshold: 3, createdAt: "2024-02-15" },
  { id: "prod_17", name: "Finishing Bur Set", manufacturer: "Komet", sku: "KM-FBS12", barcode: "40421201889", category: "burs", unitsPerPackage: 12, defaultSupplierId: "sup_2", lastPrice: 45.00, lowStockThreshold: 3, createdAt: "2024-02-15" },

  // Endo Files
  { id: "prod_18", name: "ProTaper Gold", manufacturer: "Dentsply", sku: "DS-PTG-25", barcode: "80611853219", category: "endo_files", unitsPerPackage: 6, defaultSupplierId: "sup_2", lastPrice: 95.00, lowStockThreshold: 3, createdAt: "2024-01-25" },
  { id: "prod_19", name: "WaveOne Gold", manufacturer: "Dentsply", sku: "DS-WOG-P", barcode: "80611867302", category: "endo_files", unitsPerPackage: 3, defaultSupplierId: "sup_2", lastPrice: 78.00, lowStockThreshold: 3, createdAt: "2024-01-25" },
  { id: "prod_20", name: "K-Files #15-40", manufacturer: "Kerr", sku: "KR-KF-1540", barcode: "66019882143", category: "endo_files", unitsPerPackage: 6, defaultSupplierId: "sup_1", lastPrice: 22.00, lowStockThreshold: 3, createdAt: "2024-03-01" },

  // Bonding Agents
  { id: "prod_21", name: "Scotchbond Universal Plus", manufacturer: "3M", sku: "3M-SBU-P", barcode: "70200782218", category: "bonding_agents", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 115.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_22", name: "OptiBond Solo Plus", manufacturer: "Kerr", sku: "KR-OBS-P", barcode: "66019901127", category: "bonding_agents", unitsPerPackage: 1, defaultSupplierId: "sup_3", lastPrice: 98.00, lowStockThreshold: 3, createdAt: "2024-02-01" },
  { id: "prod_23", name: "Prime & Bond Elect", manufacturer: "Dentsply", sku: "DS-PBE", barcode: "80611901456", category: "bonding_agents", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 89.00, lowStockThreshold: 3, createdAt: "2024-02-01" },

  // PPE
  { id: "prod_24", name: "Nitrile Gloves (Medium)", manufacturer: "Halyard", sku: "HY-NG-M", barcode: "36821004518", category: "ppe", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 14.50, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_25", name: "Nitrile Gloves (Large)", manufacturer: "Halyard", sku: "HY-NG-L", barcode: "36821004525", category: "ppe", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 14.50, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_26", name: "Level 3 Face Masks", manufacturer: "Crosstex", sku: "CT-FM-L3", barcode: "71019224310", category: "ppe", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 12.00, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_27", name: "Face Shield", manufacturer: "Crosstex", sku: "CT-FS-1", barcode: "71019245218", category: "ppe", unitsPerPackage: 25, defaultSupplierId: "sup_3", lastPrice: 22.00, lowStockThreshold: 3, createdAt: "2024-02-10" },
  { id: "prod_28", name: "Protective Eyewear", manufacturer: "Palmero", sku: "PM-PE-BK", barcode: "82511089210", category: "ppe", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 8.50, lowStockThreshold: 3, createdAt: "2024-02-10" },

  // Sterilization
  { id: "prod_29", name: "Sterilization Pouches 3.5x10", manufacturer: "Crosstex", sku: "CT-SP-35", barcode: "71019301218", category: "sterilization", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 24.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_30", name: "Sterilization Pouches 5.25x10", manufacturer: "Crosstex", sku: "CT-SP-52", barcode: "71019301335", category: "sterilization", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 28.00, lowStockThreshold: 3, createdAt: "2024-01-15" },
  { id: "prod_31", name: "Enzymatic Cleaner", manufacturer: "Metrex", sku: "MX-EC-G", barcode: "10811012589", category: "sterilization", unitsPerPackage: 1, defaultSupplierId: "sup_2", lastPrice: 35.00, lowStockThreshold: 3, createdAt: "2024-02-01" },
  { id: "prod_32", name: "CaviWipes Disinfectant", manufacturer: "Metrex", sku: "MX-CW-160", barcode: "10811045219", category: "sterilization", unitsPerPackage: 160, defaultSupplierId: "sup_2", lastPrice: 18.00, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_33", name: "Biological Indicator (Spore)", manufacturer: "3M", sku: "3M-BI-1292", barcode: "70200801225", category: "sterilization", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 89.00, lowStockThreshold: 3, createdAt: "2024-03-01" },

  // Preventive
  { id: "prod_34", name: "Prophy Paste (Medium)", manufacturer: "Young Dental", sku: "YD-PP-M", barcode: "55183099812", category: "preventive", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 22.00, lowStockThreshold: 3, createdAt: "2024-01-20" },
  { id: "prod_35", name: "Fluoride Varnish 5%", manufacturer: "3M", sku: "3M-FV5-WM", barcode: "70200821109", category: "preventive", unitsPerPackage: 50, defaultSupplierId: "sup_1", lastPrice: 58.00, lowStockThreshold: 3, createdAt: "2024-01-20" },
  { id: "prod_36", name: "Sealant (Clinpro)", manufacturer: "3M", sku: "3M-CS-WT", barcode: "70200831002", category: "preventive", unitsPerPackage: 1, defaultSupplierId: "sup_1", lastPrice: 75.00, lowStockThreshold: 3, createdAt: "2024-02-15" },
  { id: "prod_37", name: "Prophy Angles (Soft Cup)", manufacturer: "Young Dental", sku: "YD-PA-SC", barcode: "55183112508", category: "preventive", unitsPerPackage: 144, defaultSupplierId: "sup_3", lastPrice: 42.00, lowStockThreshold: 3, createdAt: "2024-01-20" },

  // Surgical
  { id: "prod_38", name: "Surgical Sutures 4-0", manufacturer: "Hu-Friedy", sku: "HF-SS-40", barcode: "85611202147", category: "surgical", unitsPerPackage: 12, defaultSupplierId: "sup_2", lastPrice: 38.00, lowStockThreshold: 3, createdAt: "2024-02-20" },
  { id: "prod_39", name: "Collagen Plugs", manufacturer: "Integra", sku: "IN-CP-20", barcode: "62109332148", category: "surgical", unitsPerPackage: 20, defaultSupplierId: "sup_1", lastPrice: 65.00, lowStockThreshold: 3, createdAt: "2024-02-20" },
  { id: "prod_40", name: "Hemostatic Gel", manufacturer: "Ultradent", sku: "UD-HG-4", barcode: "78910448122", category: "surgical", unitsPerPackage: 4, defaultSupplierId: "sup_3", lastPrice: 45.00, lowStockThreshold: 3, createdAt: "2024-03-01" },

  // Miscellaneous
  { id: "prod_41", name: "Cotton Rolls #2", manufacturer: "Richmond", sku: "RC-CR-2", barcode: "44021198765", category: "miscellaneous", unitsPerPackage: 2000, defaultSupplierId: "sup_1", lastPrice: 15.00, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_42", name: "Gauze Sponges 2x2", manufacturer: "Crosstex", sku: "CT-GS-22", barcode: "71019401298", category: "miscellaneous", unitsPerPackage: 200, defaultSupplierId: "sup_1", lastPrice: 8.00, lowStockThreshold: 3, createdAt: "2024-01-05" },
  { id: "prod_43", name: "Dental Floss (Patient)", manufacturer: "Oral-B", sku: "OB-DF-72", barcode: "30042182174", category: "miscellaneous", unitsPerPackage: 72, defaultSupplierId: "sup_3", lastPrice: 32.00, lowStockThreshold: 3, createdAt: "2024-02-01" },
  { id: "prod_44", name: "Articulating Paper (Blue)", manufacturer: "Bausch", sku: "BA-AP-BL", barcode: "40281992547", category: "miscellaneous", unitsPerPackage: 200, defaultSupplierId: "sup_2", lastPrice: 12.00, lowStockThreshold: 3, createdAt: "2024-02-01" },
  { id: "prod_45", name: "Matrix Bands (Tofflemire)", manufacturer: "Garrison", sku: "GR-MB-TF", barcode: "88220184632", category: "miscellaneous", unitsPerPackage: 100, defaultSupplierId: "sup_1", lastPrice: 28.00, lowStockThreshold: 3, createdAt: "2024-02-15" },
];

// ── Inventory Items (60+) ──
export const inventoryItems: InventoryItem[] = [
  // Composites - good stock
  { id: "inv_1", productId: "prod_1", locationId: "loc_1", quantity: 4, lotNumber: "FSU24A", expirationDate: "2026-08-15", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 42.50, addedAt: "2024-11-01", addedBy: "Dr. Harper" },
  { id: "inv_2", productId: "prod_1", locationId: "loc_5", quantity: 12, lotNumber: "FSU24A", expirationDate: "2026-08-15", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 42.50, addedAt: "2024-11-01", addedBy: "Dr. Harper" },
  { id: "inv_3", productId: "prod_2", locationId: "loc_2", quantity: 3, lotNumber: "Z250-B1", expirationDate: "2026-06-20", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 38.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_4", productId: "prod_2", locationId: "loc_5", quantity: 8, lotNumber: "Z250-B1", expirationDate: "2026-06-20", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 38.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_5", productId: "prod_3", locationId: "loc_1", quantity: 2, lotNumber: "TEC-W8", expirationDate: "2026-04-10", reorderThreshold: 3, supplierId: "sup_2", lastPrice: 55.00, addedAt: "2024-09-20", addedBy: "Maria" },
  { id: "inv_6", productId: "prod_4", locationId: "loc_3", quantity: 5, lotNumber: "VD-K2", expirationDate: "2027-01-15", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 48.75, addedAt: "2024-12-01", addedBy: "Maria" },

  // Cements - some low
  { id: "inv_7", productId: "prod_5", locationId: "loc_1", quantity: 1, lotNumber: "RU2-M3", expirationDate: "2026-03-30", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 125.00, addedAt: "2024-08-15", addedBy: "Dr. Harper" },
  { id: "inv_8", productId: "prod_5", locationId: "loc_5", quantity: 3, lotNumber: "RU2-M3", expirationDate: "2026-03-30", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 125.00, addedAt: "2024-08-15", addedBy: "Dr. Harper" },
  { id: "inv_9", productId: "prod_6", locationId: "loc_2", quantity: 2, lotNumber: "F9-22A", expirationDate: "2026-09-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 78.50, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_10", productId: "prod_7", locationId: "loc_5", quantity: 4, lotNumber: "KM-D1", expirationDate: "2026-11-20", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 65.00, addedAt: "2024-11-15", addedBy: "Dr. Harper" },

  // Impression Materials
  { id: "inv_11", productId: "prod_8", locationId: "loc_5", quantity: 2, lotNumber: "IPS-44", expirationDate: "2026-05-15", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 185.00, addedAt: "2024-09-01", addedBy: "Dr. Harper" },
  { id: "inv_12", productId: "prod_9", locationId: "loc_1", quantity: 1, lotNumber: "AQU-77", expirationDate: "2026-07-20", reorderThreshold: 1, supplierId: "sup_2", lastPrice: 165.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_13", productId: "prod_10", locationId: "loc_5", quantity: 6, lotNumber: "JP-811", expirationDate: "2026-02-28", reorderThreshold: 3, supplierId: "sup_2", lastPrice: 28.50, addedAt: "2024-08-01", addedBy: "Maria" },

  // Anesthetics - high volume
  { id: "inv_14", productId: "prod_11", locationId: "loc_1", quantity: 2, lotNumber: "LID-9A", expirationDate: "2026-12-15", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 42.00, addedAt: "2024-11-01", addedBy: "Dr. Harper" },
  { id: "inv_15", productId: "prod_11", locationId: "loc_2", quantity: 2, lotNumber: "LID-9A", expirationDate: "2026-12-15", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 42.00, addedAt: "2024-11-01", addedBy: "Dr. Harper" },
  { id: "inv_16", productId: "prod_11", locationId: "loc_5", quantity: 8, lotNumber: "LID-9B", expirationDate: "2027-03-20", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 42.00, addedAt: "2024-12-01", addedBy: "Dr. Harper" },
  { id: "inv_17", productId: "prod_12", locationId: "loc_1", quantity: 3, lotNumber: "ART-6C", expirationDate: "2026-10-30", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 55.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_18", productId: "prod_12", locationId: "loc_5", quantity: 6, lotNumber: "ART-6C", expirationDate: "2026-10-30", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 55.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_19", productId: "prod_13", locationId: "loc_3", quantity: 1, lotNumber: "MEP-2A", expirationDate: "2026-04-20", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 38.50, addedAt: "2024-09-01", addedBy: "Maria" },
  { id: "inv_20", productId: "prod_14", locationId: "loc_5", quantity: 4, lotNumber: "BUP-1D", expirationDate: "2026-08-10", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 47.00, addedAt: "2024-11-15", addedBy: "Dr. Harper" },

  // Burs
  { id: "inv_21", productId: "prod_15", locationId: "loc_1", quantity: 3, lotNumber: "DBK-44", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 32.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_22", productId: "prod_15", locationId: "loc_2", quantity: 2, lotNumber: "DBK-44", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 32.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_23", productId: "prod_16", locationId: "loc_5", quantity: 15, lotNumber: "330-8B", expirationDate: "2028-01-01", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 18.50, addedAt: "2024-09-15", addedBy: "Dr. Harper" },
  { id: "inv_24", productId: "prod_17", locationId: "loc_1", quantity: 1, lotNumber: "FBS-19", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 45.00, addedAt: "2024-08-01", addedBy: "Maria" },

  // Endo Files
  { id: "inv_25", productId: "prod_18", locationId: "loc_5", quantity: 4, lotNumber: "PTG-55", expirationDate: "2027-06-15", reorderThreshold: 3, supplierId: "sup_2", lastPrice: 95.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_26", productId: "prod_19", locationId: "loc_1", quantity: 2, lotNumber: "WOG-33", expirationDate: "2027-06-15", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 78.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_27", productId: "prod_20", locationId: "loc_5", quantity: 8, lotNumber: "KF-12D", expirationDate: "2028-01-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 22.00, addedAt: "2024-11-01", addedBy: "Maria" },

  // Bonding Agents
  { id: "inv_28", productId: "prod_21", locationId: "loc_1", quantity: 1, lotNumber: "SBU-88", expirationDate: "2026-05-01", reorderThreshold: 1, supplierId: "sup_1", lastPrice: 115.00, addedAt: "2024-08-01", addedBy: "Dr. Harper" },
  { id: "inv_29", productId: "prod_21", locationId: "loc_5", quantity: 3, lotNumber: "SBU-88", expirationDate: "2026-05-01", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 115.00, addedAt: "2024-08-01", addedBy: "Dr. Harper" },
  { id: "inv_30", productId: "prod_22", locationId: "loc_2", quantity: 1, lotNumber: "OBS-21", expirationDate: "2026-06-15", reorderThreshold: 1, supplierId: "sup_3", lastPrice: 98.00, addedAt: "2024-09-01", addedBy: "Maria" },
  { id: "inv_31", productId: "prod_23", locationId: "loc_3", quantity: 1, lotNumber: "PBE-44", expirationDate: "2026-09-20", reorderThreshold: 1, supplierId: "sup_2", lastPrice: 89.00, addedAt: "2024-10-01", addedBy: "Maria" },

  // PPE - high volume items
  { id: "inv_32", productId: "prod_24", locationId: "loc_5", quantity: 8, lotNumber: "NG-M-22", expirationDate: "2027-12-01", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 14.50, addedAt: "2024-12-01", addedBy: "Maria" },
  { id: "inv_33", productId: "prod_24", locationId: "loc_1", quantity: 2, lotNumber: "NG-M-22", expirationDate: "2027-12-01", reorderThreshold: 1, supplierId: "sup_1", lastPrice: 14.50, addedAt: "2024-12-01", addedBy: "Maria" },
  { id: "inv_34", productId: "prod_25", locationId: "loc_5", quantity: 6, lotNumber: "NG-L-22", expirationDate: "2027-12-01", reorderThreshold: 4, supplierId: "sup_1", lastPrice: 14.50, addedAt: "2024-12-01", addedBy: "Maria" },
  { id: "inv_35", productId: "prod_26", locationId: "loc_5", quantity: 10, lotNumber: "FM-L3-55", expirationDate: "2027-06-01", reorderThreshold: 5, supplierId: "sup_1", lastPrice: 12.00, addedAt: "2024-11-15", addedBy: "Maria" },
  { id: "inv_36", productId: "prod_26", locationId: "loc_6", quantity: 3, lotNumber: "FM-L3-55", expirationDate: "2027-06-01", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 12.00, addedAt: "2024-11-15", addedBy: "Maria" },
  { id: "inv_37", productId: "prod_27", locationId: "loc_5", quantity: 4, lotNumber: "FS-9A", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 22.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_38", productId: "prod_28", locationId: "loc_5", quantity: 6, lotNumber: "PE-33", expirationDate: "2030-01-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 8.50, addedAt: "2024-09-01", addedBy: "Maria" },

  // Sterilization
  { id: "inv_39", productId: "prod_29", locationId: "loc_6", quantity: 5, lotNumber: "SP35-88", expirationDate: "2027-09-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 24.00, addedAt: "2024-11-01", addedBy: "Maria" },
  { id: "inv_40", productId: "prod_30", locationId: "loc_6", quantity: 4, lotNumber: "SP52-88", expirationDate: "2027-09-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 28.00, addedAt: "2024-11-01", addedBy: "Maria" },
  { id: "inv_41", productId: "prod_31", locationId: "loc_6", quantity: 2, lotNumber: "EC-G11", expirationDate: "2026-06-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 35.00, addedAt: "2024-09-15", addedBy: "Maria" },
  { id: "inv_42", productId: "prod_32", locationId: "loc_1", quantity: 1, lotNumber: "CW-44B", expirationDate: "2026-08-15", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 18.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_43", productId: "prod_32", locationId: "loc_6", quantity: 6, lotNumber: "CW-44B", expirationDate: "2026-08-15", reorderThreshold: 3, supplierId: "sup_2", lastPrice: 18.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_44", productId: "prod_33", locationId: "loc_6", quantity: 2, lotNumber: "BI-19A", expirationDate: "2026-12-31", reorderThreshold: 1, supplierId: "sup_1", lastPrice: 89.00, addedAt: "2024-11-15", addedBy: "Dr. Harper" },

  // Preventive
  { id: "inv_45", productId: "prod_34", locationId: "loc_3", quantity: 3, lotNumber: "PP-M22", expirationDate: "2026-10-01", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 22.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_46", productId: "prod_34", locationId: "loc_4", quantity: 2, lotNumber: "PP-M22", expirationDate: "2026-10-01", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 22.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_47", productId: "prod_35", locationId: "loc_3", quantity: 2, lotNumber: "FV5-18", expirationDate: "2026-07-15", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 58.00, addedAt: "2024-09-15", addedBy: "Dr. Harper" },
  { id: "inv_48", productId: "prod_35", locationId: "loc_5", quantity: 4, lotNumber: "FV5-18", expirationDate: "2026-07-15", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 58.00, addedAt: "2024-09-15", addedBy: "Dr. Harper" },
  { id: "inv_49", productId: "prod_36", locationId: "loc_3", quantity: 2, lotNumber: "CS-7A", expirationDate: "2026-11-01", reorderThreshold: 1, supplierId: "sup_1", lastPrice: 75.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },
  { id: "inv_50", productId: "prod_37", locationId: "loc_3", quantity: 3, lotNumber: "PA-SC-11", expirationDate: "2027-04-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 42.00, addedAt: "2024-11-01", addedBy: "Maria" },
  { id: "inv_51", productId: "prod_37", locationId: "loc_4", quantity: 2, lotNumber: "PA-SC-11", expirationDate: "2027-04-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 42.00, addedAt: "2024-11-01", addedBy: "Maria" },

  // Surgical
  { id: "inv_52", productId: "prod_38", locationId: "loc_5", quantity: 3, lotNumber: "SS40-6B", expirationDate: "2027-08-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 38.00, addedAt: "2024-10-01", addedBy: "Dr. Harper" },
  { id: "inv_53", productId: "prod_39", locationId: "loc_5", quantity: 2, lotNumber: "CP-20A", expirationDate: "2026-09-15", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 65.00, addedAt: "2024-09-15", addedBy: "Dr. Harper" },
  { id: "inv_54", productId: "prod_40", locationId: "loc_1", quantity: 1, lotNumber: "HG-4C", expirationDate: "2026-06-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 45.00, addedAt: "2024-08-01", addedBy: "Dr. Harper" },
  { id: "inv_55", productId: "prod_40", locationId: "loc_5", quantity: 3, lotNumber: "HG-4C", expirationDate: "2026-06-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 45.00, addedAt: "2024-08-01", addedBy: "Dr. Harper" },

  // Miscellaneous
  { id: "inv_56", productId: "prod_41", locationId: "loc_5", quantity: 5, lotNumber: "CR2-400", expirationDate: "2028-01-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 15.00, addedAt: "2024-11-01", addedBy: "Maria" },
  { id: "inv_57", productId: "prod_42", locationId: "loc_5", quantity: 8, lotNumber: "GS22-19", expirationDate: "2028-01-01", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 8.00, addedAt: "2024-11-01", addedBy: "Maria" },
  { id: "inv_58", productId: "prod_43", locationId: "loc_5", quantity: 4, lotNumber: "DF-72A", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_3", lastPrice: 32.00, addedAt: "2024-10-01", addedBy: "Maria" },
  { id: "inv_59", productId: "prod_44", locationId: "loc_1", quantity: 2, lotNumber: "AP-BL-33", expirationDate: "2028-01-01", reorderThreshold: 1, supplierId: "sup_2", lastPrice: 12.00, addedAt: "2024-09-01", addedBy: "Maria" },
  { id: "inv_60", productId: "prod_44", locationId: "loc_2", quantity: 2, lotNumber: "AP-BL-33", expirationDate: "2028-01-01", reorderThreshold: 1, supplierId: "sup_2", lastPrice: 12.00, addedAt: "2024-09-01", addedBy: "Maria" },
  { id: "inv_61", productId: "prod_45", locationId: "loc_5", quantity: 3, lotNumber: "MB-TF-8", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_1", lastPrice: 28.00, addedAt: "2024-10-15", addedBy: "Dr. Harper" },

  // Items near expiration (for alerts)
  { id: "inv_62", productId: "prod_10", locationId: "loc_3", quantity: 2, lotNumber: "JP-720", expirationDate: "2026-04-15", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 28.50, addedAt: "2024-06-01", addedBy: "Maria" },
  { id: "inv_63", productId: "prod_13", locationId: "loc_5", quantity: 3, lotNumber: "MEP-1B", expirationDate: "2026-04-08", reorderThreshold: 3, supplierId: "sup_1", lastPrice: 38.50, addedAt: "2024-06-01", addedBy: "Dr. Harper" },

  // Items below threshold (for alerts)
  { id: "inv_64", productId: "prod_17", locationId: "loc_2", quantity: 0, lotNumber: "FBS-18", expirationDate: "2028-01-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 45.00, addedAt: "2024-06-01", addedBy: "Maria" },
  { id: "inv_65", productId: "prod_32", locationId: "loc_2", quantity: 0, lotNumber: "CW-43A", expirationDate: "2026-03-01", reorderThreshold: 2, supplierId: "sup_2", lastPrice: 18.00, addedAt: "2024-05-01", addedBy: "Maria" },
];

// ── Usage Records ──
const usageBase: Omit<UsageRecord, "id">[] = [];
const usageDates = [
  "2026-01-06", "2026-01-08", "2026-01-10", "2026-01-13", "2026-01-15",
  "2026-01-20", "2026-01-22", "2026-01-27", "2026-01-29",
  "2026-02-03", "2026-02-05", "2026-02-10", "2026-02-12", "2026-02-17",
  "2026-02-19", "2026-02-24", "2026-02-26",
  "2026-03-03", "2026-03-05", "2026-03-10", "2026-03-12", "2026-03-17",
  "2026-03-19", "2026-03-24", "2026-03-26", "2026-03-31",
  "2026-04-02",
];
usageDates.forEach((date, i) => {
  usageBase.push(
    { productId: "prod_1", quantity: 1, reason: "procedure", procedureTemplateId: "tmpl_1", usedBy: "Dr. Harper", usedAt: date, locationId: "loc_1" },
    { productId: "prod_11", quantity: 2, reason: "procedure", procedureTemplateId: "tmpl_1", usedBy: "Dr. Harper", usedAt: date, locationId: "loc_1" },
    { productId: "prod_24", quantity: 1, reason: "procedure", usedBy: "Dr. Harper", usedAt: date, locationId: "loc_1" },
  );
  if (i % 3 === 0) {
    usageBase.push(
      { productId: "prod_34", quantity: 1, reason: "procedure", procedureTemplateId: "tmpl_4", usedBy: "Maria", usedAt: date, locationId: "loc_3" },
      { productId: "prod_37", quantity: 2, reason: "procedure", procedureTemplateId: "tmpl_4", usedBy: "Maria", usedAt: date, locationId: "loc_3" },
    );
  }
  if (i % 5 === 0) {
    usageBase.push(
      { productId: "prod_18", quantity: 1, reason: "procedure", procedureTemplateId: "tmpl_3", usedBy: "Dr. Harper", usedAt: date, locationId: "loc_1" },
    );
  }
  if (i % 4 === 0) {
    usageBase.push(
      { productId: "prod_26", quantity: 1, reason: "procedure", usedBy: "Maria", usedAt: date, locationId: "loc_3" },
    );
  }
});

export const usageRecords: UsageRecord[] = usageBase.map((u, i) => ({
  ...u,
  id: `use_${i + 1}`,
}));

// ── Weekly Usage (for charts) ──
export const weeklyUsage: WeeklyUsage[] = [
  { week: "Jan 6", count: 18 },
  { week: "Jan 13", count: 22 },
  { week: "Jan 20", count: 15 },
  { week: "Jan 27", count: 20 },
  { week: "Feb 3", count: 24 },
  { week: "Feb 10", count: 19 },
  { week: "Feb 17", count: 21 },
  { week: "Feb 24", count: 17 },
  { week: "Mar 3", count: 23 },
  { week: "Mar 10", count: 26 },
  { week: "Mar 17", count: 20 },
  { week: "Mar 24", count: 22 },
];

// ── Procedure Templates ──
export const procedureTemplates: ProcedureTemplate[] = [
  {
    id: "tmpl_1",
    name: "Class II Composite",
    description: "Posterior composite restoration with bonding",
    materials: [
      { productId: "prod_1", quantity: 1 },
      { productId: "prod_21", quantity: 1 },
      { productId: "prod_11", quantity: 2 },
      { productId: "prod_44", quantity: 1 },
      { productId: "prod_45", quantity: 1 },
      { productId: "prod_16", quantity: 1 },
    ],
  },
  {
    id: "tmpl_2",
    name: "Crown Prep",
    description: "Full coverage crown preparation and impression",
    materials: [
      { productId: "prod_11", quantity: 3 },
      { productId: "prod_15", quantity: 1 },
      { productId: "prod_8", quantity: 1 },
      { productId: "prod_41", quantity: 5 },
      { productId: "prod_42", quantity: 2 },
    ],
  },
  {
    id: "tmpl_3",
    name: "Root Canal (Molar)",
    description: "Endodontic treatment - molar",
    materials: [
      { productId: "prod_12", quantity: 3 },
      { productId: "prod_18", quantity: 1 },
      { productId: "prod_20", quantity: 1 },
      { productId: "prod_41", quantity: 3 },
    ],
  },
  {
    id: "tmpl_4",
    name: "Prophy (Adult)",
    description: "Adult prophylaxis / cleaning",
    materials: [
      { productId: "prod_34", quantity: 1 },
      { productId: "prod_37", quantity: 2 },
      { productId: "prod_35", quantity: 1 },
      { productId: "prod_43", quantity: 1 },
    ],
  },
  {
    id: "tmpl_5",
    name: "Simple Extraction",
    description: "Non-surgical tooth extraction",
    materials: [
      { productId: "prod_11", quantity: 2 },
      { productId: "prod_42", quantity: 4 },
      { productId: "prod_39", quantity: 1 },
      { productId: "prod_38", quantity: 1 },
    ],
  },
];

// ── Invoices ──
export const invoices: Invoice[] = [
  {
    id: "inv_doc_1",
    supplierId: "sup_1",
    invoiceNumber: "HS-2026-04412",
    date: "2026-03-28",
    totalAmount: 1245.50,
    status: "paid",
    createdAt: "2026-03-28",
    lineItems: [
      { id: "li_1", productId: "prod_1", quantity: 10, unitPrice: 42.50, totalPrice: 425.00 },
      { id: "li_2", productId: "prod_11", quantity: 5, unitPrice: 42.00, totalPrice: 210.00 },
      { id: "li_3", productId: "prod_21", quantity: 3, unitPrice: 115.00, totalPrice: 345.00 },
      { id: "li_4", productId: "prod_24", quantity: 5, unitPrice: 14.50, totalPrice: 72.50 },
      { id: "li_5", productId: "prod_29", quantity: 4, unitPrice: 24.00, totalPrice: 96.00 },
      { id: "li_6", productId: "prod_33", quantity: 1, unitPrice: 89.00, totalPrice: 89.00 },
      { id: "li_7", productId: "prod_41", quantity: 1, unitPrice: 15.00, totalPrice: 15.00 },
    ],
  },
  {
    id: "inv_doc_2",
    supplierId: "sup_2",
    invoiceNumber: "PD-2026-88219",
    date: "2026-03-20",
    totalAmount: 867.00,
    status: "paid",
    createdAt: "2026-03-20",
    lineItems: [
      { id: "li_8", productId: "prod_9", quantity: 2, unitPrice: 165.00, totalPrice: 330.00 },
      { id: "li_9", productId: "prod_18", quantity: 3, unitPrice: 95.00, totalPrice: 285.00 },
      { id: "li_10", productId: "prod_31", quantity: 2, unitPrice: 35.00, totalPrice: 70.00 },
      { id: "li_11", productId: "prod_32", quantity: 5, unitPrice: 18.00, totalPrice: 90.00 },
      { id: "li_12", productId: "prod_44", quantity: 3, unitPrice: 12.00, totalPrice: 36.00 },
      { id: "li_13", productId: "prod_15", quantity: 2, unitPrice: 32.00, totalPrice: 64.00 },
    ],
  },
  {
    id: "inv_doc_3",
    supplierId: "sup_3",
    invoiceNumber: "BD-2026-55103",
    date: "2026-03-15",
    totalAmount: 524.75,
    status: "processed",
    createdAt: "2026-03-15",
    lineItems: [
      { id: "li_14", productId: "prod_4", quantity: 5, unitPrice: 48.75, totalPrice: 243.75 },
      { id: "li_15", productId: "prod_22", quantity: 2, unitPrice: 98.00, totalPrice: 196.00 },
      { id: "li_16", productId: "prod_27", quantity: 2, unitPrice: 22.00, totalPrice: 44.00 },
      { id: "li_17", productId: "prod_43", quantity: 1, unitPrice: 32.00, totalPrice: 32.00 },
    ],
  },
  {
    id: "inv_doc_4",
    supplierId: "sup_1",
    invoiceNumber: "HS-2026-03998",
    date: "2026-03-01",
    totalAmount: 892.00,
    status: "paid",
    createdAt: "2026-03-01",
    lineItems: [
      { id: "li_18", productId: "prod_2", quantity: 8, unitPrice: 38.00, totalPrice: 304.00 },
      { id: "li_19", productId: "prod_12", quantity: 4, unitPrice: 55.00, totalPrice: 220.00 },
      { id: "li_20", productId: "prod_16", quantity: 10, unitPrice: 18.50, totalPrice: 185.00 },
      { id: "li_21", productId: "prod_34", quantity: 3, unitPrice: 22.00, totalPrice: 66.00 },
      { id: "li_22", productId: "prod_35", quantity: 2, unitPrice: 58.00, totalPrice: 116.00 },
    ],
  },
  {
    id: "inv_doc_5",
    supplierId: "sup_2",
    invoiceNumber: "PD-2026-87445",
    date: "2026-02-20",
    totalAmount: 638.00,
    status: "paid",
    createdAt: "2026-02-20",
    lineItems: [
      { id: "li_23", productId: "prod_6", quantity: 3, unitPrice: 78.50, totalPrice: 235.50 },
      { id: "li_24", productId: "prod_10", quantity: 6, unitPrice: 28.50, totalPrice: 171.00 },
      { id: "li_25", productId: "prod_17", quantity: 3, unitPrice: 45.00, totalPrice: 135.00 },
      { id: "li_26", productId: "prod_38", quantity: 2, unitPrice: 38.00, totalPrice: 76.00 },
    ],
  },
  {
    id: "inv_doc_6",
    supplierId: "sup_1",
    invoiceNumber: "HS-2026-03421",
    date: "2026-02-10",
    totalAmount: 1034.00,
    status: "paid",
    createdAt: "2026-02-10",
    lineItems: [
      { id: "li_27", productId: "prod_5", quantity: 4, unitPrice: 125.00, totalPrice: 500.00 },
      { id: "li_28", productId: "prod_25", quantity: 6, unitPrice: 14.50, totalPrice: 87.00 },
      { id: "li_29", productId: "prod_26", quantity: 10, unitPrice: 12.00, totalPrice: 120.00 },
      { id: "li_30", productId: "prod_36", quantity: 2, unitPrice: 75.00, totalPrice: 150.00 },
      { id: "li_31", productId: "prod_39", quantity: 2, unitPrice: 65.00, totalPrice: 130.00 },
      { id: "li_32", productId: "prod_42", quantity: 6, unitPrice: 8.00, totalPrice: 48.00 },
    ],
  },
  {
    id: "inv_doc_7",
    supplierId: "sup_3",
    invoiceNumber: "BD-2026-54320",
    date: "2026-01-28",
    totalAmount: 376.00,
    status: "paid",
    createdAt: "2026-01-28",
    lineItems: [
      { id: "li_33", productId: "prod_14", quantity: 4, unitPrice: 47.00, totalPrice: 188.00 },
      { id: "li_34", productId: "prod_37", quantity: 3, unitPrice: 42.00, totalPrice: 126.00 },
      { id: "li_35", productId: "prod_40", quantity: 1, unitPrice: 45.00, totalPrice: 45.00 },
    ],
  },
  {
    id: "inv_doc_8",
    supplierId: "sup_1",
    invoiceNumber: "HS-2026-02912",
    date: "2026-01-15",
    totalAmount: 755.00,
    status: "paid",
    createdAt: "2026-01-15",
    lineItems: [
      { id: "li_36", productId: "prod_3", quantity: 5, unitPrice: 55.00, totalPrice: 275.00 },
      { id: "li_37", productId: "prod_7", quantity: 4, unitPrice: 65.00, totalPrice: 260.00 },
      { id: "li_38", productId: "prod_45", quantity: 3, unitPrice: 28.00, totalPrice: 84.00 },
      { id: "li_39", productId: "prod_20", quantity: 6, unitPrice: 22.00, totalPrice: 132.00 },
    ],
  },
];

// ── Alerts ──
export const alerts: Alert[] = [
  {
    id: "alert_1",
    type: "low_stock",
    severity: "critical",
    productId: "prod_17",
    message: "Finishing Bur Set is out of stock in Operatory 2",
    createdAt: "2026-04-05T08:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_2",
    type: "low_stock",
    severity: "critical",
    productId: "prod_32",
    message: "CaviWipes Disinfectant is out of stock in Operatory 2",
    createdAt: "2026-04-05T08:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_3",
    type: "expiring",
    severity: "critical",
    productId: "prod_13",
    message: "Mepivacaine 3% (lot MEP-1B) expires in 3 days",
    createdAt: "2026-04-05T07:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_4",
    type: "expiring",
    severity: "warning",
    productId: "prod_10",
    message: "Jeltrate Plus (lot JP-720) expires in 10 days",
    createdAt: "2026-04-05T07:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_5",
    type: "low_stock",
    severity: "warning",
    productId: "prod_3",
    message: "Tetric EvoCeram is below reorder threshold in Operatory 1",
    createdAt: "2026-04-04T14:00:00Z",
    acknowledged: true,
    dismissed: false,
  },
  {
    id: "alert_6",
    type: "low_stock",
    severity: "warning",
    productId: "prod_13",
    message: "Mepivacaine 3% is below reorder threshold in Operatory 3",
    createdAt: "2026-04-04T10:00:00Z",
    acknowledged: true,
    dismissed: false,
  },
  {
    id: "alert_7",
    type: "restock",
    severity: "info",
    productId: "prod_5",
    message: "RelyX Unicem 2 restock order suggested — only 4 units remaining",
    createdAt: "2026-04-03T09:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_8",
    type: "expired",
    severity: "critical",
    productId: "prod_32",
    message: "CaviWipes (lot CW-43A) expired on Mar 1 — dispose immediately",
    createdAt: "2026-03-01T08:00:00Z",
    acknowledged: true,
    dismissed: false,
  },
  {
    id: "alert_9",
    type: "low_stock",
    severity: "warning",
    productId: "prod_40",
    message: "Hemostatic Gel is below reorder threshold in Operatory 1",
    createdAt: "2026-04-02T11:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
  {
    id: "alert_10",
    type: "expiring",
    severity: "warning",
    productId: "prod_5",
    message: "RelyX Unicem 2 (lot RU2-M3) expires in 25 days",
    createdAt: "2026-04-01T07:00:00Z",
    acknowledged: false,
    dismissed: false,
  },
];

// ── Alert Rules ──
export const alertRules: AlertRule[] = products.slice(0, 15).map((p, i) => ({
  id: `rule_${i + 1}`,
  productId: p.id,
  lowStockThreshold: p.category === "ppe" ? 5 : p.category === "anesthetics" ? 3 : 2,
  expirationWarningDays: 30,
  emailNotification: true,
  pushNotification: i < 5,
  digestPreference: i < 3 ? "realtime" as const : "daily" as const,
}));

// ── Helper to get product by ID ──
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSupplier(id: string): Supplier | undefined {
  return suppliers.find((s) => s.id === id);
}

export function getLocation(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}
