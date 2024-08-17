import { BACKEND_API_URL } from "@/main";

import {
  fetchFail,
  fetchStart,
  updateFail,
  updateSuccess,
} from "../../App/features/civilUser";
import { useDispatch } from "react-redux";

import {
  CivilUserType,
  EducationType,
  ProjectsType,
  workExperienceType,
} from "@/types";
import { UserSkillFormData } from "@/components/civilUser/AddSkills";
import { toast } from "react-toastify";

export type HeadUserType = {
  fullName?: string;
  photoUrl?: string;
  city?: string;
  state?: string;
  country?: string;
};

const useUpdateUser = () => {
  const disptch = useDispatch();

  const update = async (formData: CivilUserType) => {
    try {
      disptch(fetchStart());
      const res = await fetch(`${BACKEND_API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        disptch(updateFail());
        toast.error(data.message);
        return;
      }
      toast.success("Profle Updated!");

      disptch(updateSuccess(data));
    } catch (error: any) {
      toast.error(error.message);
      disptch(updateFail());
    }
  };

  const addLanAndEducation = async (
    formData: CivilUserType | EducationType
  ) => {
    try {
      disptch(fetchStart());
      const res = await fetch(
        `${BACKEND_API_URL}/api/user/addLanAndEducation`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        disptch(updateFail());
        toast.error(data.message);
        console.log("not ok", data);
        return;
      }
      toast.success("new changes success!");
      disptch(updateSuccess(data));
    } catch (error: any) {
      toast.error(error.message);
      disptch(updateFail());
    }
  };

  const UpdateOther = async (
    formData:
      | CivilUserType
      | ProjectsType
      | workExperienceType
      | UserSkillFormData
      | string,
    API_ROOT: string
  ) => {
    try {
      disptch(fetchStart());

      const res = await fetch(`${BACKEND_API_URL}/api/user/${API_ROOT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        disptch(updateFail());
        toast.error(data.message);
        return;
      }
      toast.success("new changes success!");
      disptch(updateSuccess(data));
    } catch (error: any) {
      disptch(updateFail());
      toast.error(error.message);
      console.log(`Erorr while Update Other`, error);
    }
  };

  const DeleteProject = async (id: string | any) => {
    try {
      disptch(fetchStart());
      const res = await fetch(
        `${BACKEND_API_URL}/api/user/delete-Project/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        toast(data?.message);
        disptch(fetchFail());
        return;
      }
      toast.success("Project Deleted success");
      disptch(updateSuccess(data.updatedUser));
    } catch (error: any) {
      console.log(`Error while delete Projects`, error.message);
    }
  };
  return { update, addLanAndEducation, UpdateOther, DeleteProject };
};

export default useUpdateUser;
