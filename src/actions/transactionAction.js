import axios from "axios";

export const getTransactionByHash = async (hash) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/transaction/${hash}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetTransactionsByFromAddress = async (fromAddress) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/transactionsByFromAddress/${fromAddress}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetTransactionsByBlockHash = async (blockHash) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/transactionsByHash/${blockHash}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAllTransactionsBetweenRange = async (
  currentPage,
  txPerPage
) => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_SERVER
      }/api/v1/explorer/findAllTransactionsBetweenRange/${
        currentPage * txPerPage
      }/${txPerPage}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
