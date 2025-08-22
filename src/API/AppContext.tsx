import { createContext, useEffect, useState, type ReactNode, useContext, useCallback } from "react";
import { type UserDTO } from "../Features/User/UserSlice";
import { axiosClient } from "./AxiosClient";

interface AppContextType {
  connectedUser: UserDTO | null | undefined;
  refreshUser: () => Promise<void>;
}

export const AppContextContainer = createContext<AppContextType>({
  connectedUser: null,
  refreshUser: async () => {},
});

interface AppContextProps {
  children: ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  const [connectedUser, setConnectedUser] = useState<UserDTO | null | undefined>(undefined);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await axiosClient.get("/user/connected");
      setConnectedUser(data.data);
    } catch (error) {
      setConnectedUser(null);
    }
  }, []); 

  useEffect(() => {
    refreshUser();
  }, [refreshUser]); 

  return (
    <AppContextContainer.Provider value={{ connectedUser, refreshUser }}>
      {children}
    </AppContextContainer.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContextContainer);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}