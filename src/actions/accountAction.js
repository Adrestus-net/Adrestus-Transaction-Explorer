import axios from "axios";

export const getTotalAccountBalanceByAddressZone = async (addressZone) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/TotalAccountBalanceByAddressZone/${addressZone}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAccountByAddress = async (address) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/explorer/account/${address}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAccount = async (credentials) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/auth/register`,
      credentials
    );
    if (response) return true;
  } catch (error) {
    throw new Error("Registeration Failed");
  }
};

export const authenticate = async (credentials) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/auth/authenticate`,
      credentials
    );

    const { token, expiration } = response.data;
    return { token, expiration };
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export const refreshToken = async (resfreshToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/auth/refreshtoken`,
      { resfreshToken }
    );
    const { token, expiration } = response.data;
    return { token, expiration };
  } catch (error) {
    throw new Error("Token refresh failed");
  }
};

export async function getUserToken() {
  await registerAccount({
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  });

  const { token, expiration } = await authenticate({
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  });

  return { token, expiration };
}
