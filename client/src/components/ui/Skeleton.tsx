export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-48 rounded-xl" />
      <div className="mt-4 space-y-3">
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-3/4 rounded" />
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-3 w-full rounded" />
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

export function SkeletonMenuRow() {
  return (
    <div className="flex items-start gap-4 py-5 animate-pulse">
      <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer w-[100px] h-[100px] rounded-[10px] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-1/3 rounded" />
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-3 w-full rounded" />
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-3 w-2/3 rounded" />
      </div>
      <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-16 rounded" />
    </div>
  );
}

export function SkeletonConfirmation() {
  return (
    <div className="max-w-lg mx-auto animate-pulse space-y-6 py-20">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer w-20 h-20 rounded-full" />
      </div>
      <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-8 w-2/3 mx-auto rounded" />
      <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-1/2 mx-auto rounded" />
      <div className="bg-secondary border border-[rgba(201,168,76,0.15)] rounded-xl p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-1/3 rounded" />
            <div className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer h-4 w-1/4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
