import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactElement,
} from "react";

interface Props {
  children?: ReactElement | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input = (props: Props) => {
  return (
    <input
      className="appearance-none border-2 border-gray-00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none bg-white focus:border-purple-500"
      type={props.type}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {props.children}
    </input>
  );
};

export default Input;
