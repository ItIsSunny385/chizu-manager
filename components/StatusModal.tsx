import { useState } from "react";
import { Status } from "../types/db";
import { getMarkerBase64 } from "../utils/marker";
import Button from "./Button";
import FormField from "./FormField";
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
        <FormField>
          <Label>名前</Label>
          <Input
            defaultValue={props.target.name}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, name: e.target.value };
              });
            }}
            maxLength={4}
          />
        </FormField>
        <FormField>
          <Label>略称</Label>
          <Input
            defaultValue={props.target.abb}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, abb: e.target.value };
              });
            }}
            maxLength={1}
          />
        </FormField>
        <FormField>
          <Label>色</Label>
          <input
            defaultValue={props.target.color}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, color: e.target.value };
              });
            }}
            type="color"
          />
        </FormField>
        <FormField>
          <Label>文字色</Label>
          <input
            defaultValue={props.target.letterColor}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, letterColor: e.target.value };
              });
            }}
            type="color"
          />
        </FormField>
        <FormField>
          <img
            src={getMarkerBase64(
              newTarget.color,
              newTarget.abb,
              newTarget.letterColor
            )}
            width="40px"
            height="40px"
          />
        </FormField>
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
