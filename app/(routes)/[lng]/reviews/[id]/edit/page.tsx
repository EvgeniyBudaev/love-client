import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getReviewDetail } from "@/app/api/review/detail";
import { ReviewDeleted } from "@/app/entities/review/reviewDeleted";
import { ReviewEditPage } from "@/app/pages/reviewEditPage";
import { ERoutes } from "@/app/shared/enums";
import { useSessionNext } from "@/app/shared/hooks";
import type { TSession } from "@/app/shared/types/session";
import { createPath } from "@/app/shared/utils";

type TLoader = {
  id: string;
};

async function reviewEditLoader(params: TLoader) {
  const session = (await getServerSession(authOptions)) as TSession;
  if (!session) {
    return redirect(
      createPath({
        route: ERoutes.Login,
      }),
    );
  }
  const { id } = params;
  try {
    const reviewDetailResponse = await getReviewDetail({ id });
    const review = reviewDetailResponse.data;
    return { review };
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {
  params: { lng: string; id: string };
};

export default async function ReviewDetailRoute(props: TProps) {
  const { params } = props;
  const { lng, id } = params;
  const data = await reviewEditLoader({ id });

  if (data?.review?.hasDeleted) {
    return <ReviewDeleted />;
  }

  return <ReviewEditPage lng={lng} review={data?.review} />;
}
