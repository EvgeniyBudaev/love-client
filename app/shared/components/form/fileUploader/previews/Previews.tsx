"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import Image from "next/image";
import type { FC } from "react";
import type { Accept, DropEvent, FileRejection } from "react-dropzone";
// import { useTranslation } from "@/app/i18n/client";
import type { TFile } from "@/app/shared/types/file";
import { Dropzone } from "@/app/uikit/components/dropzone";
import type { TDropzoneProps } from "@/app/uikit/components/dropzone/Dropzone";
import { Icon } from "@/app/uikit/components/icon";
// import { Tooltip } from "@/app/uikit/components/tooltip";
import "./Previews.scss";

type TProps = {
  accept?: Accept;
  className?: string;
  files?: TFile[];
  isLoading?: boolean;
  onAddFile?: (file: TFile) => void;
  onDeleteFile?: (file: TFile) => void;
  onDrop?: (
    addedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
  onLoad?: (file: TFile) => void;
} & TDropzoneProps;

export const Previews: FC<TProps> = ({
  accept,
  className,
  files,
  isLoading,
  onAddFile,
  onDeleteFile,
  onDrop,
  onLoad,
  ...rest
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

  return (
    <aside className={clsx("Previews", className)}>
      {renderThumbs}
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        disabled={isLoading}
        className={clsx("FileUploader-Dropzone", {
          ["FileUploader-Dropzone__isLoading"]: isLoading,
        })}
        {...rest}
      >
        <Icon type="AddCircleOutline" />
      </Dropzone>
    </aside>
  );
};
