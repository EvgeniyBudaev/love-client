import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { ERoutes } from "@/app/shared/enums";
import { Avatar } from "@/app/uikit/components/avatar";
import { createPath } from "@/app/shared/utils";
import "./Header.scss";

export const Header: FC = () => {
  return (
    <div className="Header">
      <div className="Header-Empty" />
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
          <Avatar
            size={46}
            image="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
          />
        </Link>
      </div>
    </div>
  );
};
