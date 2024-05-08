import { ReactNode } from "react"
import { EnumRoutesName, routes } from "../shared/lib/routes"
import { MainPage } from "./main"
import { UserPage } from "./user"

export interface ICustomRouteProps {
  path: string
  element: ReactNode
}

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
