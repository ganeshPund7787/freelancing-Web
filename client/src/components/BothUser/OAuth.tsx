import useSignInWithGoogle from "@/API/useSignInWithGoogle";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const OAuth = () => {
  const { SignIn } = useSignInWithGoogle();
  const handleClick = async () => {
    const Provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, Provider);

    result.user.email
      ? SignIn(result.user.email)
      : toast.error("Email Not Found");
  };
  return (
    <button
      onClick={handleClick}
      type={"button"}
      className="flex w-full justify-center rounded-[1rem] bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed uppercase"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
