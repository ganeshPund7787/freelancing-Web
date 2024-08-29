import ClientPost from "@/components/ClientPost";
import JobSearchInput from "@/components/Posts/JobSearchInput";

const Home = () => {
  return (
    <>
      <div className="w-full px-5">
        <JobSearchInput />
        <ClientPost />
      </div>
    </>
  );
};

export default Home;
