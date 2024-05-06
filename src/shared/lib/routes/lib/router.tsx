import { Navigate, Route, Routes } from "react-router-dom"
import { EnumRoutesName, routes } from "../model/routes"
import { ICustomRouteProps } from "../../../../pages"

interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>
}

export const Router = (props: IRouterProps) => {
  const { pages } = props

  return (
    <Routes>
      {Object.values(pages).map(page => (
        <Route key={`route_${page.path}`} path={page.path} element={page.element} />
      ))}
      <Route
        key={`route_default`}
        path="*"
        element={<Navigate to={routes.main} />}
      />
    </Routes>
  )
}
