import { getBlockByHash } from "./blockAction";
import {
  GetTransactionsByBlockHash,
  getTransactionByHash,
} from "./transactionAction";

export const searchAction = async (value) => {
  const blockResult = await getBlockByHash(value);
  if (blockResult) return "block";

  const txBlockResult = await GetTransactionsByBlockHash(value);
  if (txBlockResult) return "txBlock";

  const txHashResult = await getTransactionByHash(value);
  if (txHashResult) return "txHash";

  return "None";
};
