import Link from 'next/link';

export function SignInLink() {
  return (
    <Link
      className="text-sm font-semibold leading-6"
      href="/sign-in"
      prefetch={false}
    >
      Sign In <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
