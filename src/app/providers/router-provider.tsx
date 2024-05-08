import { BrowserRouter } from "react-router-dom"
import { ReactNode } from "react"

interface IRouterProviderProps {
  children: ReactNode
}

export const RouterProvider = (props: IRouterProviderProps) => (
  <BrowserRouter>{props.children}</BrowserRouter>
)
