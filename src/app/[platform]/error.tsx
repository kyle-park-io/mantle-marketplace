'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mt-16 text-center">
      <p className="text-stone-500">Something went wrong.</p>
      <button
        onClick={reset}
        className="mt-4 rounded border border-orange-500 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
