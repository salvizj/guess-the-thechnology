import type { Route } from "./+types/admin"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Admin() {
  return <>Hello admin</>
}
