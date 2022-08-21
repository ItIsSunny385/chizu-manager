interface Props {
  children: string;
}

const Label = (props: Props) => {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {props.children}
    </label>
  );
};

export default Label;
