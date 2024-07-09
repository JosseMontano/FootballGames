import { useForm } from "react-hook-form";
import Input from "../../../../Global/components/Input";
import { TeamFormDTO } from "../Dtos/TeamForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamFormSchema } from "../Validations/FormTeam";
import FormComponent from "../../../../Global/components/Form";
import { useState } from "react";
import { PostTeam, PutTeam } from "../Services/team";
import toast from "react-hot-toast";
import useFetch from "../../../../Global/hooks/UseFetch";
import { getTeams } from "../../../../Shared/Services/Team";
import BtnForm from "../../../../Global/components/BtnForm";
import BtnLoader from "../../../../Global/components/BtnLoader";
import { TeamResType } from "../Res/TeamRes";
import SelectComp from "../../../../Global/components/Select";
import { DivisionResType } from "../../Divisions/Types/DivisionsRes";
import { getDivisions } from "../../Divisions/Services/Divisions";

interface Props {
  handleCloseModal: () => void;
  team: TeamResType;
  getDataTeams: () => Promise<void>;
}
const FormTeam = ({ handleCloseModal, team, getDataTeams }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormDTO>({
    resolver: zodResolver(TeamFormSchema),
    values: team,
  });

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: TeamFormDTO) => {
    setLoader(true);

    let res;
    if (team.id) {
      res = await PutTeam(data, team.id);
    } else {
      res = await PostTeam(data);
    }
    if (res.status == 201 || res.status == 200) {
      await getDataTeams();
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const msgBtn = team.id ? "Editar" : "Crear";

  const { data: divisionData } = useFetch<DivisionResType>({
    services: getDivisions,
  });

  const showDivisionJSX = () => {
    return divisionData.map((v) => (
      <option value={v.id} selected={v.id == team.divisionId}>
        {v.name}
      </option>
    ));
  };

  return (
    <FormComponent
      handleForm={handleForm}
      handleSubmit={handleSubmit}
      title="Formulario de Equipo"
    >
      <div className="flex flex-row gap-3">
        <div>
          <Input
            error={errors.name}
            label="Nombre del equipo"
            placeholder="Bolivar"
            register={register("name")}
            type="text"
          />
          <SelectComp
            register={register("divisionId")}
            error={errors.divisionId}
            label="Division"
            showJSX={() => showDivisionJSX()}
          />
        </div>
      </div>

      {!loader ? <BtnForm msg={msgBtn} /> : <BtnLoader txt={msgBtn} />}
    </FormComponent>
  );
};

export default FormTeam;
