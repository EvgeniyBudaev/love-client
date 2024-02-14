import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EFormFields.DisplayName]: string;
  [EFormFields.Email]: string;
  [EFormFields.MobileNumber]: string;
  [EFormFields.Password]: string;
  [EFormFields.PasswordConfirm]: string;
  [EFormFields.Birthday]: string;
  [EFormFields.Gender]: string;
  [EFormFields.SearchGender]?: string | null;
  [EFormFields.Location]: string;
  [EFormFields.Description]?: string | null;
  [EFormFields.Height]?: string | null;
  [EFormFields.Weight]?: string | null;
  [EFormFields.LookingFor]?: string | null;
  [EFormFields.Image]: TFile | TFile[];
  [EFormFields.TelegramID]: string;
  [EFormFields.Username]: string;
  [EFormFields.FirstName]: string;
  [EFormFields.LastName]: string;
  [EFormFields.LanguageCode]: string;
  [EFormFields.AllowsWriteToPm]: string;
  [EFormFields.QueryId]: string;
  [EFormFields.Latitude]: string;
  [EFormFields.Longitude]: string;
};
type TResponse = {
  [EFormFields.Email]: string;
  [EFormFields.MobileNumber]: string;
  [EFormFields.Password]: string;
  [EFormFields.Username]: string;
  [EFormFields.FirstName]: string;
  [EFormFields.LastName]: string;
};

type TMapSignupToDto = (props: TProps) => TResponse;

export const mapSignupToDto: TMapSignupToDto = ({
  displayName,
  birthday,
  gender,
  searchGender,
  location,
  description,
  height,
  weight,
  lookingFor,
  image,
  telegramId,
  languageCode,
  allowsWriteToPm,
  queryId,
  latitude,
  longitude,
  passwordConfirm,
  ...signupForm
}) => {
  return signupForm;
};
