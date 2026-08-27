import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),

  layout("routes/layouts/AuthenticatedRoute.tsx", [
    route("play", "routes/quiz/play.tsx"),

    layout("routes/layouts/AdminRoute.tsx", [
      route("admin", "routes/admin.tsx"),
    ]),
  ]),
] satisfies RouteConfig
