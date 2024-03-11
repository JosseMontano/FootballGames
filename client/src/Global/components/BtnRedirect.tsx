interface Props {
  onClick: () => void;
  txt: string;
}
const BtnRedirect = ({ onClick, txt }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <a
        onClick={() => onClick()}
        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
      >
        {txt}
      </a>
    </div>
  );
};

export default BtnRedirect;
