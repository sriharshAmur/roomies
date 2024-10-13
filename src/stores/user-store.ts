import { UserRole } from '@/types';
import { createStore } from 'zustand/vanilla';

export type UserState = {
  userRole: UserRole;
};

export type UserActions = {
  setUserRole: (role: UserRole) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userRole: 'tenant',
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUserRole: (role) => set(() => ({ userRole: role })),
  }));
};
