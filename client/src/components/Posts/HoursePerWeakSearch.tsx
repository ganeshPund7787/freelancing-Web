const HoursePerWeakSearch = ({ setHoursePerWeak }: any) => {
  return (
    <div className="flex flex-col  gap-3">
      <span>working Hourse Per Weak : </span>
      <input
        type="number"
        min={1}
        max={168}
        className="w-[13rem] p-1 px-2 text-white border border-slate-500"
        onChange={(e) => setHoursePerWeak(e.target.value)}
      />
    </div>
  );
};

export default HoursePerWeakSearch;
