"use client";

import { type FC, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { addProfileAction } from "@/app/actions/profile/add/AddProfileAction";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { Section } from "@/app/shared/components/section";
import { Container } from "@/app/shared/components/container";
import { FileUploader } from "@/app/shared/components/form/fileUploader";
import { useFiles } from "@/app/shared/hooks";
import type { TFile } from "@/app/shared/types/file";
import { Input } from "@/app/uikit/components/input";
import { Textarea } from "@/app/uikit/components/textarea";
import "./ProfileAddPage.scss";

export const ProfileAddPage: FC = () => {
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  const [files, setFiles] = useState<TFile[] | null>(null);
  const [state, formAction] = useFormState(addProfileAction, initialState);

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EFormFields.Image,
    files: files ?? [],
    setValue: (fieldName: string, files: TFile[]) => setFiles(files),
  });

  useEffect(() => {
    console.log("files: ", files);
  }, [files]);

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    const displayName = formData.get(EFormFields.DisplayName);
    const description = formData.get(EFormFields.Description);
    formDataDto.append(EFormFields.DisplayName, (displayName ?? "").toString());
    formDataDto.append(EFormFields.Description, (description ?? "").toString());
    (files ?? []).forEach((file) => {
      formDataDto.append(EFormFields.Image, file);
    });
    formAction(formDataDto);
  };

  return (
    <div className="ProfileAddPage">
      <form action={handleSubmit} className="ProfileAddPage-Form">
        <Container>
          <div className="ProfileAddPage-Header">
            <div className="ProfileAddPage-Header-Cancel">Отменить</div>
            <button className="ProfileAddPage-Header-Save" type="submit">
              Сохранить
            </button>
          </div>
        </Container>
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
            errors={state?.errors?.displayName}
            isRequired={true}
            label={"Имя" ?? "Name"}
            name={EFormFields.DisplayName}
            type="text"
          />
          <Textarea
            errors={state?.errors?.description}
            label={"Описание" ?? "Description"}
            name={EFormFields.Description}
            type="text"
          />
        </Section>
        <Section title="Свойства"></Section>
      </form>
    </div>
  );
};
