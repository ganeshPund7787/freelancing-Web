const EducationCard = ({ education }: any) => {
  return (
    <div className="flex w-full border cursor-pointer p-3 border-slate-600 flex-col items-center px-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="md:text-2xl line-clamp-1">
          {education.degree}{" "}
          <span className="text-sm">{education.fieldOfStudy}</span>
        </h1>
      </div>
      <div className="w-full flex mt-1 items-center justify-between">
        from {education.collegeName} {education.university} university
      </div>
    </div>
  );
};

export default EducationCard;
