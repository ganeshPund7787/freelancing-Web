import JobPostDetails from "./JobPostDetails";
const JobPostCard = ({ post }: any) => {
  const createdAt = new Date(post.createdAt);
  const skillsToShow = post.skills.slice(0, 4); // Show only the first 5 skills

  return (
    <div className="sm:p-5 p-2 flex flex-col border bg-slate-800 rounded md:rounded-[1rem] hover:bg-slate-900 hover:border-cyan-400 border-slate-600 shadow-lg">
      <div className="flex flex-col gap-4">
        <span className="text-slate-500">
          Post on {createdAt.toLocaleDateString()}
        </span>
        <div className="s">
          <JobPostDetails post={post} />
        </div>
      </div>

      <div className="flex flex-wrap mt-2 text-sm gap-2 text-slate-300">
        <span>Monthly</span>
        <span>{post.salary} salary</span>/<span>Less than </span>
        <span>{post.HoursePerWeak} Hours work per week</span>
      </div>

      <div className="line-clamp-2 mt-5 text-slate-300">{post.description}</div>

      <div className="flex items-center gap-2 mt-5 flex-wrap">
        skills :-
        {skillsToShow.map((skill: string, index: number) => (
          <span
            key={index}
            className=" rounded-[1rem] hover:bg-slate-900 p-2 cursor-pointer text-slate-300"
          >
            {skill}
          </span>
        ))}
        {skillsToShow.length >= 4 && <span className="text-xs">more...</span>}
      </div>
    </div>
  );
};

export default JobPostCard;
