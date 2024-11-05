import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { Pencil, Trash } from "phosphor-react"

interface ActionsReviewDropDownProps {
    setShowEditReviewModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionsReviewDropDown = ({ setShowEditReviewModal, setShowDeleteReviewModal }: ActionsReviewDropDownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 z-[1010] mr-2">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer hover:text-pink flex justify-between items-center"
                        onClick={() => setShowEditReviewModal(true)}
                    >
                        Editar
                        <Pencil />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer hover:text-red-600 flex justify-between items-center"
                        onClick={() => setShowDeleteReviewModal(true)}
                    >
                        Excluir
                        <Trash className="hover:text-red-600" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default ActionsReviewDropDown