import type {
  HHUser,
  Sector,
  Mission,
  FieldReport,
  FinancialRecord,
  DashboardStats,
  MonthlyTrend,
  SectorDistribution,
} from '../types/admin';

// ─── Dashboard Stats ───
export const dashboardStats: DashboardStats = {
  totalHeritageSites: 247,
  activeExpeditions: 38,
  verifiedSpecialists: 64,
  totalFunding: 1_845_000,
  sitesDiscoveredThisMonth: 12,
  pendingVerifications: 19,
};

// ─── Monthly Trends ───
export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Aug', expeditions: 18, discoveries: 5, funding: 120000 },
  { month: 'Sep', expeditions: 24, discoveries: 8, funding: 185000 },
  { month: 'Oct', expeditions: 21, discoveries: 6, funding: 155000 },
  { month: 'Nov', expeditions: 30, discoveries: 11, funding: 220000 },
  { month: 'Dec', expeditions: 35, discoveries: 9, funding: 245000 },
  { month: 'Jan', expeditions: 38, discoveries: 12, funding: 280000 },
];

// ─── Sector Distribution ───
export const sectorDistribution: SectorDistribution[] = [
  { name: 'Eastern Ghats', sites: 42, color: '#00e5ff' },
  { name: 'Western Plateau', sites: 58, color: '#ffab00' },
  { name: 'Coastal Belt', sites: 35, color: '#76ff03' },
  { name: 'Northern Highlands', sites: 48, color: '#e040fb' },
  { name: 'Central Deccan', sites: 64, color: '#ff5252' },
];

// ─── Sectors ───
export const sectors: Sector[] = [
  {
    id: 'SEC-001',
    name: 'Eastern Ghats Heritage Corridor',
    region: 'Odisha – Andhra Pradesh',
    heritageSites: ['Konark Sun Temple', 'Udayagiri Caves', 'Ratnagiri Monastery', 'Lalitgiri'],
    status: 'active',
    discoveredAt: '2024-03-15',
    coordinatorId: 'USR-003',
  },
  {
    id: 'SEC-002',
    name: 'Western Plateau Archaeological Zone',
    region: 'Maharashtra – Karnataka',
    heritageSites: ['Ajanta Caves', 'Ellora Caves', 'Badami Caves', 'Pattadakal', 'Aihole'],
    status: 'active',
    discoveredAt: '2024-01-22',
    coordinatorId: 'USR-005',
  },
  {
    id: 'SEC-003',
    name: 'Coastal Belt Marine Heritage',
    region: 'Tamil Nadu – Kerala',
    heritageSites: ['Mahabalipuram', 'Tranquebar Fort', 'Bekal Fort'],
    status: 'surveying',
    discoveredAt: '2024-06-10',
    coordinatorId: 'USR-008',
  },
  {
    id: 'SEC-004',
    name: 'Northern Highlands Expedition Zone',
    region: 'Himachal Pradesh – Uttarakhand',
    heritageSites: ['Masroor Rock Cut Temple', 'Jageshwar Dham', 'Baijnath Temple', 'Katarmal Sun Temple'],
    status: 'active',
    discoveredAt: '2024-02-08',
    coordinatorId: 'USR-002',
  },
  {
    id: 'SEC-005',
    name: 'Central Deccan Forgotten Kingdoms',
    region: 'Madhya Pradesh – Chhattisgarh',
    heritageSites: ['Bhimbetka', 'Sanchi Stupa', 'Udaigiri Caves', 'Bhoramdeo Temple', 'Sirpur Ruins', 'Mandu'],
    status: 'active',
    discoveredAt: '2023-11-30',
    coordinatorId: 'USR-004',
  },
  {
    id: 'SEC-006',
    name: 'Thar Desert Frontier',
    region: 'Rajasthan',
    heritageSites: ['Kuldhara', 'Kiradu Temples'],
    status: 'restricted',
    discoveredAt: '2024-08-01',
    coordinatorId: 'USR-003',
  },
];

