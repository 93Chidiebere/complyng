import { LucideIcon } from "lucide-react";

export const ModulePlaceholder = ({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
}) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl text-navy">{title}</h1>
      <p className="text-muted-foreground text-sm mt-1">{desc}</p>
    </div>
    <div className="card-cn-active p-12 text-center">
      <div className="w-14 h-14 mx-auto rounded-md bg-teal/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-teal" />
      </div>
      <p className="mt-4 text-navy font-semibold">Coming in Stage 3</p>
      <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
        This module is part of the planned ComplyNG roadmap and will activate alongside the rest of
        your living compliance operations.
      </p>
    </div>
  </div>
);
