import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Store } from '../type/store';

interface UserContextType {
  userState: 'idle' | 'filter' | 'ordered' | 'finished' | 'menu';
  setUserState: React.Dispatch<React.SetStateAction<UserContextType['userState']>>;
  userStore: Store;
  setUserStore: React.Dispatch<React.SetStateAction<Store>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContextType|undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, setUserState] = useState('idle' as UserContextType['userState']);
    const [userStore, setUserStore] = useState({} as Store);
    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <UserContext.Provider value={{ userState, setUserState, userStore, setUserStore, totalAmount, setTotalAmount}}>
          {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, UserContext };