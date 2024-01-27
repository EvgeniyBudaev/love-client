"use client";

import {FC, useEffect} from "react";
import {useTelegram} from "@/app/shared/hooks";

export const MainPage: FC = () => {
    const {tg, user, queryId} = useTelegram();

    useEffect(() => {
        tg?.ready();
    }, [tg]);

    return (
        <div>
            <div>Привет!</div>
            <div>User: {user?.username}</div>
            <div>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div>queryId:</div>
            <div>
                <pre>{JSON.stringify(queryId, null, 2)}</pre>
            </div>
            <div>tg.initData:</div>
            <div>
                <pre>{JSON.stringify(tg?.initData, null, 2)}</pre>
            </div>
            =============================
            <div>User: {tg?.initDataUnsafe?.user?.username}</div>
        </div>
    );
};
