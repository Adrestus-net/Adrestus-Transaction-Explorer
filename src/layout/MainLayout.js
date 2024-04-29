import { useCallback, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import BlockBoard from "./BlockBoard";
import Dashboard from "./Dashboard";
import TxBoard from "./TxBoard";

import { useAccessToken } from "../hooks/useAccessToken";
import { authenticate, registerAccount } from "../actions/accountAction";

const MainLayout = () => {
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
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
  });

  return (
    <>
      <div className="max-w-[1408px] min-w-[343px] w-full flex flex-col justify-between items-center px-5 mx-auto">
        <Dashboard />
      </div>
      <div className="w-full max-w-[1408px] min-w-[343px] px-5 mx-auto pb-6 block">
        <div className="w-full flex flex-row items-center justify-between">
          <BlockBoard blocks={blocks} />
          <TxBoard transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
