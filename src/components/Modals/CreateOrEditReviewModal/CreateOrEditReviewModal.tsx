
import CreateOrEditReviewForm from "@/components/Form/CreateOrEditReviewForm/CreateOrEditReviewForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IMovie } from "@/interfaces/IMovie";

interface CreateReviewModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movie: IMovie | null
  variant: "create" | "edit"
}

export function CreateOrEditReviewModal({
  open,
  setOpen,
  movie,
  variant
}: CreateReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-[560px]:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Faça sua avaliação sobre esse filme</DialogTitle>
        </DialogHeader>

        <CreateOrEditReviewForm movie={movie!} setOpen={setOpen} variant={variant} />
      </DialogContent>
    </Dialog>
  );
}
