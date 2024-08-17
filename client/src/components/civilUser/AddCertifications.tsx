import { CivilUserType } from "@/types";
import SkillsCarousel from "./SkillsCarousel";
import { Button } from "../ui/button";
import ImgPrevivew from "./ImgPrevivew";

type Props = {
  user: CivilUserType | any;
};



const AddCertifications = ({ user }: Props) => {
  return (
    <div className="border-2 border-slate-500 rounded md:rounded-[1rem]">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <Button>
          <ImgPrevivew />
        </Button>
      </div>
      <hr className="text-slate-500" />
      <div className="flex items-center justify-center">
        {user?.certifications.length > 0 ? (
          <SkillsCarousel ImgArr={user?.certifications || []} />
        ) : (
          <div className="flex flex-col py-10 items-center justify-center">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/trophy-6437812-5307748.png?f=webp"
              alt=""
              className="h-52 w-52 mt-5"
            />
            <p className="text-wrap text-sm px-5 md:p-0">
              Listing your certifications can help prove your specific knowledge
              or abilities.(+10%) <br /> You can add them manually or import
              them from Credly.{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCertifications;
