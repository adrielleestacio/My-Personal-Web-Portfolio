import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-7xl font-bold text-gradient">404</p>
      <h1 className="text-2xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="max-w-md text-muted-foreground">
        The link may be out of date, or the page may have moved. Let&apos;s get
        you back to the portfolio.
      </p>
      <a href="/" className="cosmic-button">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </a>
    </main>
  );
};
