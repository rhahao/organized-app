import { getAuth, signOut } from 'firebase/auth';

export const userSignOut = async () => {
  const auth = await getAuth();
  await signOut(auth);
};

export const currentAuthUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
};
