import { ReactNode } from "react"
import { EnumRoutesName, routes } from "../shared/lib/routes"
import { Main } from "./main"
import { User } from "./user"

export interface ICustomRouteProps {
  path: string
  element: ReactNode
}

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <Main />,
  },
  [EnumRoutesName.USER]: {
    path: routes.user,
    element: <User />,
  },
}
