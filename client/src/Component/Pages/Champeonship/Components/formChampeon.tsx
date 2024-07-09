import { useForm } from "react-hook-form";
import { ChampeonRes } from "../Res/ChampeonRes";
import { ChampeonFormDto } from "../Dtos/ChampeonForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChampeonFormSchema } from "../Validations/champeon";
import { useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../../../../Global/hooks/UseFetch";
import { PostChampeon, PutChampeon } from "../Services/ChampeonShip";
import FormComponent from "../../../../Global/components/Form";
import Input from "../../../../Global/components/Input";
import BtnForm from "../../../../Global/components/BtnForm";
import BtnLoader from "../../../../Global/components/BtnLoader";

interface Props {
  handleCloseModal: () => void;
  champeon: ChampeonRes;
  getDataChampeon: () => Promise<void>;
}
const FormChampeon = ({
  champeon,
  getDataChampeon,
  handleCloseModal,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChampeonFormDto>({
    resolver: zodResolver(ChampeonFormSchema),
    values: champeon,
  });

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: ChampeonFormDto) => {
    setLoader(true);

    let res;
    if (champeon.id) {
      res = await PutChampeon(data, champeon.id);
    } else {
      res = await PostChampeon(data);
    }
    if (res.status == 200 || res.status == 201) {
      await getDataChampeon();
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const msgBtn = champeon.id ? "Editar" : "Crear";
  const titleForm = champeon.id ? "Editar Campeonato" : "Crear Campeonato";
  return (
    <FormComponent
      handleForm={handleForm}
      handleSubmit={handleSubmit}
      title={titleForm}
    >
      <div className="flex flex-row gap-3">
        <div>
          <Input
            error={errors.name}
            label="Nombre del campeonato"
            placeholder="Bolivar vs Wilster"
            register={register("name")}
            type="text"
          />

          <Input
            error={errors.amountteams}
            label="Cantidad de equipos"
            placeholder="2"
            register={register("amountteams")}
            type="number"
          />

          <Input
            error={errors.type}
            label="Tipo"
            placeholder="Futbol"
            register={register("type")}
            type="text"
          />

          <Input
            error={errors.datestart}
            label="Fecha de inicio"
            placeholder="2021-09-10"
            register={register("datestart")}
            type="text"
          />

          <Input
            error={errors.dateend}
            label="Fecha de fin"
            placeholder="2021-09-15"
            register={register("dateend")}
            type="text"
          />
        </div>
      </div>

      {!loader ? <BtnForm msg={msgBtn} /> : <BtnLoader txt={msgBtn} />}
    </FormComponent>
  );
};

export default FormChampeon;
