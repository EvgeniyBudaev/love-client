"use client";

import Image from "next/image";
import { type FC } from "react";
import type { TImage } from "@/app/api/profile/image";
import { useTranslation } from "@/app/i18n/client";
import { useProxyUrl } from "@/app/shared/hooks";
import { DropDown } from "@/app/uikit/components/dropDown";

type TProps = {
  defaultImages: TImage[];
};

export const ImageList: FC<TProps> = ({ defaultImages }) => {
  const { proxyUrl } = useProxyUrl();
  const { t } = useTranslation("index");

  return (
    <>
      {defaultImages.map((image) => (
        <div className="Previews-Thumb" key={image.id}>
          <div className="Previews-Thumb-Inner">
            <DropDown>
              <DropDown.Button>
                <Image
                  alt={image.name}
                  className="Previews-Thumb-Image"
                  fill={true}
                  priority={true}
                  sizes="100vw"
                  src={`${proxyUrl}${image.url}`}
                  quality={100}
                />
              </DropDown.Button>
              <DropDown.Panel>
                <div className="DropDown-Menu">
                  <div
                    className="DropDown-MenuItem"
                    // onClick={() => deleteImageAction(image.id)}
                  >
                    {t("common.actions.delete")}
                  </div>
                </div>
                <div className="DropDown-Menu">
                  <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                    {t("common.actions.cancel")}
                  </div>
                </div>
              </DropDown.Panel>
            </DropDown>
          </div>
        </div>
      ))}
    </>
  );
};
