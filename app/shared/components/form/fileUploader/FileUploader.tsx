"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import type { FC, ReactElement } from "react";
// import {useTranslation} from "@/app/i18n/client";
// import {Button} from "@/app/uikit/components/button";
import {
  Dropzone,
  type TDropzoneProps,
} from "@/app/uikit/components/dropzone/Dropzone";
// import {ETypographyVariant, Typography} from "@/app/uikit/components/typography";
import "./FileUploader.scss";
import { TFile } from "@/app/shared/types/file";
import {
  filterDuplicatedFiles,
  getTypes,
} from "@/app/shared/components/form/fileUploader/utils";
import { Previews } from "@/app/shared/components/form/fileUploader/previews";
import { Icon } from "@/app/uikit/components/icon";

export type TFileUploaderProps = {
  files?: TFile[];
  Input?: ReactElement;
  isLoading?: boolean;
  maxFiles?: number;
  onAddFile?: (file: File) => void;
  onAddFiles?: (acceptedFiles: TFile[], files: TFile[]) => void;
  onDeleteFile?: (deletedFile: TFile, files: TFile[]) => void;
  type: string;
} & TDropzoneProps;

export const FileUploader: FC<TFileUploaderProps> = ({
  accept,
  files,
  Input,
  isLoading,
  maxFiles,
  onAddFile,
  onAddFiles,
  onDeleteFile,
  ...rest
}) => {
  // const {t} = useTranslation("index");
  const types = getTypes(accept);
  const [countFiles, setCountFiles] = useState(1);

  const onDrop = useCallback(
    (addedFiles: File[]) => {
      if (maxFiles && countFiles > maxFiles) return;
      const { acceptedFiles, newFiles } = filterDuplicatedFiles(
        addedFiles,
        files,
      );
      onAddFiles?.(acceptedFiles, newFiles);
      setCountFiles((prevState) => prevState + 1);
    },
    [countFiles, files, maxFiles, onAddFiles],
  );

  const onDelete = useCallback(
    (deletedFile: TFile) => {
      if (files) {
        let newFiles = [...files];
        newFiles = newFiles.filter((file) => file !== deletedFile);
        onDeleteFile?.(deletedFile, newFiles);
        setCountFiles((prevState) => prevState - 1);
      }
    },
    [onDeleteFile, files],
  );

  // useEffect(() => {
  //   if (isNil(files)) return;
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>
  //     files.forEach((file) => (file?.preview ? URL.revokeObjectURL(file.preview) : file));
  // }, [files]);

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  return (
    <div className="FileUploader">
      <Previews
        className="FileUploader-Previews"
        files={files}
        onAddFile={onAddFile}
        onDeleteFile={onDelete}
        onLoad={handleLoadImage}
      />
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
    </div>
  );
};
