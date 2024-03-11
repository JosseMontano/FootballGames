import { useForm } from "react-hook-form";
import BtnForm from "../../../Global/components/BtnForm";
import FormComponent from "../../../Global/components/Form";
import UseModal from "../../../Global/hooks/useModal";
import { PersonDTO } from "./Dto/Person";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreatePerson } from "./Validations/FormCreatPerson";
import Input from "../../../Global/components/input";
import BtnBasic from "../../../Global/components/BtnBasic";
import TableComponent from "../../../Global/components/Table";
import { ReactNode } from "react";

const Person = () => {
  const { ShowModalJSX, handleCloseModal, handleOpenModal } = UseModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonDTO>({
    resolver: zodResolver(schemaCreatePerson),
  });

  const handleForm = async (data: PersonDTO) => {
    console.log(data);
  };

  // get data
  const data: PersonDTO[] = [
    { name: "John Doe", lastName: "john@example.com", ci: "123" },
    { name: "Jane Doe", lastName: "jane@example.com", ci: "123" },
    // add more data here
  ];

  const columnsTable = ["Nombre", "Apellidos", "CI"];

  function bodyTableJSX(children: () => JSX.Element) {
    return (
      <>
        {data.map((item) => (
          <tr key={item.lastName}>
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.lastName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.ci}</td>
            {children()}
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <BtnBasic onClick={handleOpenModal} txt="Crear datos" />
        {ShowModalJSX(
          <>
            <FormComponent
              handleForm={handleForm}
              handleSubmit={handleSubmit}
              title="Crear titular"
            >
              <Input
                error={errors.name}
                label="Nombre"
                placeholder="carlos"
                register={register("name")}
                type="text"
              />

              <Input
                error={errors.lastName}
                label="Apellidos"
                placeholder="Villaroel"
                register={register("lastName")}
                type="text"
              />

              <Input
                error={errors.ci}
                label="CI"
                placeholder="8021947"
                register={register("ci")}
                type="text"
              />

              <BtnForm msg="Crear titular" />
            </FormComponent>
          </>
        )}
      </div>

      <TableComponent
        columnsTable={columnsTable}
        bodyTableJSX={bodyTableJSX}
        handleDelete={() => {
          alert("delte");
        }}
        handleEdit={() => {
          alert("edit");
        }}
      />
    </>
  );
};

export default Person;
