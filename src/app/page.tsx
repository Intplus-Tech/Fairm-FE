import { redirect } from "next/navigation";

export default function HomePage() {
  const isLoggedIn = false; // replace with real auth check

  if (!isLoggedIn) {
    redirect("/auth/login");
  }

  redirect("/dashboard");
}
