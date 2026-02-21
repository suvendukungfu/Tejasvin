// ─── Hidden Heritage – Admin Command Center Types ───

export type UserRole = 'explorer' | 'specialist' | 'admin';

export interface HHUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verifiedSpecialist: boolean;
  joinedAt: string;
  expeditionsCompleted: number;
  avatar?: string;
}

export interface Sector {
  id: string;
  name: string;
  region: string;
  heritageSites: string[];
  status: 'active' | 'surveying' | 'restricted' | 'archived';
  discoveredAt: string;
  coordinatorId: string;
}

export interface Mission {
  id: string;
  title: string;
  explorerId: string;
  explorerName: string;
  location: string;
  sectorId: string;
  status: 'active' | 'completed' | 'pending' | 'aborted';
  verificationLevel: 'unverified' | 'field-verified' | 'expert-verified' | 'certified';
  startedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface FieldReport {
  id: string;
  missionId: string;
  explorerName: string;
  location: string;
  summary: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface FinancialRecord {
  id: string;
  type: 'funding' | 'expedition_cost' | 'payout' | 'donation';
  amount: number;
  currency: string;
  sectorName: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface DashboardStats {
  totalHeritageSites: number;
  activeExpeditions: number;
  verifiedSpecialists: number;
  totalFunding: number;
  sitesDiscoveredThisMonth: number;
  pendingVerifications: number;
}

export interface MonthlyTrend {
  month: string;
  expeditions: number;
  discoveries: number;
  funding: number;
}

export interface SectorDistribution {
  name: string;
  sites: number;
  color: string;
}

// ─── Future-Ready Placeholder Types ───

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface RelicModel {
  id: string;
  name: string;
  modelUrl: string;
  siteId: string;
  description: string;
}
