"use client";

import { redirect } from "next/navigation";
import { type ForwardedRef, forwardRef, memo, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { deleteProfileAction } from "@/app/actions/profile/delete/deleteProfileAction";
import type { TProfile } from "@/app/api/profile/add";
import { useTranslation } from "@/app/i18n/client";
import { EFormFields } from "@/app/pages/profilePage/enums";
import { Header } from "@/app/shared/components/header";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./ProfileSidebar.scss";
import { editProfileAction } from "@/app/actions/profile/edit/editProfileAction";
import { addProfileAction } from "@/app/actions/profile/add/addProfileAction";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";
import isNil from "lodash/isNil";

type TProps = {
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  profile?: TProfile;
};

const ProfileSidebarComponent = forwardRef(
  (
    { isSidebarOpen, onCloseSidebar, profile }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const initialState = {
      data: undefined,
      error: undefined,
      errors: undefined,
      success: false,
    };
    const buttonSubmitRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation("index");
    const [state, formAction] = useFormState(deleteProfileAction, initialState);
    // TODO: удалить useEffect
    useEffect(() => {
      console.log("state: ", state);
    }, [state]);

    useEffect(() => {
      if (!isNil(state.data) && state.success && !state?.error) {
        const path = createPath({
          route: ERoutes.Root,
        });
        redirect(path);
      }
    }, [state.data, state?.error, state.success]);

    const handleDeleteAccount = () => {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    };

    const handleSubmit = () => {
      if (profile?.id) {
        const formDataDto = new FormData();
        formDataDto.append(EFormFields.Id, profile.id.toString());
        deleteProfileAction({}, formDataDto);
        onCloseSidebar?.();
      }
    };

    return (
      <div className="ProfileSidebar">
        <Sidebar isActive={isSidebarOpen} onClose={onCloseSidebar} ref={ref}>
          <Header className="SidebarContent-Header">
            <Icon
              className="SidebarContent-Header-Cancel"
              onClick={onCloseSidebar}
              type="ArrowBack"
            />
            <div>{t("common.actions.settings")}</div>
            <div />
          </Header>
          <div className="SidebarContent-List">
            <div
              className="SidebarContent-List-Item SidebarContent-List-Item-Delete"
              onClick={handleDeleteAccount}
            >
              {t("common.actions.deleteAccount")}
            </div>
          </div>
          <form action={handleSubmit} className="ProfileSidebar-Form">
            <input hidden={true} ref={buttonSubmitRef} type="submit" />
          </form>
        </Sidebar>
      </div>
    );
  },
);

ProfileSidebarComponent.displayName = "ProfileSidebar";

export const ProfileSidebar = memo(ProfileSidebarComponent);
