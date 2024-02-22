"use client";

import { memo } from "react";
import type { FC, MouseEvent } from "react";
import { Rating as RatingUI, RatingProps } from "react-simple-star-rating";

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
} & RatingProps;

const RatingComponent: FC<TProps> = ({
  dataTestId = "uikit__rating",
  initialValue,
  onChange,
  size,
  ...props
}) => {
  return (
    <RatingUI
      {...props}
      data-testid={dataTestId}
      initialValue={initialValue}
      onClick={onChange}
      size={size}
    />
  );
};

export const Rating = memo(RatingComponent);
