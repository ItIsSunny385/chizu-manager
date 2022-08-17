interface Props {
  children: string;
}

const Button = (props: Props) => {
  return (
    <button
      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded text-right"
      type="button"
    >
      {props.children}
    </button>
  );
};

export default Button;
