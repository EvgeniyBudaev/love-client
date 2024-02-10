import { ERoutes } from "@/app/shared/enums";

type TRoutes = ERoutes.Root | ERoutes.ProfileAdd;

type TRoutesWithParams = ERoutes.Profile | ERoutes.ProfileEdit;

type TCreatePathProps =
  | { route: TRoutes }
  | { route: TRoutesWithParams; params: Record<string, string | number> };

type TCreatePathPropsWithParams = Extract<
  TCreatePathProps,
  { route: any; params: any }
>;

export function createPath(
  props: TCreatePathProps,
  query?: Record<string, string> | URLSearchParams,
): string {
  let path: string = props.route;

  if (props.hasOwnProperty("params")) {
    path = Object.entries((props as TCreatePathPropsWithParams).params).reduce(
      (previousValue: string, [param, value]) =>
        previousValue.replace(`:${param}`, String(value)),
      path,
    );
  }

  if (query && Object.keys(query).length) {
    path = `${path}${path.includes("?") ? "&" : "?"}${new URLSearchParams(query)}`;
  }

  return path;
}
