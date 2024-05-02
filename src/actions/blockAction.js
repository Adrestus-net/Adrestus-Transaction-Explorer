import axios from "axios";

export const getBlockByHash = async (hash) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/block/${hash}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAllBlocksBetweenRange = async (currentPage, blockPerPage) => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_SERVER
      }/api/v1/explorer/findAllBlocksBetweenRange/${
        currentPage * blockPerPage
      }/${blockPerPage}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTxNumberPerBlock = async (block) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/transactionsByHash/${block}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
