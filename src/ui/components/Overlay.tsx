import { cn } from "@/lib/utils/cn";
import { Button } from "@/ui/components/Button";

type ModalProps = {
  title: string;
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(6,9,16,0.6)] backdrop-blur-sm">
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--navy-50)]">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="text-sm text-[var(--navy-100)]">{children}</div>
      </div>
    </div>
  );
}

type DrawerProps = {
  title: string;
  open: boolean;
  side?: "right" | "left";
  onClose?: () => void;
  children: React.ReactNode;
};

export function Drawer({ title, open, side = "right", onClose, children }: DrawerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-[rgba(0,0,0,0.4)]" onClick={onClose} />
      <div
        className={cn(
          "glass-panel relative h-full w-full max-w-lg p-6 shadow-2xl",
          side === "right" ? "translate-x-0" : "order-first"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--navy-50)]">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="text-sm text-[var(--navy-100)]">{children}</div>
      </div>
    </div>
  );
}
