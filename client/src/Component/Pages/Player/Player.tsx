import UseModal from "../../../Global/hooks/useModal";
import Input from "../../../Global/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerFormDTO } from "./Dtos/PlayerForm";
import FormComponent from "../../../Global/components/Form";
import { PlayerFormSchema } from "./Validations/FormPlayer";
import BtnForm from "../../../Global/components/BtnForm";
import SelectComp from "../../../Global/components/Select";
import BtnBasic from "../../../Global/components/BtnBasic";
import { TeamResType } from "../../../Shared/Interfaces/Team";
import useFetch from "../../../Global/hooks/UseFetch";
import { getTeams } from "../../../Shared/Services/Team";
import { PostPlayer, getPlayers } from "./Services/player";
import { Toaster, toast } from "react-hot-toast";
import BtnLoader from "../../../Global/components/BtnLoader";
import { useState } from "react";
import TableComponent from "../../../Global/components/Table";
import { PlayerResType } from "./Res/PlayerRes";

const Player = () => {
  const { handleOpenModal, ShowModalJSX, handleCloseModal } = UseModal();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerFormDTO>({
    resolver: zodResolver(PlayerFormSchema),
  });

  const { data } = useFetch<TeamResType>({ services: getTeams });
  const showTeamsJSX = () => {
    return data.map((team) => <option value={team.id}>{team.name}</option>);
  };

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

  //table
  const columnsTable = [
    "CI",
    "Nombres",
    "Apellidos",
    "Fecha de nacimiento",
    "Celular",
    "Edad",
    "Equipo",
  ];

  //body table
  const { data: players } = useFetch<PlayerResType>({ services: getPlayers });
  const bodyTableJSX = (children: () => JSX.Element) => {
    return players.map((player) => (
      <tr>
        <td>{player.ci}</td>
        <td>{player.names}</td>
        <td>{player.lastnames}</td>
        <td>{player.date}</td>
        <td>{player.cellphone}</td>
        <td>{player.age}</td>
        <td>{player.team.name}</td>
        {children()}
      </tr>
    ));
  };

  //delete
  const handleDelete = () => {
    console.log("delete");
  };

  //edit
  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <>
      <BtnBasic onClick={handleOpenModal} txt="Crear datos" />

      {ShowModalJSX(
        <>
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
        </>
      )}

      <TableComponent
        columnsTable={columnsTable}
        handleDelete={() => handleDelete()}
        handleEdit={() => handleEdit()}
        bodyTableJSX={bodyTableJSX}
      />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Player;
