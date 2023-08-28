import { createContext, useContext, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { LOCAL_STORAGE_KEYS } from '@/constants';

interface UserContextValue {
  isOnboarded: boolean;
  setIsOnboarded: () => void;
}

const initialUser: UserContextValue = {
  isOnboarded: getLocalStorage(LOCAL_STORAGE_KEYS.ONBOARDED),
  setIsOnboarded: () => {},
};

const UserContext = createContext(initialUser);

export const useUser = () => useContext(UserContext);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(
    initialUser.isOnboarded
  );

  const contextValue: UserContextValue = {
    isOnboarded,
    setIsOnboarded: () => {
      setLocalStorage(LOCAL_STORAGE_KEYS.ONBOARDED, true);
      setIsOnboarded(true);
    },
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
