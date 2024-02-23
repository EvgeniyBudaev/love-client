import type { FC } from "react";
import type { TReviewListItem } from "@/app/api/review/list";
import { DEFAULT_RATING_SIZE } from "@/app/pages/reviewsPage/constants";
import { useSessionNext } from "@/app/shared/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Rating } from "@/app/uikit/components/rating";
import "./ReviewListItem.scss";
import type { TSession } from "@/app/shared/types/session";

type TProps = {
  review: TReviewListItem;
};

export const ReviewListItem: FC<TProps> = ({ review }) => {
  const { data: session } = useSessionNext();
  const keycloakSession = session as TSession;
  const isPermissions = review.userId == keycloakSession?.user.id;

  return (
    <div className="ReviewListItem">
      <div className="ReviewListItem-Header">
        <div className="ReviewListItem-Info">
          <div className="ReviewListItem-DisplayName">{review.displayName}</div>
          <Rating initialValue={review.rating} size={DEFAULT_RATING_SIZE} />
        </div>
        {isPermissions && (
          <div className="ReviewListItem-IconList">
            <Icon type="Edit" />
            <Icon type="Trash" />
          </div>
        )}
      </div>
      {review?.message && (
        <div className="ReviewListItem-Message">{review?.message}</div>
      )}
    </div>
  );
};
