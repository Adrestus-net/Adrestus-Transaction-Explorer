import {
  useContext,
  useCallback,
  createContext,
  useState,
  useEffect,
} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { authenticate, registerAccount } from "../actions/accountAction";

const defaultVal = {
  blocks: [],
  transactions: [],
};

export const WebSocketContext = createContext(defaultVal);

export default function useWebSocket() {
  return useContext(WebSocketContext);
}

export const WebScoketProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [block, setBlock] = useState();
  const [transaction, setTransaction] = useState([]);

  const appendBlock = useCallback(
    (block) => {
      if (!block) return;
      setBlocks([block, ...blocks].slice(0, 10));
    },
    [blocks]
  );

  const appendTransaction = useCallback(
    (transaction) => {
      transaction.map((each) => {
        setTransactions([each, ...transactions].slice(0, 10));
      });
    },
    [transactions]
  );

  useEffect(() => {
    appendTransaction(transaction);
  }, [transaction]);

  useEffect(() => {
    appendBlock(block);
  }, [block]);

  useEffect(() => {
    const fetchData = async () => {
      await registerAccount({
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      });

      const { token, expiration } = await authenticate({
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      });

      let sock = new SockJS(
        `${process.env.REACT_APP_SERVER}/websocket-explorer`
      );
      let stompClient = Stomp.over(sock);

      stompClient.connect(
        {
          Authorization: `Bearer ${token}`,
        },
        (frame) => {
          console.log("frame:", frame);
          stompClient.subscribe("/topic/transactions", (message) => {
            console.log(message.body);
            setTransaction(JSON.parse(message.body));
          });
          stompClient.subscribe("/topic/blocks", (message) => {
            setBlock(JSON.parse(message.body));
          });
        }
      );

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect();
        }
      };
    };
    fetchData();
  }, []);

  return (
    <WebSocketContext.Provider value={{ blocks, transactions }}>
      {children}
    </WebSocketContext.Provider>
  );
};
