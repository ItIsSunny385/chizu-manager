import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Table = (props: Props) => {
  return (
    <table className="table-auto w-full text-left whitespace-no-wrap">
      {props.children}
    </table>
  );
};

export default Table;