// ─── Users ───
export const users: HHUser[] = [
  { id: 'USR-001', name: 'Arjun Mehta', email: 'arjun@heritage.io', role: 'admin', verifiedSpecialist: true, joinedAt: '2023-06-12', expeditionsCompleted: 45 },
  { id: 'USR-002', name: 'Priya Sharma', email: 'priya@heritage.io', role: 'specialist', verifiedSpecialist: true, joinedAt: '2023-08-20', expeditionsCompleted: 32 },
  { id: 'USR-003', name: 'Vikram Singh', email: 'vikram@heritage.io', role: 'specialist', verifiedSpecialist: true, joinedAt: '2023-09-05', expeditionsCompleted: 28 },
  { id: 'USR-004', name: 'Ananya Patel', email: 'ananya@heritage.io', role: 'specialist', verifiedSpecialist: true, joinedAt: '2023-11-14', expeditionsCompleted: 19 },
  { id: 'USR-005', name: 'Rohit Deshmukh', email: 'rohit@heritage.io', role: 'specialist', verifiedSpecialist: true, joinedAt: '2024-01-10', expeditionsCompleted: 22 },
  { id: 'USR-006', name: 'Kavya Nair', email: 'kavya@heritage.io', role: 'explorer', verifiedSpecialist: false, joinedAt: '2024-02-28', expeditionsCompleted: 7 },
  { id: 'USR-007', name: 'Siddharth Rao', email: 'sid@heritage.io', role: 'explorer', verifiedSpecialist: false, joinedAt: '2024-03-15', expeditionsCompleted: 4 },
  { id: 'USR-008', name: 'Meera Iyer', email: 'meera@heritage.io', role: 'specialist', verifiedSpecialist: true, joinedAt: '2024-01-22', expeditionsCompleted: 15 },
  { id: 'USR-009', name: 'Aditya Joshi', email: 'aditya@heritage.io', role: 'explorer', verifiedSpecialist: false, joinedAt: '2024-05-01', expeditionsCompleted: 2 },
  { id: 'USR-010', name: 'Deepa Krishnan', email: 'deepa@heritage.io', role: 'explorer', verifiedSpecialist: false, joinedAt: '2024-06-18', expeditionsCompleted: 1 },
];

// ─── Missions ───
export const missions: Mission[] = [
  { id: 'MSN-001', title: 'Konark Alignment Survey', explorerId: 'USR-002', explorerName: 'Priya Sharma', location: 'Konark, Odisha', sectorId: 'SEC-001', status: 'active', verificationLevel: 'field-verified', startedAt: '2025-01-10' },
  { id: 'MSN-002', title: 'Ajanta Mural Documentation', explorerId: 'USR-005', explorerName: 'Rohit Deshmukh', location: 'Ajanta, Maharashtra', sectorId: 'SEC-002', status: 'completed', verificationLevel: 'expert-verified', startedAt: '2024-11-20', completedAt: '2025-01-05' },
  { id: 'MSN-003', title: 'Mahabalipuram Coastal Erosion Study', explorerId: 'USR-008', explorerName: 'Meera Iyer', location: 'Mahabalipuram, TN', sectorId: 'SEC-003', status: 'active', verificationLevel: 'unverified', startedAt: '2025-01-15' },
  { id: 'MSN-004', title: 'Bhimbetka Rock Art Cataloging', explorerId: 'USR-004', explorerName: 'Ananya Patel', location: 'Bhimbetka, MP', sectorId: 'SEC-005', status: 'pending', verificationLevel: 'unverified', startedAt: '2025-02-01' },
  { id: 'MSN-005', title: 'Masroor Temple 3D Scan', explorerId: 'USR-003', explorerName: 'Vikram Singh', location: 'Masroor, HP', sectorId: 'SEC-004', status: 'active', verificationLevel: 'field-verified', startedAt: '2025-01-22' },
  { id: 'MSN-006', title: 'Kuldhara Ghost Village Recon', explorerId: 'USR-006', explorerName: 'Kavya Nair', location: 'Kuldhara, Rajasthan', sectorId: 'SEC-006', status: 'aborted', verificationLevel: 'unverified', startedAt: '2025-01-08', completedAt: '2025-01-12', notes: 'Access restricted by local authorities' },
  { id: 'MSN-007', title: 'Sanchi Stupa Restoration Assessment', explorerId: 'USR-004', explorerName: 'Ananya Patel', location: 'Sanchi, MP', sectorId: 'SEC-005', status: 'completed', verificationLevel: 'certified', startedAt: '2024-10-05', completedAt: '2024-12-20' },
  { id: 'MSN-008', title: 'Sirpur Bronze Age Dig', explorerId: 'USR-007', explorerName: 'Siddharth Rao', location: 'Sirpur, Chhattisgarh', sectorId: 'SEC-005', status: 'pending', verificationLevel: 'unverified', startedAt: '2025-02-10' },
];

