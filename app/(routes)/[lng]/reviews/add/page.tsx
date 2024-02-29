import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getProfileBySessionId } from "@/app/api/profile/getBySessionId";
import { ReviewAddPage } from "@/app/pages/reviewAddPage";
import { ERoutes } from "@/app/shared/enums";
import type { TSession } from "@/app/shared/types/session";
import { createPath } from "@/app/shared/utils";

async function reviewAddLoader() {
  const session = (await getServerSession(authOptions)) as TSession;
  if (!session) {
    return redirect(
      createPath({
        route: ERoutes.Login,
      }),
    );
  }
  try {
    const profileResponse = await getProfileBySessionId({
      sessionId: session.user.id,
    });
    const profile = profileResponse.data;
    return { profileId: profile?.id };
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {};

export default async function ReviewAddRoute(props: TProps) {
  const data = await reviewAddLoader();

  return <ReviewAddPage profileId={data.profileId} />;
}
