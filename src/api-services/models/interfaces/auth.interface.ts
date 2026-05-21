export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    shift?: string;
    profileAvatar?: string | null;
  };
}
