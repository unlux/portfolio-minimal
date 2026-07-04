"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16">
      <h1 className="mb-4 text-3xl font-semibold tracking-tighter">
        well, that broke.
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        something went sideways rendering this page. it&apos;s probably my
        fault, not yours.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
      >
        try again
      </button>
    </section>
  );
}
