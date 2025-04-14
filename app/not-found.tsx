import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-full w-full flex-1">
      <h1 className="text-center text-4xl font-bold">404 - Not Found</h1>

      <p className="text-center text-lg">The page you are looking for does not exist.</p>

      <p className="text-center text-lg">
        <Link href="/" className="text-primary">
          Go back to the homepage
        </Link>
      </p>
    </div>
  );
}
