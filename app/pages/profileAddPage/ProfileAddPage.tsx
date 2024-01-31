"use client";

import { ru } from "date-fns/locale";
import isNil from "lodash/isNil";
import { type FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addProfileAction } from "@/app/actions/profile/add/AddProfileAction";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { Section } from "@/app/shared/components/section";
import { Field } from "@/app/shared/components/form/field";
import { FileUploader } from "@/app/shared/components/form/fileUploader";
import { Header } from "@/app/shared/components/header";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import { EGender } from "@/app/shared/enums/form";
import { useFiles, useTelegram } from "@/app/shared/hooks";
import type { TFile } from "@/app/shared/types/file";
import { Input } from "@/app/uikit/components/input";
import { InputDateField } from "@/app/uikit/components/inputDateField";
import { Select, type TSelectOption } from "@/app/uikit/components/select";
import { Textarea } from "@/app/uikit/components/textarea";
import "./ProfileAddPage.scss";

export const ProfileAddPage: FC = () => {
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  const genderOptions = [
    { label: "Парень", value: EGender.Man },
    { label: "Девушка", value: EGender.Woman },
  ];
  const [gender, setGender] = useState<TSelectOption | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [valueInputDateField, setValueInputDateField] = useState<Date | null>(
    null,
  );
  const [files, setFiles] = useState<TFile[] | null>(null);
  const [state, formAction] = useFormState(addProfileAction, initialState);
  const buttonSubmitRef = useRef<HTMLInputElement>(null);
  const { queryId, user } = useTelegram();

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EFormFields.Image,
    files: files ?? [],
    setValue: (_fieldName: string, files: TFile[]) => setFiles(files),
  });

  useEffect(() => {
    console.log("files: ", files);
  }, [files]);
  useEffect(() => {
    console.log("state: ", state);
  }, [state]);
  useEffect(() => {
    console.log("gender: ", gender);
  }, [gender]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleDateChange = (date: Date | null) => {
    setValueInputDateField?.(date);
  };

  const handleClickSave = () => {
    buttonSubmitRef.current && buttonSubmitRef.current.click();
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleChangeGender = (value?: TSelectOption) => {
    if (value) {
      value && setGender(value);
      handleCloseSidebar();
    }
  };

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    const displayName = formData.get(EFormFields.DisplayName);
    const description = formData.get(EFormFields.Description);
    const location = formData.get(EFormFields.Location);
    formDataDto.append(EFormFields.DisplayName, (displayName ?? "").toString());
    formDataDto.append(EFormFields.Description, (description ?? "").toString());
    formDataDto.append(EFormFields.Location, (location ?? "").toString());
    (files ?? []).forEach((file) => {
      formDataDto.append(EFormFields.Image, file);
    });
    const utcDate = valueInputDateField?.toISOString() ?? "";
    formDataDto.append(EFormFields.Birthday, utcDate);
    formDataDto.append(EFormFields.Gender, gender?.value.toString() ?? "");
    formDataDto.append(EFormFields.TelegramID, user?.id.toString() ?? "1");
    formDataDto.append(EFormFields.FirstName, user?.first_name ?? "Evgeniy");
    formDataDto.append(EFormFields.LastName, user?.last_name ?? "Budaev");
    formDataDto.append(EFormFields.Username, user?.username ?? "budaev");
    formDataDto.append(EFormFields.LanguageCode, user?.language_code ?? "ru");
    formDataDto.append(
      EFormFields.AllowsWriteToPm,
      user?.allows_write_to_pm?.toString() ?? "true",
    );
    formDataDto.append(EFormFields.QueryId, queryId ?? "1");
    formAction(formDataDto);
  };

  return (
    <div className="ProfileAddPage">
      <form action={handleSubmit} className="ProfileAddPage-Form">
        <Header>
          <div className="ProfileAddPage-Header-Cancel">Отменить</div>
          <div className="ProfileAddPage-Header-Save" onClick={handleClickSave}>
            Сохранить
          </div>
        </Header>
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
          <Field>
            <Input
              errors={state?.errors?.displayName}
              isRequired={true}
              label={"Имя" ?? "Name"}
              name={EFormFields.DisplayName}
              type="text"
            />
          </Field>
          <Field>
            <span>Дата рождения</span>
            <InputDateField
              locale={ru}
              onChange={handleDateChange}
              onFieldClear={() => setValueInputDateField(null)}
              placeholder="Выберите дату"
              value={valueInputDateField}
            />
          </Field>
          <Field>
            <Textarea
              errors={state?.errors?.description}
              label={"Описание" ?? "Description"}
              name={EFormFields.Description}
              type="text"
            />
          </Field>
        </Section>
        <Section title="Свойства">
          <Field>
            <Select
              isSidebarOpen={isSidebarOpen}
              label="Пол"
              headerTitle={!isNil(gender) ? gender?.label : "--"}
              onHeaderClick={handleOpenSidebar}
              onSidebarClose={handleCloseSidebar}
            >
              <SidebarContent
                onSave={handleChangeGender}
                options={genderOptions}
                onCloseSidebar={handleCloseSidebar}
                title="Пол"
                value={gender?.value}
              />
            </Select>
          </Field>
          <Field>
            <Input
              errors={state?.errors?.location}
              isRequired={true}
              label={"Местоположение" ?? "Location"}
              name={EFormFields.Location}
              type="text"
            />
          </Field>
        </Section>
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};
