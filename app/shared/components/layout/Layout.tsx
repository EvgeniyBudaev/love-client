"use client";

import { type FC, type ReactNode, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { getProfileByTelegramIdAction } from "@/app/actions/profile/getByTelegramId/getProfileByTelegramIdAction";
import { Footer } from "@/app/shared/components/footer";
import { EFormFields } from "@/app/shared/components/layout/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: string;
};

export const Layout: FC<TProps> = ({ children, lng }) => {
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
  const navigator = useNavigator({ lng });

  useEffect(() => {
    tg?.ready();
    // if (tg?.ready()) {
    //   buttonSubmitRef.current && buttonSubmitRef.current.click();
    // }
    if (navigator.isCoords) {
      // buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  }, [navigator.isCoords, tg]);

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    // formDataDto.append(EFormFields.TelegramID, user?.id.toString() ?? "");
    formDataDto.append(EFormFields.TelegramID, "1");
    formDataDto.append("latitude", navigator?.latitude?.toString() ?? "");
    formDataDto.append("longitude", navigator?.longitude?.toString() ?? "");
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
