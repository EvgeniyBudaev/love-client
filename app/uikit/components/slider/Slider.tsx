"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Image from "next/image";
import type { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { TImage } from "@/app/api/profile/image";
import { useProxyUrl } from "@/app/shared/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Tooltip } from "@/app/uikit/components/tooltip";
import "./Slider.scss";

type TProps = {
  images?: TImage[] | null;
  isLiked?: boolean;
  isSessionUser: boolean;
  isShowTooltipHeart?: boolean;
  onHeartClick?: () => void;
};

export const Slider: FC<TProps> = ({
  images,
  isLiked,
  isSessionUser,
  isShowTooltipHeart,
  onHeartClick,
}) => {
  const { proxyUrl } = useProxyUrl();

  return !isNil(images) && !isEmpty(images) ? (
    <Swiper
      className="Slider"
      modules={[Pagination]}
      pagination={{ type: "progressbar" }}
      spaceBetween={0}
      slidesPerView={1}
    >
      {(images ?? []).map((item) => (
        <SwiperSlide key={item.id}>
          <div className="Slider-WrapperImage">
            <Image
              alt={`${item.url}`}
              className="Slider-Image"
              fill={true}
              priority={true}
              sizes="100vw"
              src={`${proxyUrl}${item.url}`}
              quality={100}
            />
            {!isSessionUser && (
              <div className="Slider-Icon" onClick={onHeartClick}>
                {isLiked ? (
                  <>
                    <Tooltip id="heart-tooltip" isOpen={true}>
                      <span>TEXT</span>
                    </Tooltip>
                    <span id="heart-tooltip">
                      <Icon type="Heart" />
                    </span>
                  </>
                ) : (
                  <Icon type="HeartEmpty" />
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Icon type="NoImage" />
  );
};
