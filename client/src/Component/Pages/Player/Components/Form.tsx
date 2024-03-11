import { useForm } from "react-hook-form";
import Input from "../../../../Global/components/Input";
import { PlayerFormDTO } from "../Dtos/PlayerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerFormSchema } from "../Validations/FormPlayer";
import FormComponent from "../../../../Global/components/Form";
import { useState } from "react";
import { PostPlayer } from "../Services/player";
import toast from "react-hot-toast";
import SelectComp from "../../../../Global/components/Select";
import useFetch from "../../../../Global/hooks/UseFetch";
import { TeamResType } from "../../../../Shared/Interfaces/Team";
import { getTeams } from "../../../../Shared/Services/Team";
import BtnForm from "../../../../Global/components/BtnForm";
import BtnLoader from "../../../../Global/components/BtnLoader";
import { PlayerResType } from "../Res/PlayerRes";

interface Props {
  handleCloseModal: () => void;
  player: PlayerResType;
}
const FormPlayer = ({ handleCloseModal, player }: Props) => {
  console.log(player);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerFormDTO>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: player,
  });

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: PlayerFormDTO) => {
    setLoader(true);
    data.photo = "jugador";
    const res = await PostPlayer(data);
    console.log(res);
    if (res.status == 200) {
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const { data } = useFetch<TeamResType>({ services: getTeams });

  const showTeamsJSX = () => {
    return data.map((team) => <option value={team.id}>{team.name}</option>);
  };

  return (
    <FormComponent
      handleForm={handleForm}
      handleSubmit={handleSubmit}
      title="Crear jugador"
    >
      <div className="flex flex-row gap-3">
        <div>
          <Input
            error={errors.ci}
            label="CI"
            placeholder="8021947"
            register={register("ci")}
            type="text"
          />

          <Input
            error={errors.names}
            label="Nombres"
            placeholder="Veymar Benjamin"
            register={register("names")}
            type="text"
          />

          <Input
            error={errors.lastnames}
            label="Apellidos"
            placeholder="Gonzalez"
            register={register("lastnames")}
            type="text"
          />
        </div>

        <div>
          <Input
            error={errors.date}
            label="Fecha de nacimiento"
            placeholder="1999-12-12"
            register={register("date")}
            type="text"
          />

          <Input
            error={errors.cellphone}
            label="Celular"
            placeholder="1234567890"
            register={register("cellphone")}
            type="text"
          />

          <Input
            error={errors.age}
            label="Edad"
            placeholder="32"
            register={register("age")}
            type="number"
          />

          <SelectComp
            register={register("teamId")}
            error={errors.teamId}
            label="Equipo"
            showJSX={() => showTeamsJSX()}
          />
        </div>
      </div>

      {!loader ? (
        <BtnForm msg={"Crear Jugador"} />
      ) : (
        <BtnLoader txt={"Crear Jugador"} />
      )}
    </FormComponent>
  );
};

export default FormPlayer;
