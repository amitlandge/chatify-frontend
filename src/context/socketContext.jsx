import { createContext, useMemo } from "react";
import { io } from "socket.io-client";
import { server } from "../utils/config";
const SocketContext = createContext();

const SocketProvider = (prop) => {
  const socket = useMemo(() => {
    return io(server, { withCredentials: true });
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      {prop.children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
