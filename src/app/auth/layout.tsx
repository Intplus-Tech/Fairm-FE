export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background.svg')",
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
}
