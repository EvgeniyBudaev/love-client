import { signOut } from "next-auth/react";
import { type FC, useEffect, useMemo } from "react";
import type { TProfileByTelegramId } from "@/app/api/profile/byTelegramId";
import { NavLink } from "@/app/shared/components/navLink";
import { ERoutes } from "@/app/shared/enums";
import { useProxyUrl, useSessionNext } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Avatar } from "@/app/uikit/components/avatar";
import { Icon } from "@/app/uikit/components/icon";
import { notify } from "@/app/uikit/components/toast/utils";
import "./Footer.scss";

type TProps = {
  profile?: TProfileByTelegramId;
};

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (error) {
    notify.error({ title: error as string });
  }
}

export const Footer: FC<TProps> = ({ profile }) => {
  const { proxyUrl } = useProxyUrl();
  const { data: session, status } = useSessionNext();
  const isSession = Boolean(session);

  const rootURL = useMemo(() => {
    return `/ru?profileId=${profile?.id.toString()}&telegramId=${profile?.telegram.telegramId.toString()}`;
  }, [profile?.id, profile?.telegram.telegramId]);

  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  const handleLogout = () => {
    keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
  };

  return (
    <div className="Footer">
      {isSession && (
        <div className="Footer-Item" onClick={handleLogout}>
          <Icon type="Exit" />
        </div>
      )}
      {isSession && profile && (
        <>
          <div className="Footer-Item">
            <NavLink activeClassName="Footer-Link__isActive" href={rootURL}>
              <Icon type="Search" />
            </NavLink>
          </div>
          <div className="Footer-Item">
            <NavLink
              activeClassName="Footer-Link__isActive"
              href={createPath({
                route: ERoutes.Profile,
                params: { id: profile?.id },
              })}
            >
              <div className="Footer-Avatar">
                <Avatar size={32} image={`${proxyUrl}${profile?.image.url}`} />
              </div>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};
