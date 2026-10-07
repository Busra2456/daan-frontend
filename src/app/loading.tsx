import { HeartHandshake } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <HeartHandshake className="h-7 w-7 animate-pulse text-primary" />
        </div>

        <div className="text-center">
          <p className="font-semibold">Daan</p>
          <p className="text-sm text-muted-foreground">
            Loading, please wait...
          </p>
        </div>
      </div>
    </div>
  );
}