// ─── Field Reports ───
export const fieldReports: FieldReport[] = [
  { id: 'FR-001', missionId: 'MSN-001', explorerName: 'Priya Sharma', location: 'Konark, Odisha', summary: 'Solar alignment markers identified at northeast quadrant. GPS coordinates logged for satellite verification.', timestamp: '2025-01-28T14:30:00Z', priority: 'high' },
  { id: 'FR-002', missionId: 'MSN-003', explorerName: 'Meera Iyer', location: 'Mahabalipuram, TN', summary: 'Coastal erosion rate exceeds predicted models. Urgent intervention recommended for Shore Temple perimeter.', timestamp: '2025-01-27T09:15:00Z', priority: 'critical' },
  { id: 'FR-003', missionId: 'MSN-005', explorerName: 'Vikram Singh', location: 'Masroor, HP', summary: '3D LIDAR scan 60% complete. Discovered previously unmapped underground chamber in western section.', timestamp: '2025-01-26T16:45:00Z', priority: 'high' },
  { id: 'FR-004', missionId: 'MSN-002', explorerName: 'Rohit Deshmukh', location: 'Ajanta, Maharashtra', summary: 'Final mural documentation batch submitted. 847 high-resolution captures across 29 caves.', timestamp: '2025-01-25T11:00:00Z', priority: 'medium' },
  { id: 'FR-005', missionId: 'MSN-007', explorerName: 'Ananya Patel', location: 'Sanchi, MP', summary: 'Restoration priority zones flagged. Main stupa gateway showing structural micro-fractures.', timestamp: '2025-01-24T08:30:00Z', priority: 'medium' },
];

// ─── Financial Records ───
export const financialRecords: FinancialRecord[] = [
  { id: 'FIN-001', type: 'funding', amount: 450000, currency: 'INR', sectorName: 'Central Deccan', description: 'INTACH Research Grant – Phase 2', date: '2025-01-15', status: 'completed' },
  { id: 'FIN-002', type: 'expedition_cost', amount: 85000, currency: 'INR', sectorName: 'Eastern Ghats', description: 'Konark Survey Equipment & Logistics', date: '2025-01-20', status: 'completed' },
  { id: 'FIN-003', type: 'payout', amount: 32000, currency: 'INR', sectorName: 'Western Plateau', description: 'Specialist Payout – Rohit Deshmukh (MSN-002)', date: '2025-01-22', status: 'pending' },
  { id: 'FIN-004', type: 'donation', amount: 200000, currency: 'INR', sectorName: 'Northern Highlands', description: 'Anonymous Heritage Foundation Donation', date: '2025-01-18', status: 'completed' },
  { id: 'FIN-005', type: 'expedition_cost', amount: 120000, currency: 'INR', sectorName: 'Coastal Belt', description: 'Marine Survey Scuba & Imaging Equipment', date: '2025-01-25', status: 'pending' },
  { id: 'FIN-006', type: 'funding', amount: 350000, currency: 'INR', sectorName: 'Eastern Ghats', description: 'ASI Collaborative Fund – Annual', date: '2025-01-05', status: 'completed' },
  { id: 'FIN-007', type: 'payout', amount: 28000, currency: 'INR', sectorName: 'Central Deccan', description: 'Specialist Payout – Ananya Patel (MSN-007)', date: '2025-01-28', status: 'completed' },
  { id: 'FIN-008', type: 'donation', amount: 75000, currency: 'INR', sectorName: 'Western Plateau', description: 'Cultural Ministry Micro-Grant', date: '2025-02-01', status: 'completed' },
];

// ─── Revenue by Sector (for Charts) ───
export const revenueBySector = [
  { sector: 'Eastern Ghats', revenue: 435000, expenses: 185000 },
  { sector: 'Western Plateau', revenue: 380000, expenses: 140000 },
  { sector: 'Coastal Belt', revenue: 220000, expenses: 180000 },
  { sector: 'N. Highlands', revenue: 310000, expenses: 95000 },
  { sector: 'Central Deccan', revenue: 500000, expenses: 245000 },
];
