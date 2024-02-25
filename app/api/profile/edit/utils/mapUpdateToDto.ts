import { EFormFields } from "@/app/pages/profileEditPage/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EFormFields.Id]: string;
  [EFormFields.Username]: string;
  [EFormFields.DisplayName]: string;
  [EFormFields.Email]?: string | null;
  [EFormFields.MobileNumber]: string;
  [EFormFields.Birthday]: string;
  [EFormFields.Gender]: string;
  [EFormFields.SearchGender]?: string | null;
  [EFormFields.Location]?: string | null;
  [EFormFields.Description]?: string | null;
  [EFormFields.Height]?: string | null;
  [EFormFields.Weight]?: string | null;
  [EFormFields.LookingFor]?: string | null;
  [EFormFields.Image]?: TFile | TFile[] | null;
  [EFormFields.TelegramID]: string;
  [EFormFields.TelegramUsername]: string;
  [EFormFields.FirstName]?: string | null;
  [EFormFields.LastName]?: string | null;
  [EFormFields.LanguageCode]: string;
  [EFormFields.AllowsWriteToPm]: string;
  [EFormFields.QueryId]: string;
  [EFormFields.Latitude]: string;
  [EFormFields.Longitude]: string;
  [EFormFields.AgeFrom]: string;
  [EFormFields.AgeTo]: string;
  [EFormFields.Distance]: string;
  [EFormFields.Page]: string;
  [EFormFields.Size]: string;
};

type TUpdateForm = {
  [EFormFields.Email]?: string | null;
  [EFormFields.MobileNumber]: string;
  [EFormFields.Username]: string;
  [EFormFields.FirstName]?: string | null;
  [EFormFields.LastName]?: string | null;
};

type TProfileForm = {
  [EFormFields.Id]: string;
  [EFormFields.Username]: string;
  [EFormFields.DisplayName]: string;
  [EFormFields.Birthday]: string;
  [EFormFields.Gender]: string;
  [EFormFields.SearchGender]?: string | null;
  [EFormFields.Location]?: string | null;
  [EFormFields.Description]?: string | null;
  [EFormFields.Height]?: string | null;
  [EFormFields.Weight]?: string | null;
  [EFormFields.LookingFor]?: string | null;
  [EFormFields.Image]?: TFile | TFile[] | null;
  [EFormFields.TelegramID]: string;
  [EFormFields.TelegramUsername]: string;
  [EFormFields.FirstName]?: string | null;
  [EFormFields.LastName]?: string | null;
  [EFormFields.LanguageCode]: string;
  [EFormFields.AllowsWriteToPm]: string;
  [EFormFields.QueryId]: string;
  [EFormFields.Latitude]: string;
  [EFormFields.Longitude]: string;
  [EFormFields.AgeFrom]: string;
  [EFormFields.AgeTo]: string;
  [EFormFields.Distance]: string;
  [EFormFields.Page]: string;
  [EFormFields.Size]: string;
};

type TResponse = {
  profileForm: TProfileForm;
  updateForm: TUpdateForm;
};

type TMapUpdateToDto = (props: TProps) => TResponse;

export const mapUpdateToDto: TMapUpdateToDto = (props: TProps) => {
  return {
    profileForm: {
      [EFormFields.Id]: props.id,
      [EFormFields.Username]: props.userName,
      [EFormFields.DisplayName]: props.displayName,
      [EFormFields.Birthday]: props.birthday,
      [EFormFields.Gender]: props.gender,
      [EFormFields.SearchGender]: props.searchGender,
      [EFormFields.Location]: props.location,
      [EFormFields.Description]: props.description,
      [EFormFields.Height]: props.height,
      [EFormFields.Weight]: props.weight,
      [EFormFields.LookingFor]: props.lookingFor,
      [EFormFields.Image]: props.image,
      [EFormFields.TelegramID]: props.telegramId,
      [EFormFields.TelegramUsername]: props.telegramUserName,
      [EFormFields.FirstName]: props.firstName,
      [EFormFields.LastName]: props.lastName,
      [EFormFields.LanguageCode]: props.languageCode,
      [EFormFields.AllowsWriteToPm]: props.allowsWriteToPm,
      [EFormFields.QueryId]: props.queryId,
      [EFormFields.Latitude]: props.latitude,
      [EFormFields.Longitude]: props.longitude,
      [EFormFields.AgeFrom]: props.ageFrom,
      [EFormFields.AgeTo]: props.ageTo,
      [EFormFields.Distance]: props.distance,
      [EFormFields.Page]: props.page,
      [EFormFields.Size]: props.size,
    },
    updateForm: {
      [EFormFields.Email]: props.email,
      [EFormFields.MobileNumber]: props.mobileNumber,
      [EFormFields.Username]: props.userName,
      [EFormFields.FirstName]: props.firstName,
      [EFormFields.LastName]: props.lastName,
    },
  };
};
