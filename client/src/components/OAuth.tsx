import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const OAuth = () => {
  const handleClick = async () => {
    const Provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, Provider);
    console.log(result.user.email);
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
