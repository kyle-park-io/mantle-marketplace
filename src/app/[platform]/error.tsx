'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mt-16 text-center">
      <p className="text-stone-500">Something went wrong.</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-500"
      >
        Try again
      </button>
    </div>
  );
}
