import { createContext, useEffect, useState, type ReactNode, useContext, useCallback } from "react";
import { type UserDTO } from "../Features/User/UserSlice";
import { axiosClient } from "./AxiosClient";
import type { SellerDTO } from "../Features/Seller/Create/CreateSellerSlice";
import type { BuyerDTO } from "../Features/Buyer/Create/CreateBuyerSlice";

interface AppContextType {
  connectedUser: UserDTO | null | undefined;
  connectedSellerOrBuyer: SellerDTO | BuyerDTO | null | undefined;
  refreshUser: () => Promise<UserDTO>;
  getSellerOrBuyer: (UserId: number, role: string) => Promise<SellerDTO | BuyerDTO | null>;
}

export const AppContextContainer = createContext<AppContextType>({
  connectedUser: null,
  connectedSellerOrBuyer: null,
  refreshUser: async () => Promise.resolve({} as UserDTO),
  getSellerOrBuyer: async (UserId: number, role: string) => Promise.resolve(null),
});


interface AppContextProps {
  children: ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  const [connectedUser, setConnectedUser] = useState<UserDTO | null | undefined>(undefined);
  const [connectedSellerOrBuyer, setconnectedSellerOrBuyer] = useState<SellerDTO |BuyerDTO |null | undefined>(undefined);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await axiosClient.get("/user/connected");
      setConnectedUser(data.data);
      return data.data
    } catch (error) {
      setConnectedUser(null);
    }
  }, []); 

   const getSellerOrBuyer = useCallback(async (UserId:number,role:string) => {
    try {
      const { data } = await axiosClient.get(`/${role}/get?id=${UserId}`);
      console.log(`/${role}/get?id=${UserId}`,data);
      
      setconnectedSellerOrBuyer(data);
      return data.data
    } catch (error) {
      setconnectedSellerOrBuyer(null);
    }
  }, []); 

  useEffect(() => {
    refreshUser().then((data)=>{
      if(data.role == 1){
          getSellerOrBuyer(data.id,"seller")
      }else if(data.role == 2) {
        getSellerOrBuyer(data.id,"buyer")
      }
    }).catch(r=>console.log(r)
    );
  }, [refreshUser]); 

  return (
    <AppContextContainer.Provider value={{ connectedUser, refreshUser,connectedSellerOrBuyer,getSellerOrBuyer }}>
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

