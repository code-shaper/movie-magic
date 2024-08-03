import Link from 'next/link';

export function SignUpLink() {
  return (
    <Link
      className="text-sm font-semibold leading-6"
      href="/sign-up"
      prefetch={false}
    >
      Sign Up <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
