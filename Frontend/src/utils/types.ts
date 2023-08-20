export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  User = "User",
}

export interface Visit {
  id: string;
  code: number;
  startDate: string;
  durationInMinutes: number;
  status: VisitStatus;
  ownerId: string;
}

export enum VisitStatus {
  NOT_STARTED,
  STARTED,
  ENDED,
  CANCELED,
}
