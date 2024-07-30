import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextType {
  userState: 'idle' | 'filter' | 'ordered' | 'finished' | 'menu';
  setUserState: React.Dispatch<React.SetStateAction<UserContextType['userState']>>;
}

const UserContext = createContext<UserContextType|undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, setUserState] = useState('idle' as UserContextType['userState']);

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
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