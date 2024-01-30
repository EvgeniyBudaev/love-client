import { useCallback, useEffect } from "react";
import type { TFileUploaderProps } from "@/app/shared/components/form/fileUploader";
import type { TFile } from "@/app/shared/types/file";

type TResponse = {
  onAddFiles: TFileUploaderProps["onAddFiles"];
  onDeleteFile: TFileUploaderProps["onDeleteFile"];
  // fetcherFilesLoading: boolean;
};

type TUseFilesParams = {
  fieldName: string;
  files?: TFile[];
  setValue: any;
};

type TUseImages = (params: TUseFilesParams) => TResponse;

export const useFiles: TUseImages = ({ fieldName, files, setValue }) => {
  // const fetcherFilesLoading = fetcherFiles.state !== "idle";

  const onAddFiles = useCallback(
    (acceptedFiles: TFile[]) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        setValue(
          fieldName,
          files ? [...files, ...acceptedFiles] : [...acceptedFiles],
        );
      }
    },
    [
      // fetcherFiles,
      setValue,
      files,
    ],
  );

  const onDeleteFile = useCallback(
    (deletedFile: TFile) => {
      if (files) {
        setValue(
          fieldName,
          files.filter(
            (image: TFile) =>
              image.name !== deletedFile.name &&
              image.size !== deletedFile.size,
          ),
        );
      }
    },
    [setValue, files],
  );

  useEffect(
    () => {
      if (
        true
        // fetcherFiles.data && fetcherFiles.type === "done"
      ) {
        // const { name, id, size } = fetcherFiles.data;

        if (files) {
          setValue(
            fieldName,
            files.map((image: TFile) => {
              // if (image.name === name && image.size === size) {
              //   image.id = id;
              // }

              return image;
            }),
          );
        }
      }
      // Нужно, чтобы поймать только момент, когда пришел ответ от сервера и записать данные в поле
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      // fetcherFiles.data, fetcherFiles.type
    ],
  );

  return {
    onAddFiles,
    onDeleteFile,
    // fetcherFilesLoading,
  };
};
