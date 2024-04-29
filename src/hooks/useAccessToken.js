import { useEffect, useState } from "react";

import { refreshToken } from "../actions/accountAction";
import { clearInterval } from "stompjs";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState(null);

  useEffect(() => {
    let refreshInterval;

    async function getAccessToken() {
      if (!accessToken || Date.now() > tokenExpiresAt) {
        try {
          const { token: newToken, expiration } = await refreshToken();
          setAccessToken(newToken);
          setTokenExpiresAt(expiration);
        } catch (error) {
          console.error("Error Refreshing Token:", error);
        }
      }
    }

    getAccessToken();

    refreshInterval = setInterval(getAccessToken, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [accessToken, tokenExpiresAt]);

  return accessToken;
}
