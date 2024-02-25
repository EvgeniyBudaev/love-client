import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type FC, useEffect, useMemo } from "react";
import type { TProfileByKeycloakId } from "@/app/api/profile/byKeycloakId";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { DEFAULT_DISTANCE } from "@/app/shared/constants/distance";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_LOOKING_FOR,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants/filter";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/app/shared/constants/pagination";
import { ERoutes } from "@/app/shared/enums";
import { useProxyUrl, useSessionNext } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Avatar } from "@/app/uikit/components/avatar";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Icon } from "@/app/uikit/components/icon";
import { notify } from "@/app/uikit/components/toast/utils";
import "./Footer.scss";

type TProps = {
  lng: string;
  profile?: TProfileByKeycloakId;
};

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (error) {
    notify.error({ title: error as string });
  }
}

export const Footer: FC<TProps> = ({ lng, profile }) => {
  const pathname = usePathname();
  const { proxyUrl } = useProxyUrl();
  const { t } = useTranslation("index");
  const { data: session, status } = useSessionNext();
  const isSession = Boolean(session);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? DEFAULT_PAGE.toString();
  const size = searchParams.get("size") ?? DEFAULT_PAGE_SIZE.toString();
  const ageFrom = searchParams.get("ageFrom") ?? DEFAULT_AGE_FROM.toString();
  const ageTo = searchParams.get("ageTo") ?? DEFAULT_AGE_TO.toString();
  const searchGender =
    searchParams.get("searchGender") ?? DEFAULT_SEARCH_GENDER;
  const lookingFor = searchParams.get("lookingFor") ?? DEFAULT_LOOKING_FOR;
  const distance = searchParams.get("distance") ?? DEFAULT_DISTANCE.toString();

  const isProfileDetailPage = useMemo(() => {
    if (!profile?.id) return false;
    const path = createPath({
      route: ERoutes.Profile,
      params: { id: profile?.id },
    });
    return pathname === `/${lng}${path}`;
  }, [lng, pathname, profile?.id]);

  const rootURL = useMemo(() => {
    return `/${lng}?page=${page}&size=${size}&ageFrom=${ageFrom}&ageTo=${ageTo}&searchGender=${searchGender}&lookingFor=${lookingFor}&profileId=${profile?.id.toString()}&distance=${distance}`;
  }, [
    ageFrom,
    ageTo,
    distance,
    lng,
    page,
    profile?.id,
    searchGender,
    lookingFor,
    size,
  ]);

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
      {isSession && profile && (
        <>
          <div className="Footer-Item">
            <NavLink activeClassName="Footer-Link__isActive" href={rootURL}>
              <Icon type="Search" />
            </NavLink>
          </div>
          <div className="Footer-Item Footer-Item-Avatar">
            <DropDown>
              <DropDown.Button>
                <div className="Footer-Avatar">
                  <Avatar
                    size={32}
                    image={`${proxyUrl}${profile?.image.url}`}
                  />
                </div>
              </DropDown.Button>
              <DropDown.Panel>
                <>
                  <div className="DropDown-Menu">
                    {!isProfileDetailPage && (
                      <Link
                        className="DropDown-MenuItem"
                        href={createPath({
                          route: ERoutes.Profile,
                          params: { id: profile?.id },
                        })}
                      >
                        {t("common.actions.profileDetail")}
                      </Link>
                    )}
                    <Link
                      className="DropDown-MenuItem"
                      href={createPath({
                        route: ERoutes.Reviews,
                      })}
                    >
                      {t("common.actions.reviews")}
                    </Link>
                    <div className="DropDown-MenuItem" onClick={handleLogout}>
                      {t("common.actions.exit")}
                    </div>
                  </div>
                  <div className="DropDown-Menu">
                    <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                      {t("common.actions.cancel")}
                    </div>
                  </div>
                </>
              </DropDown.Panel>
            </DropDown>
          </div>
        </>
      )}
    </div>
  );
};
