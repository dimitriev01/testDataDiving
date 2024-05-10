import { EnumRoutesName, ICustomRouteProps, routes } from "../shared/lib/routes"
import { MainPage } from "./main"
import { UserPage } from "./user"

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <MainPage />,
  },
  [EnumRoutesName.USER]: {
    path: routes.user,
    element: <UserPage />,
  },
}
