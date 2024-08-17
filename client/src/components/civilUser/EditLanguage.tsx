import { useAppSelectore } from "@/App/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdModeEditOutline } from "react-icons/md";

const EditLanguage = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MdModeEditOutline
            className="border cursor-pointer p-2 border-cyan-500 rounded-full"
            size={40}
          />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Edit Language</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            {CurrentCivilUser.languages.length === 0 && (
              <div className="text-2xl mt-5">No Language Added</div>
            )}
            {CurrentCivilUser.languages &&
              CurrentCivilUser?.languages?.map((language: string) => (
                <span>{language}</span>
              ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            {CurrentCivilUser.languages.length > 0 && (
              <Button type="submit">Save</Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLanguage;
