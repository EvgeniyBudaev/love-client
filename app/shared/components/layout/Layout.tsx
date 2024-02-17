"use client";

import { type FC, type ReactNode, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { getProfileByKeycloakIdAction } from "@/app/actions/profile/getByKeycloakId/getByKeycloakIdAction";
import { Footer } from "@/app/shared/components/footer";
import { EFormFields } from "@/app/shared/components/layout/enums";
import { useNavigator, useSessionNext, useTelegram } from "@/app/shared/hooks";
import type { TSession } from "@/app/shared/types/session";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: string;
};

export const Layout: FC<TProps> = ({ children, lng }) => {
  const { data: session, status } = useSessionNext();
  const isSession = Boolean(session);
  const { tg } = useTelegram();
  const initialState = {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: false,
  };
  const [state, formAction] = useFormState(
    getProfileByKeycloakIdAction,
    initialState,
  );
  const buttonSubmitRef = useRef<HTMLInputElement>(null);
  const navigator = useNavigator({ lng });

  useEffect(() => {
    tg?.ready();
    // if (tg?.ready()) {
    //   buttonSubmitRef.current && buttonSubmitRef.current.click();
    // }
    if (isSession) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  }, [isSession, navigator.isCoords, tg]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const keycloakSession = session as TSession;
      const formDataDto = new FormData();
      formDataDto.append(EFormFields.UserId, keycloakSession.user.id);
      formDataDto.append("latitude", navigator?.latitude?.toString() ?? "");
      formDataDto.append("longitude", navigator?.longitude?.toString() ?? "");
      formAction(formDataDto);
    }
  };

  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      <Footer lng={lng} profile={state.data} />
      <form action={handleSubmit} className="Layout-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};
