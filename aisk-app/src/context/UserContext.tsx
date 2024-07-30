import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextType {
  user: number;
  order: number;
  setUser: (user: number) => void;
  setOrder: (order: number) => void;
}

const UserContext = createContext<UserContextType|undefined>(undefined);


const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(0);
    const [order, setOrder] = useState(0);

    return (
        <UserContext.Provider value={{ user, setUser, order, setOrder }}>
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