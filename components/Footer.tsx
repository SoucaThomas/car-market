import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Browse section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cars"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/new-cars"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  New Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/used-cars"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Used Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-your-car"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link
                  href="/car-comparison"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Compare Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Information section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/car-news"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Car News
                </Link>
              </li>
              <li>
                <Link
                  href="/financing"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Financing Options
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>contact@carmarket.com</span>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
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
            <Link
              href="/cookies"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookie Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
