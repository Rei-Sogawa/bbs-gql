import { getAuth } from "../../firebase-app";

export const createAuthService = () => {
  return getAuth();
};

export type AuthService = ReturnType<typeof createAuthService>;
