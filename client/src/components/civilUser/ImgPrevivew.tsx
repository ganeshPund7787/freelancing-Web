import { useRef, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IoAdd } from "react-icons/io5";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  updateFail,
  updateSuccess,
} from "@/App/features/civilUser";
import { BACKEND_API_URL } from "@/main";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import useUploadImg from "@/Hooks/useUploadImg";
import { toast } from "react-toastify";

const formSchema = z.object({
  project: z.string().trim().min(2, "required"),
});

export type UserProjectFormData = z.infer<typeof formSchema>;

const ImageUploadDialog: React.FC = () => {
  const disptch = useDispatch();

  const { storeImage } = useUploadImg();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const formMethods = useForm<UserProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file ? file : null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const UploadAndStore = async () => {
    setIsOpen(false);
    const certification = await storeImage(file);

    try {
      disptch(fetchStart());
      const res = await fetch(`${BACKEND_API_URL}/api/user/UserAchivements`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(certification),
      });
      const data = await res.json();
      
      if (data.success === false) {
        disptch(updateFail());
        toast.error(data.message);
        console.log("not ok", data);
        return;
      }
      toast.success("new changes success!");
      disptch(updateSuccess(data));
    } catch (error) {
      disptch(updateFail());
      console.log(`Erorr while Update Other`, error);
    }
  };

  const onSubmit = (values: UserProjectFormData) => {
    console.log(values);
    formMethods.reset();
  };
  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div>
          <input
            onChange={handleImageChange}
            accept="image/*"
            hidden
            type="file"
            ref={fileRef}
          />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => fileRef.current && fileRef.current.click()}
              >
                <IoAdd
                  className="border p-1 border-cyan-500 hover:bg-opacity-30 rounded-full"
                  size={40}
                />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Preview certifications</DialogTitle>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto"
                />
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="bg-green-500 rounded"
                    type="submit"
                    onClick={UploadAndStore}
                  >
                    Add Certificate
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
};

export default ImageUploadDialog;
