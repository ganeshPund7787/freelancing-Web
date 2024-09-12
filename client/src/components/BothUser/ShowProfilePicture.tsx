import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export type Props = {
  img: string | undefined;
};

const ShowProfilePicture = ({ img }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          <div className="h-24 w-24 rounded-full">
            <img src={img} className="h-24 rounded-full" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-cyan-400">Profile Picture </DialogTitle>
        <div className="flex justify-center mb-5">
          <img src={img} className="h-72 w-72 object-cover rounded-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowProfilePicture;
