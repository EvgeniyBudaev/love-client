"use client";

import { Telegram } from "@twa-dev/types";
import { useEffect } from "react";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export const useTelegram = () => {
  console.log("window?.Telegram: ", window?.Telegram);
  window?.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
  const tg = window?.Telegram?.WebApp;

  useEffect(() => {
    tg?.ready();
  }, [tg]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  };
};
