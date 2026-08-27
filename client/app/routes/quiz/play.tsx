import type { Route } from "./+types/play"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Play() {
  return <>Hello world</>
}
