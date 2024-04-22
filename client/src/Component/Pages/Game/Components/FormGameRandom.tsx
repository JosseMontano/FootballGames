import { useForm } from "react-hook-form";
import { GameRes } from "../Res/GameRes";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameFormDto, GamesRandomFormDto } from "../Dtos/Game";
import { GameFormDtoSchema } from "../Validations/FormGame";
import { useState } from "react";
import { PostGame, PostGameRandom, PutGame } from "../Services/game";
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

const FormGameRandom = ({ handleCloseModal, game, getDataGames }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GamesRandomFormDto>({
    resolver: zodResolver(GameFormDtoSchema),
    defaultValues: game,
  });

  //vars form
  const title = "Crear juego";
  const btn = "Crear";

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: GameFormDto) => {
    setLoader(true);
    let res;

    res = await PostGameRandom(data);

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
        </div>
      </div>

      {!loader ? <BtnForm msg={btn} /> : <BtnLoader txt={btn} />}
    </FormComponent>
  );
};

export default FormGameRandom;
