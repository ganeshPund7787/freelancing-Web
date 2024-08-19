import { useState } from "react";
import { salaryExeptation } from "@/Data/Client";

type SalaryRange =
  | "5k to 10k"
  | "20k to 30k"
  | "30k to 50k"
  | "50k to 80k"
  | "80k to 100k";

const SalarySearch = ({
  setSalary,
}: {
  setSalary: (salary: SalaryRange) => void;
}) => {
  const [selectedSalary, setSelectedSalary] = useState<SalaryRange>(
    salaryExeptation[0]
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SalaryRange;
    setSelectedSalary(value);
    setSalary(value); // Pass the selected value to the parent component
  };

  return (
    <div>
      <h1>Salary Exeptation : </h1>
      <select
        value={selectedSalary}
        onChange={handleChange}
        className="p-2 border px-5 rounded-md"
      >
        <option value="5k to 10k">5k to 10k</option>
        <option value="20k to 30k">20k to 30k</option>
        <option value="30k to 50k">30k to 50k</option>
        <option value="50k to 80k">50k to 80k</option>
        <option value="80k to 100k">80k to 100k</option>
      </select>
    </div>
  );
};

export default SalarySearch;
