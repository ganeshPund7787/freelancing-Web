import { useAppSelectore } from "@/App/store";
import { BACKEND_API_URL } from "@/main";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { CurrentCivilUser } = useAppSelectore((s: any) => s.user);
  const { Client } = useAppSelectore((s: any) => s.client);

  useEffect(() => {
    if (CurrentCivilUser || Client) {
      const socket = io(BACKEND_API_URL, {
        // https://freelancing-web.onrender.com
        query: {
          userId: CurrentCivilUser?._id || Client?._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [CurrentCivilUser, Client]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
