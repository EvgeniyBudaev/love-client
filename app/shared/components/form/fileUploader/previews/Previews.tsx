"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import Image from "next/image";
import type { FC } from "react";
// import { useTranslation } from "@/app/i18n/client";
import { TFile } from "@/app/shared/types/file";
import { Icon } from "@/app/uikit/components/icon";
// import { Tooltip } from "@/app/uikit/components/tooltip";
import "./Previews.scss";

type TProps = {
  className?: string;
  files?: TFile[];
  onAddFile?: (file: TFile) => void;
  onDeleteFile?: (file: TFile) => void;
  onLoad?: (file: TFile) => void;
};

export const Previews: FC<TProps> = ({
  className,
  files,
  onAddFile,
  onDeleteFile,
  onLoad,
}) => {
  // const { t } = useTranslation("index");
  const renderThumbs =
    !isNil(files) &&
    files.map((file) => (
      <div
        className="Previews-Thumb"
        key={file?.name || "" + file?.lastModified}
      >
        <div className="Previews-Thumb-Inner">
          {!isNil(file.preview) && (
            <Image
              alt={file.name}
              className="Previews-Thumb-Image"
              fill={true}
              priority={true}
              sizes="100vw"
              src={file.preview}
              quality={100}
            />
          )}
        </div>
      </div>
    ));

  return <aside className={clsx("Previews", className)}>{renderThumbs}</aside>;
};
