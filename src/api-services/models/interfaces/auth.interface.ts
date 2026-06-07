export interface SignInRequest {
  email: string;
  password: string;
}

export type LoginRequest = SignInRequest;

export interface LoginResponseData {
  access_token: string;
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    shift: string;
    profileAvatar: string | null;
  };
}

export interface SignInResponse {
  status: number;
  message: string;
  data: LoginResponseData;
  meta: unknown;
}

export type LoginResponse = SignInResponse;

export interface ApiError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  errors?: { property: string; errors: string[] }[];
}
