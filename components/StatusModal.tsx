import { useState } from "react";
import { Status } from "../types/db";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import Modal from "./Modal";

interface Props {
  target: Status;
  onClickCanel: () => void;
  onClickOK: (status: Status) => void;
}

const StatusModal = (props: Props) => {
  const [newTarget, setNewTarget] = useState(props.target);

  return (
    <Modal title="ステータス追加編集">
      <form>
        <div className="w-full my-3">
          <Label>名前</Label>
          <Input
            defaultValue={props.target.name}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="w-full my-3">
          <Label>色</Label>
          <Input
            defaultValue={props.target.color}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, color: e.target.value };
              });
            }}
          />
        </div>
        <div className="text-right">
          <Button className="ml-auto" onClick={props.onClickCanel}>
            キャンセル
          </Button>
          <Button className="mx-1" onClick={() => props.onClickOK(newTarget)}>
            OK
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StatusModal;
