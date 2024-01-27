import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { Avatar } from "@/app/uikit/components/avatar";
import "./Header.scss";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";

export const Header: FC = () => {
  return (
    <div className="Header">
      <div />
      <div>
        <Link
          href={createPath({
            route: ERoutes.Root,
          })}
        >
          <Image
            className="Header-Logo"
            src="/assets/images/logo.png"
            alt="Logo"
            height={50}
            width={200}
          />
        </Link>
      </div>
      <div>
        <Link
          href={createPath({
            route: ERoutes.Profile,
          })}
        >
          <Avatar size={46} user="U" />
        </Link>
      </div>
    </div>
  );
};
