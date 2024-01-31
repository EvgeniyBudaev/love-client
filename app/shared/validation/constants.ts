// TODO: функцию t заменить на t из i18next
const t = (value: string) => {
  return value;
};

export const LETTERS_EN = "a-zA-Z";
export const LETTERS_RU = "а-яА-ЯёЁ";

export const EMPTY_FIELD_ERROR_MESSAGE = t("common.validation.empty");

export const NAME_REGEXP = new RegExp(`^[- ${LETTERS_EN}${LETTERS_RU}]*$`);
export const NAME_ERROR_MESSAGE = t("common.validation.onlyLetters");

export const FILE_TYPE_MESSAGE = t("common.validation.file.expectedFile");
export const FILE_MAX_SIZE_MESSAGE = t("common.validation.file.maxSize");
export const FILE_MAX_AMOUNT_MESSAGE = t("common.validation.file.maxAmount");
