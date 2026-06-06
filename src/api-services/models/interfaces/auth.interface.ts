export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    shift: string;
    profileAvatar: string | null;
  };
}

export interface LoginResponse {
  status: number;
  message: string;
  data: LoginResponseData;
  meta: any;
}

export interface ApiError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  errors?: { property: string; errors: string[] }[];
}
