"use client";

import { memo } from "react";
import type { FC, MouseEvent } from "react";
import { Rating as RatingUI } from "react-simple-star-rating";

type TProps = {
  dataTestId?: string;
  initialValue?: number;
  onChange?:
    | ((
        value: number,
        index: number,
        event?: MouseEvent<HTMLSpanElement> | undefined,
      ) => void)
    | undefined;
  size?: number;
};

const RatingComponent: FC<TProps> = ({
  dataTestId = "uikit__rating",
  initialValue,
  onChange,
  size,
}) => {
  return (
    <RatingUI
      data-testid={dataTestId}
      initialValue={initialValue}
      onClick={onChange}
      size={size}
    />
  );
};

export const Rating = memo(RatingComponent);
