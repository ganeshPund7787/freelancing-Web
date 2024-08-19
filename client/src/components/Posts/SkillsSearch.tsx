import { skills as RequiredSkills } from "@/Data/Client";

type Props = {
  skills: string[] | any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SkillsSearch = ({ skills, onChange }: Props) => {
  return (
    <div className=" pb-5">
      <h4 className="text-md font-semibold mb-2">Required Skills: </h4>
      {RequiredSkills.map((skill: string) => (
        <label
          key={skill}
          className="flex text-white items-center space-x-2 mx-2"
        >
          <input
            type="checkbox"
            className="rounded"
            value={skill}
            checked={skills.includes(skill)}
            onChange={onChange}
          />
          <span>{skill}</span>
        </label>
      ))}
    </div>
  );
};

export default SkillsSearch;
