import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container px-4 py-10 md:py-16">
        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Car Market. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
