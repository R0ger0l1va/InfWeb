"use client";

import { useEffect } from "react";
import apiClient from "../data/api/api-client";

export default function KeepAlive() {
  useEffect(() => {
    // Ping API immediately on mount
    const pingApi = async () => {
      try {
        await apiClient.get("/");
        console.log("Orky API Ping successful");
      } catch (error) {
        console.error("Orky API Ping failed", error);
      }
    };

    pingApi();

    // Ping every 5 minutes (300,000 ms)
    const interval = setInterval(pingApi, 300000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
