import { experienceLevels } from "@/Data/Client";

const ExperianceLevel = () => {
  return (
    <div>
      <h1>Experiance Level : </h1>
      {experienceLevels.map((experiance) => (
        <label key={experiance} className="flex items-center space-x-2 mx-2">
          <input type="checkbox" className="rounded" value={experiance} />
          <span>{experiance}</span>
        </label>
      ))}
    </div>
  );
};

export default ExperianceLevel;
