import { Map } from "../types";

export const getAllMaps = async (): Promise<Array<Map>> => {
    return [{
        id: "31-A",
        name: "31-A",
        description: "サンプルコメント"
    }, {
        id: "31-B",
        name: "31-B",
        description: "サンプルコメント"
    },];
}