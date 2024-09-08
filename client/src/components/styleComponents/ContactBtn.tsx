
export type Props = {
  text: string;
};

const ContactBtn = ({ text }: Props) => {
  return (
    <button className="relative flex items-center px-6 py-2 overflow-hidden font-medium transition-all bg-cyan-400 rounded-md group">
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-ml-4 group-hover:-mb-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-cyan-600 rounded-md group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-black font-bold transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

export default ContactBtn;
