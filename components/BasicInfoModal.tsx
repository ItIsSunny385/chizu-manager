import { useState } from "react";
import { Chizu } from "../types/db";
import Button from "./Button";
import FormField from "./FormField";
import Input from "./Input";
import Label from "./Label";
import Modal from "./Modal";

interface Props {
  target: Chizu;
  onSave: (chizu: Chizu) => Promise<void>;
  onCancel: (() => void) | undefined;
}

const BasicInfoModal = (props: Props) => {
  const [newTarget, setNewTarget] = useState(props.target);

  return (
    <Modal title="基本情報設定">
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
            maxLength={16}
          />
        </FormField>
        <FormField>
          <Label>説明</Label>
          <Input
            defaultValue={props.target.description}
            onChange={(e) => {
              setNewTarget((x) => {
                return { ...x, description: e.target.value };
              });
            }}
            maxLength={128}
          />
        </FormField>
        <div className="text-right">
          {props.onCancel != null && (
            <Button className="ml-auto" onClick={props.onCancel}>
              キャンセル
            </Button>
          )}
          <Button
            className={`mr-1 ${props.onCancel != null ? "ml-1" : "ml-auto"}`}
            onClick={async () => await props.onSave(newTarget)}
          >
            OK
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BasicInfoModal;
