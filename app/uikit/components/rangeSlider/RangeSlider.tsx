"use client";

import {
  type Dispatch,
  type FC,
  memo,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./RangeSlider.scss";

type TProps = {
  label: string;
  maxValue: number;
  minValue: number;
  onChange?: Dispatch<SetStateAction<number[]>>;
  step: number;
  value: number[];
};

const RangeSliderComponent: FC<TProps> = ({
  label,
  maxValue,
  minValue,
  onChange,
  step,
  value,
}) => {
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const [minTooltip, setMinTooltip] = useState(minValue);
  const [maxTooltip, setMaxTooltip] = useState(maxValue);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const minTooltipRef = useRef<HTMLDivElement | null>(null);
  const maxTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      trackRef &&
      trackRef.current &&
      minTooltipRef &&
      minTooltipRef.current &&
      maxTooltipRef &&
      maxTooltipRef.current
    ) {
      trackRef.current.style.left = `${((min - minValue) / (maxValue - minValue)) * 100}%`;
      trackRef.current.style.right = `${((maxValue - max) / (maxValue - minValue)) * 100}%`;
      minTooltipRef.current.style.left = `${((min - minValue) / (maxValue - minValue)) * 100}%`;
      maxTooltipRef.current.style.right = `${((maxValue - max) / (maxValue - minValue)) * 100}%`;
    }
  }, [max, maxValue, min, minValue]);

  const handleChangeMin = (event?: any) => {
    const value = Number(event.target.value);
    if (value <= max) {
      setMin(value);
      setMinTooltip(value);
      if (onChange) {
        onChange?.([value, max]);
      }
    }
  };

  const handleChangeMax = (event?: any) => {
    const value = Number(event.target.value);
    if (value >= min) {
      setMax(value);
      setMaxTooltip(value);
      onChange?.([min, value]);
    }
  };

  return (
    <div className="RangeSlider">
      <div className="RangeSlider-Info">
        <div className="RangeSlider-Title">{label}</div>
        {/*<div className="RangeSlider-NumberList">*/}
        {/*  <div>{Array.isArray(value) && value?.[0]}</div>*/}
        {/*  &nbsp;-&nbsp;*/}
        {/*  <div>{Array.isArray(value) && value?.[1]}</div>*/}
        {/*</div>*/}
      </div>
      <div className="RangeSlider-Slider">
        <div className="RangeSlider-Slider-Track" ref={trackRef}></div>
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Min"
          max={maxValue}
          min={minValue}
          name="min"
          onChange={handleChangeMin}
          step={step}
          type="range"
          value={min}
        />
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Max"
          max={maxValue}
          min={minValue}
          name="max"
          onChange={handleChangeMax}
          step={step}
          type="range"
          value={max}
        />
        <div
          className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Min"
          ref={minTooltipRef}
        >
          {minTooltip}
        </div>
        <div
          className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Max"
          ref={maxTooltipRef}
        >
          {maxTooltip}
        </div>
      </div>
    </div>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
