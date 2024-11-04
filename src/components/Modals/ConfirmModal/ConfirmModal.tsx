import { Loader2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useChangePopStateEvent } from "@/hooks/useChangePopStateEvent";

interface ConfirmModalProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  titleClass?: string;
  descripion?: string;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  setOpen,
  onConfirm,
  onCancel,
  title,
  titleClass,
  descripion,
  loading,
}: ConfirmModalProps) {
  useChangePopStateEvent({
    onReturn: () => setOpen && setOpen(false),
    type: "modal",
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle
              className={titleClass}
            >
              {title}
            </AlertDialogTitle>
          )}
          {descripion && (
            <AlertDialogDescription>
              {descripion}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={onConfirm}
          >
            {loading ? (
              <p className="flex items-center justify-center gap-2 text-center text-base">
                <Loader2Icon className="animate-spin" size={20} />
              </p>
            ) : (
              "Confirmar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
