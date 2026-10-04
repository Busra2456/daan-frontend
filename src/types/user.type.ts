export type UserRole = "NEEDY" | "DONOR" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  phone: string | null;
  address: string | null;
  role: UserRole;
  status: UserStatus;
  authProvider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminUser[];
}

export interface UserDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminUser;
}

export interface UpdateUserStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    updatedAt: string;
  };
}