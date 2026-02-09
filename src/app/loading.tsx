import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-500/20 blur-xl" />
        
        {/* Logo */}
        <div className="relative h-24 w-24 md:h-32 md:w-32 animate-bounce duration-[2000ms]">
          <Image
            src="/android-chrome-192x192.png"
            alt="Loading..."
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            priority
          />
        </div>
      </div>

      {/* Loading Text/Spinner */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>
        <span className="text-sm font-medium text-yellow-500/80 animate-pulse">
          SAM LOGISTICS...
        </span>
      </div>
    </div>
  );
}
