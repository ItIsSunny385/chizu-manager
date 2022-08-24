import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Tr = (props: Props) => {
  return <tr>{props.children}</tr>;
};

export default Tr;
