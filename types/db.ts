export interface Converter<T> {
    toData: (instance: T) => any,
    toInstance: (data: any) => T,
}

export interface Status {
    id: string,
    name: string,
    color: string,
    order: number,
}

export const StatusConverter: Converter<Status> = {
    toData: (instance: Status) => {
        return {
            id: instance.id,
            name: instance.name,
            color: instance.color,
            order: instance.order
        };
    },
    toInstance: (data: any) => {
        return {
            id: data.id,
            name: data.name,
            color: data.color,
            order: data.order
        };
    }
}