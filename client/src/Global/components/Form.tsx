interface Props {
  children: JSX.Element[];
  handleSubmit: any;
  handleForm: (data: any) => Promise<void>;
  title: string;
}
const FormComponent = ({
  children,
  handleSubmit,
  handleForm,
  title,
}: Props) => {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {title}
      </h1>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="space-y-4 md:space-y-3"
        action="#"
      >
        {children}
      </form>
    </div>
  );
};

export default FormComponent;
