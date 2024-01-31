"use client";

import {ru} from "date-fns/locale";
import {type FC, useEffect, useState} from "react";
import {useFormState} from "react-dom";
import {addProfileAction} from "@/app/actions/profile/add/AddProfileAction";
import {EFormFields} from "@/app/pages/profileAddPage/enums";
import {Section} from "@/app/shared/components/section";
import {Container} from "@/app/shared/components/container";
import {FileUploader} from "@/app/shared/components/form/fileUploader";
import {useFiles} from "@/app/shared/hooks";
import type {TFile} from "@/app/shared/types/file";
import {Input} from "@/app/uikit/components/input";
import {InputDateField} from "@/app/uikit/components/inputDateField";
import {Textarea} from "@/app/uikit/components/textarea";
import "./ProfileAddPage.scss";

export const ProfileAddPage: FC = () => {
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  // Tue Jan 30 2024 00:00:00 GMT+0300 (Москва, стандартное время)
  const [valueInputDateField, setValueInputDateField] = useState<Date | null>(
    null,
  );
  const [files, setFiles] = useState<TFile[] | null>(null);
  const [state, formAction] = useFormState(addProfileAction, initialState);

  const {onAddFiles, onDeleteFile} = useFiles({
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

  const handleDateChange = (date: Date | null) => {
    setValueInputDateField?.(date);
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
    const utcDate = valueInputDateField?.toISOString() ?? "";
    formDataDto.append(EFormFields.Birthday, utcDate);
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
        <Section title="Свойства">
          <InputDateField
            locale={ru}
            onChange={handleDateChange}
            onFieldClear={() => setValueInputDateField(null)}
            placeholder="Дата рождения"
            value={valueInputDateField}
          />
        </Section>
      </form>
    </div>
  );
};
