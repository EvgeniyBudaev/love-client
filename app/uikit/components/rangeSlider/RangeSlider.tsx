"use client";

import { Slider, SliderValue } from "@nextui-org/slider";
import { type Dispatch, type FC, memo, type SetStateAction } from "react";
import "./RangeSlider.scss";

type TProps = {
  label: string;
  maxValue: number;
  minValue: number;
  onChange?: Dispatch<SetStateAction<SliderValue>>;
  step: number;
  value: SliderValue;
};

const RangeSliderComponent: FC<TProps> = ({
  label,
  maxValue,
  minValue,
  onChange,
  step,
  value,
}) => {
  return (
    <div className="RangeSlider">
      <div className="RangeSlider-Info">
        <div className="RangeSlider-Title">{label}</div>
        <div className="RangeSlider-NumberList">
          <div>{Array.isArray(value) && value?.[0]}</div>
          &nbsp;-&nbsp;
          <div>{Array.isArray(value) && value?.[1]}</div>
        </div>
      </div>
      <Slider
        aria-label={label}
        classNames={{ thumb: "RangeSlider-Thumb" }}
        maxValue={maxValue}
        minValue={minValue}
        onChange={onChange}
        step={step}
        style={{ background: "none" }}
        value={value}
      />
    </div>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
