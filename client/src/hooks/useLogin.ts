import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useLogIn = () => {
  const login = ({ email, password }: { email: string; password: string }) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };
  return login;
};
