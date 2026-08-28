import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  layout("routes/layouts/MainLayout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),

    route("quizzes", "routes/quizzes/quizzes.tsx"),
    route("quizzes/:quizId", "routes/quizzes/preview.tsx"),

    route("play/:quizId", "routes/quiz/play.tsx"),
    route("play/:quizId/results", "routes/quiz/results.tsx"),

    layout("routes/layouts/ProtectedRoute.tsx", [
      route("profile", "routes/profile.tsx"),

      layout("routes/layouts/AdminLayout.tsx", [
        route("admin", "routes/admin/dashboard.tsx"),
        route("admin/quizzes", "routes/admin/quizzes/quizzes.tsx"),
        route("admin/quizzes/create", "routes/admin/quizzes/create-quiz.tsx"),
        route(
          "admin/quizzes/:quizId/edit",
          "routes/admin/quizzes/edit-quiz.tsx",
        ),
        route("admin/users", "routes/admin/users.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig
