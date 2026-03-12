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
  const token = searchParams?.token;
  const email = searchParams?.email ?? "";
  const name = searchParams?.name ?? "";

  if (!token) {
    redirect("/auth/login");
  }

  redirect(
    `/auth/register-invite?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
  );
}