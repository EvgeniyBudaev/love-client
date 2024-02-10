import { FC, useMemo } from "react";
import type { TProfileByTelegramId } from "@/app/api/profile/byTelegramId";
import { NavLink } from "@/app/shared/components/navLink";
import { ERoutes } from "@/app/shared/enums";
import { useProxyUrl } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Avatar } from "@/app/uikit/components/avatar";
import { Icon } from "@/app/uikit/components/icon";

import "./Footer.scss";

type TProps = {
  profile?: TProfileByTelegramId;
};

export const Footer: FC<TProps> = ({ profile }) => {
  const { proxyUrl } = useProxyUrl();
  const rootURL = useMemo(() => {
    return `/ru?profileId=${profile?.id.toString()}&telegramId=${profile?.telegram.telegramId.toString()}`;
  }, [profile?.id, profile?.telegram.telegramId]);

  if (!profile) return null;

  return (
    <div className="Footer">
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
    </div>
  );
};
