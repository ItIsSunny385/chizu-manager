import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const H2 = (props: Props) => {
  return (
    <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
      {props.children}
    </h2>
  );
};

export default H2;
