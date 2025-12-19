'use client';
export default function Loader({ progress }) {

  return (
    <div className="fixed top-0 left-0 w-full h-dvh bg-black z-[9999]">
      <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 text-white">
        <p className="mb-3 animate-pulse">Loading...</p>
        <div className="relative w-72 h-7 rounded-sm overflow-hidden border-4">
          <div
            className="bg-orange-500 h-full"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
            {progress} %
          </span>
        </div>
      </div>
    </div>
  );
}