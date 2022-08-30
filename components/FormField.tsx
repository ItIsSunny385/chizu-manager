import { ReactElement } from "react";

interface Props {
  children: ReactElement | ReactElement[];
}

const FormField = (props: Props) => {
  return <div className="w-full my-3">{props.children}</div>;
};

export default FormField;
