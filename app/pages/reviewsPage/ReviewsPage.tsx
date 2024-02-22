"use client";

import isEmpty from "lodash/isEmpty";
import Link from "next/link";
import { type FC } from "react";
import { TReviewList } from "@/app/api/review/list";
import { useTranslation } from "@/app/i18n/client";
import { DEFAULT_RATING_SIZE } from "@/app/pages/reviewsPage/constants";
import { ReviewListItem } from "@/app/pages/reviewsPage/ReviewListItem";
import { Header } from "@/app/shared/components/header";
import { ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Rating } from "@/app/uikit/components/rating";
import "./ReviewsPage.scss";
import { Container } from "@/app/shared/components/container";

type TProps = {
  reviewList?: TReviewList;
};

export const ReviewsPage: FC<TProps> = ({ reviewList }) => {
  const { t } = useTranslation("index");

  return (
    <div className="ReviewsPage">
      <Header className="SidebarContent-Header">
        <div />
        <div>{t("common.actions.reviews")}</div>
        <Link
          className="Header-Action"
          href={createPath({
            route: ERoutes.ReviewAdd,
          })}
        >
          {t("common.actions.add")}
        </Link>
      </Header>
      <Container>
        <div className="ReviewsPage-RatingBlock">
          <div>{t("common.title.ratingTotal")}</div>
          <Rating
            initialValue={reviewList?.ratingAverage}
            readonly={true}
            size={DEFAULT_RATING_SIZE}
          />
        </div>
        <div className="ReviewsPage-Title">{t("common.title.reviews")}</div>
        <div className="ReviewsPage-List">
          {isEmpty(reviewList?.content) && <div>{t("reviews.noReviews")}</div>}
          {(reviewList?.content ?? []).map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </div>
  );
};
