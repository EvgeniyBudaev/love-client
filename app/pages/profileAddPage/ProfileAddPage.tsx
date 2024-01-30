"use client";

import { type FC, useEffect, useState } from "react";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { Section } from "@/app/shared/components/section";
import { Container } from "@/app/shared/components/container";
import { FileUploader } from "@/app/shared/components/form/fileUploader";
import { useFiles } from "@/app/shared/hooks";
import type { TFile } from "@/app/shared/types/file";
import { Input } from "@/app/uikit/components/input";
import "./ProfileAddPage.scss";

export const ProfileAddPage: FC = () => {
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  const [files, setFiles] = useState<TFile[] | null>(null);

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EFormFields.Image,
    files: files ?? [],
    setValue: (fieldName: string, files: TFile[]) => setFiles(files),
  });

  useEffect(() => {
    console.log("files: ", files);
  }, [files]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleSubmit = (formData: FormData) => {};

  return (
    <div className="ProfileAddPage">
      <Container>
        <div className="ProfileAddPage-Header">
          <div className="ProfileAddPage-Header-Cancel">Отменить</div>
          <div className="ProfileAddPage-Header-Save">Сохранить</div>
        </div>
      </Container>
      <form action={handleSubmit} className="ProfileAddPage-Form">
        <Section title="Публичные фото">
          <FileUploader
            accept={{
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
              "image/png": [".png"],
            }}
            files={files ?? []}
            // isLoading={fetcherFilesLoading}
            // maxFiles={4}
            // maxSize={1024 * 1024}
            multiple={false}
            name={EFormFields.Image}
            // onAddFile={handleAddFileToDefaultImage}
            onAddFiles={onAddFiles}
            onDeleteFile={handleDeleteFile}
            type="file"
          />
        </Section>
        <Section title="Подробнее">
          <Input
            // errors={state?.errors?.userName}
            isRequired={true}
            label={"Имя" ?? "Name"}
            name={EFormFields.DisplayName}
            type="text"
          />
        </Section>
      </form>
    </div>
  );
};
