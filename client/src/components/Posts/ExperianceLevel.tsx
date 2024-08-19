import { useState } from "react";
import { experienceLevels } from "@/Data/Client";

type ExperienceLevel = "Entry Level" | "Intermediate" | "Expert";

const ExperianceLevel = ({
  setExperianceLevel,
}: {
  setExperianceLevel: (level: ExperienceLevel) => void;
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel>(
    experienceLevels[0]
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ExperienceLevel;
    setSelectedLevel(value);
    setExperianceLevel(value);
  };

  return (
    <div>
      <h1>Experiance Level : </h1>
      <select
        value={selectedLevel}
        onChange={handleChange}
        className="p-2 border px-5 rounded-md"
      >
        <option value="Entry Level">Entry Level</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
    </div>
  );
};

export default ExperianceLevel;
