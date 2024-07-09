import { useForm } from "react-hook-form";
import { DivisionResType } from "../Types/DivisionsRes";
import { DivisionFormDTO } from "../Dtos/DivisionFormDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { DivisionFormDtoSchema } from "../Validations/FormDivision";
import { useState } from "react";
import { PostDivision, PutDivision } from "../Services/Divisions";
import toast from "react-hot-toast";
import FormComponent from "../../../../Global/components/Form";
import Input from "../../../../Global/components/Input";
import BtnForm from "../../../../Global/components/BtnForm";
import BtnLoader from "../../../../Global/components/BtnLoader";

interface Props {
  handleCloseModal: () => void;
  division: DivisionResType;
  getDataTeams: () => Promise<void>;
}
const FormDivision = ({ division, getDataTeams, handleCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DivisionFormDTO>({
    resolver: zodResolver(DivisionFormDtoSchema),
    values: division,
  });

  const [loader, setLoader] = useState(false);

  const handleForm = async (data: DivisionFormDTO) => {
    setLoader(true);

    let res;
    if (division.id) {
      res = await PutDivision(data, division.id);
    } else {
      res = await PostDivision(data);
    }
    if (res.status == 201 || res.status == 200) {
      await getDataTeams();
      toast.success(res.message, { duration: 3000 });
      handleCloseModal();
    } else toast.error(res.message, { duration: 3000 });
    setLoader(false);
  };

  const msgBtn = division.id ? "Editar Division" : "Crear Division";

  return (
    <FormComponent
      handleForm={handleForm}
      handleSubmit={handleSubmit}
      title="Crear Division"
    >
      <div className="flex flex-row gap-3">
        <Input
          error={errors.name}
          label="Nombre de la division"
          placeholder="Primera"
          register={register("name")}
          type="text"
        />
      </div>

      {!loader ? <BtnForm msg={msgBtn} /> : <BtnLoader txt={msgBtn} />}
    </FormComponent>
  );
};

export default FormDivision;
