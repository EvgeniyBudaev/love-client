"use client";

import { type FC, type ReactNode, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { getProfileByTelegramIdAction } from "@/app/actions/profile/getByTelegramId/getProfileByTelegramIdAction";
import { Footer } from "@/app/shared/components/footer";
import { EFormFields } from "@/app/shared/components/layout/enums";
import { useTelegram } from "@/app/shared/hooks";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
};

export const Layout: FC<TProps> = ({ children }) => {
  const { tg, user } = useTelegram();
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  const [state, formAction] = useFormState(
    getProfileByTelegramIdAction,
    initialState,
  );
  const buttonSubmitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    tg?.ready();
    // if (tg?.ready()) {
    //   buttonSubmitRef.current && buttonSubmitRef.current.click();
    // }
    buttonSubmitRef.current && buttonSubmitRef.current.click();
  }, [tg]);

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    // formDataDto.append(EFormFields.TelegramID, user?.id.toString() ?? "");
    formDataDto.append(EFormFields.TelegramID, "1");
    formAction(formDataDto);
  };

  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      <Footer profile={state.data} />
      <form action={handleSubmit} className="Layout-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};
