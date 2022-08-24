import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Td = (props: Props) => {
  return (
    <td className="border-t-2 border-gray-200 px-4 py-3">{props.children}</td>
  );
};

export default Td;
