export interface LoginRequest {
  username: string;
  password: string;
}

export interface StaffData {
  id: number;
  name: string;
  status: string;
  isSuperAdmin: boolean;
  hubId: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface ProfileResponse {
  token: string;
  id: number;
  email: string;
  status: string;
  lastLogin: string | null;
  lockedAt: string | null;
  phone: string | null;
  hubId: number;
  createdAt: string;
  updatedAt: string;
  staff: StaffData | null;
  parents: unknown[];
  teacher: unknown | null;
}

export interface AuthState {
  token: string;
  userName: string;
  expireTime: string; // ISO UTC timestamp
}
