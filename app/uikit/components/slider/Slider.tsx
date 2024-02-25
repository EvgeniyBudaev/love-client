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
import "./Slider.scss";

type TProps = {
  images?: TImage[] | null;
  isLiked?: boolean;
  isSessionUser: boolean;
  onHeartClick?: () => void;
};

export const Slider: FC<TProps> = ({
  images,
  isLiked,
  isSessionUser,
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
                {isLiked ? <Icon type="Heart" /> : <Icon type="HeartEmpty" />}
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
