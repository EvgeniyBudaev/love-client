import type { FC } from "react";
import type { TReviewListItem } from "@/app/api/review/list";
import { DEFAULT_RATING_SIZE } from "@/app/pages/reviewsPage/constants";
import { Rating } from "@/app/uikit/components/rating";
import "./ReviewListItem.scss";
import { Icon } from "@/app/uikit/components/icon";

type TProps = {
  review: TReviewListItem;
};

export const ReviewListItem: FC<TProps> = ({ review }) => {
  return (
    <div className="ReviewListItem">
      <div className="ReviewListItem-Header">
        <div className="ReviewListItem-Info">
          <div className="ReviewListItem-DisplayName">{review.displayName}</div>
          <Rating initialValue={review.rating} size={DEFAULT_RATING_SIZE} />
        </div>
        <Icon type="Edit" />
        <Icon type="Trash" />
      </div>
      {review?.message && (
        <div className="ReviewListItem-Message">{review?.message}</div>
      )}
    </div>
  );
};
