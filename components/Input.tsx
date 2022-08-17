import { HTMLInputTypeAttribute, ReactElement } from "react";

interface Props {
  children?: ReactElement | undefined;
  type?: HTMLInputTypeAttribute | undefined;
}

const Input = (props: Props) => {
  return (
    <input
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type={props.type}
    >
      {props.children}
    </input>
  );
};

export default Input;
