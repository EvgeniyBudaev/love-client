"use client";

import {Telegram} from "@twa-dev/types";
import {useEffect} from "react";

declare global {
    interface Window {
        Telegram: Telegram;
    }
}

export const useTelegram = () => {
    const tg =
        // @ts-ignore
        (typeof window !== "undefined" ? window?.Telegram?.WebApp : undefined) ??
        undefined;
    if (typeof window !== "undefined") {
        window?.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
    }

    useEffect(() => {
        tg?.ready();
    }, [tg]);

    return {
        tg,
        user: tg?.initDataUnsafe?.user,
        queryId: tg?.initDataUnsafe?.query_id,
    };
};
