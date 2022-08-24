import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Tbody = (props: Props) => {
  return <tbody>{props.children}</tbody>;
};

export default Tbody;
