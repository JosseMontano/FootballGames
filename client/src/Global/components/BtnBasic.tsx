interface Props {
    onClick: () => void;
    txt:string
}
const BtnBasic = ({onClick, txt}: Props) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {txt}
    </button>
  );
};

export default BtnBasic;
