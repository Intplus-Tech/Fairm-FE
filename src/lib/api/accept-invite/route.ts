import { redirect } from "next/navigation";

interface AcceptInvitePageProps {
  searchParams: {
    token?: string;
    email?: string;
    name?: string;
  };
}

export default function AcceptInvitePage({
  searchParams,
}: AcceptInvitePageProps) {
  const { token, email, name } = searchParams;

  // If token is missing, redirect to login
  if (!token) {
    redirect("/auth/login");
  }

  // Redirect to register-invite page
  redirect(
    `/auth/register-invite?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email ?? "")}&name=${encodeURIComponent(
      name ?? ""
    )}`
  );
}
