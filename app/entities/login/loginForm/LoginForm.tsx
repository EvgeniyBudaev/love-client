"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, type FC, useRef } from "react";
import { useFormState } from "react-dom";
import { getProfileByKeycloakIdAction } from "@/app/actions/profile/getByKeycloakId/getByKeycloakIdAction";
import { EFormFields } from "@/app/entities/login/loginForm/enums";
import { useTranslation } from "@/app/i18n/client";
import { ERoutes } from "@/app/shared/enums";
import type { TSession } from "@/app/shared/types/session";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import "./LoginForm.scss";

type TProps = {
  lng: string;
};

export const LoginForm: FC<TProps> = ({ lng }) => {
  const { data: session, status } = useSession();
  const { t } = useTranslation("index");
  const isLoading = status === "loading";
  const isSession = Boolean(session);
  const buttonSubmitRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (isSession && state.data?.userId) {
      redirect(
        createPath(
          {
            route: ERoutes.Root,
            lng: lng,
          },
          {
            page: state.data?.filter.page.toString(),
            size: state.data?.filter.size.toString(),
            ageFrom: state.data?.filter.ageFrom.toString(),
            ageTo: state.data?.filter.ageTo.toString(),
            searchGender: state.data?.filter.searchGender,
            profileId: state.data?.id.toString(),
            distance: state.data?.filter.distance.toString(),
          },
        ),
      );
    }
  }, [
    isSession,
    lng,
    session,
    state.data?.filter.ageFrom,
    state.data?.filter.ageTo,
    state.data?.filter.distance,
    state.data?.filter.page,
    state.data?.filter.searchGender,
    state.data?.filter.size,
    state.data?.id,
    state.data?.userId,
  ]);

  useEffect(() => {
    if (isSession) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  }, [isSession, session]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      const keycloakSession = session as TSession;
      formDataDto.append(EFormFields.UserId, keycloakSession?.user.id);
      formAction(formDataDto);
    }
  };

  return (
    <div className="LoginForm">
      <Button
        className="LoginForm-Button"
        onClick={() => signIn("keycloak")}
        aria-disabled={isLoading}
      >
        {t("pages.login.keycloak")}
      </Button>
      <form action={handleSubmit} className="Layout-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};
