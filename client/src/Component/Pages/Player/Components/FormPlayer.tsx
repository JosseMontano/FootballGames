import { useForm } from "react-hook-form";
import Input from "../../../../Global/components/Input";
import { PlayerFormDTO } from "../Dtos/PlayerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerFormSchema } from "../Validations/FormPlayer";
import FormComponent from "../../../../Global/components/Form";
import { useState } from "react";
import { PostPlayer, PutPlayer } from "../Services/player";
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
  getDataPlayers: () => Promise<void>;
}
const FormPlayer = ({ handleCloseModal, player, getDataPlayers }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerFormDTO>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: player,
  });

    //vars form
    const isEdit = Object.keys(player).length > 0;
    const title = isEdit ? "Editar jugador" : "Crear jugador";
    const btn = isEdit ? "Editar Jugador" : "Crear Jugador";

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: PlayerFormDTO) => {
    setLoader(true);
    data.photo = "jugador";

    let res;
    if (isEdit) {
      res = await PutPlayer(data, player.id);
    } else {
      res = await PostPlayer(data);
    }
    
    if (res.status == 200) {
      await getDataPlayers();
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const { data } = useFetch<TeamResType>({ services: getTeams });

  const showTeamsJSX = () => {
    return data.map((team) => (
      <option value={team.id} selected={team.id == player.teamid}>
        {team.name}
      </option>
    ));
  };

  return (
    <FormComponent
      handleForm={handleForm}
      handleSubmit={handleSubmit}
      title={title}
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

          <SelectComp
            register={register("teamid")}
            error={errors.teamid}
            label="Equipo"
            showJSX={() => showTeamsJSX()}
          />
        </div>
      </div>

      {!loader ? (
        <BtnForm msg={btn} />
      ) : (
        <BtnLoader txt={btn} />
      )}
    </FormComponent>
  );
};

export default FormPlayer;
