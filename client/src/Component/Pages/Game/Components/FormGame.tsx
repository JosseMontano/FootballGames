import { useForm } from "react-hook-form";
import { GameRes } from "../Res/GameRes";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameFormDto } from "../Dtos/Game";
import { GameFormDtoSchema } from "../Validations/FormGame";
import { useState } from "react";
import { PostGame, PutGame } from "../Services/game";
import toast from "react-hot-toast";
import useFetch from "../../../../Global/hooks/UseFetch";
import { TeamResType } from "../../Team/Res/TeamRes";
import { getTeams } from "../../../../Shared/Services/Team";
import FormComponent from "../../../../Global/components/Form";
import Input from "../../../../Global/components/Input";
import SelectComp from "../../../../Global/components/Select";
import BtnForm from "../../../../Global/components/BtnForm";
import BtnLoader from "../../../../Global/components/BtnLoader";
import { getChampeons } from "../../Champeonship/Services/ChampeonShip";
import { ChampeonRes } from "../../Champeonship/Res/ChampeonRes";

interface Props {
  handleCloseModal: () => void;
  game: GameRes;
  getDataGames: () => Promise<void>;
}

const FormGame = ({ handleCloseModal, game, getDataGames }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormDto>({
    resolver: zodResolver(GameFormDtoSchema),
    defaultValues: game,
  });

  //vars form
  const isEdit = Object.keys(game).length > 0;
  const title = isEdit ? "Editar juego" : "Crear juego";
  const btn = isEdit ? "Editar" : "Crear";

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: GameFormDto) => {
    setLoader(true);
    console.log(data);
    let res;
    if (isEdit) {
      res = await PutGame(data, game.id);
    } else {
      res = await PostGame(data);
    }

    if (res.status == 200) {
      await getDataGames();
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const { data: localTeamsData } = useFetch<TeamResType>({
    services: getTeams,
  });

  const showLocalTeamsJSX = () => {
    return localTeamsData.map((v) => (
      <option value={v.id} selected={v.id == game.localteamid}>
        {v.name}
      </option>
    ));
  };

  const { data: visitorTeamsData } = useFetch<TeamResType>({
    services: getTeams,
  });

  const showVisitorTeamsJSX = () => {
    return visitorTeamsData.map((v) => (
      <option value={v.id} selected={v.id == game.visitorteamid}>
        {v.name}
      </option>
    ));
  };

  const { data: champeonshipData } = useFetch<ChampeonRes>({
    services: getChampeons,
  });

  const showChampeonshipJSX = () => {
    return champeonshipData.map((v) => (
      <option value={v.id} selected={v.id == game.champeonshipid}>
        {v.name}
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
          <SelectComp
            register={register("champeonshipid")}
            error={errors.champeonshipid}
            label="Campeonato"
            showJSX={() => showChampeonshipJSX()}
          />

          <SelectComp
            register={register("localteamid")}
            error={errors.localteamid}
            label="Equipo local"
            showJSX={() => showLocalTeamsJSX()}
          />

          <SelectComp
            register={register("visitorteamid")}
            error={errors.visitorteamid}
            label="Equipo visitante"
            showJSX={() => showVisitorTeamsJSX()}
          />

          <Input
            error={errors.date}
            label="Fecha"
            placeholder="2024-05-22"
            register={register("date")}
            type="text"
          />

          {isEdit && (
            <>
              <Input
                error={errors.amountGoalsLocal}
                label="Goles del local"
                placeholder="1"
                register={register("amountGoalsLocal")}
                type="text"
              />
              <Input
                error={errors.amountGoalsVisitor}
                label="Goles del visitor"
                placeholder="2"
                register={register("amountGoalsVisitor")}
                type="text"
              />
            </>
          )}
        </div>
      </div>

      {!loader ? <BtnForm msg={btn} /> : <BtnLoader txt={btn} />}
    </FormComponent>
  );
};

export default FormGame;
