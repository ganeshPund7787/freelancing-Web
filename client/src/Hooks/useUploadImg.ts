import { app } from "@/firebase";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const useUploadImg = () => {
  const [imageUploadError, setImageUploadError] = useState<string | boolean>(
    false
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  let promises: Promise<string>[] = [];

  const handleImageSubmit = async (files: FileList) => {
    setError(false);
    if (files.length > 0 && files.length <= 6) {
      setUploading(true);
      setImageUploadError(false);

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      return Promise.all(promises)
        .then(() => {
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file: File | null): Promise<string> => {
    if (!file) return "";
    setError(false);
    setUploading(true);
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              resolve(downloadURL);
              setUploading(false);
              return downloadURL;
            }
          );
        }
      );
    });
  };

  return {
    handleImageSubmit,
    storeImage,
    imageUploadError,
    uploading,
    error,
    promises,
  };
};

export default useUploadImg;
