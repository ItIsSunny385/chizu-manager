export interface Converter<T> {
  toData: (instance: T) => any;
  toInstance: (data: any) => T;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  order: number;
}

export const StatusConverter: Converter<Status> = {
  toData: (instance: Status) => {
    return {
      id: instance.id,
      name: instance.name,
      color: instance.color,
      order: instance.order,
    };
  },
  toInstance: (data: any) => {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      order: data.order,
    };
  },
};

export interface Config {
  id: string;
  defaultLatitude: number;
  defaultLongitude: number;
  defaultZ: number;
}

export const ConfigConverter: Converter<Config> = {
  toData: (instance: Config) => {
    return {
      id: instance.id,
      defaultLatitude: instance.defaultLatitude,
      defaultLongitude: instance.defaultLongitude,
      defaultZ: instance.defaultZ,
    };
  },
  toInstance: (data: any) => {
    return {
      id: data.id,
      defaultLatitude: data.defaultLatitude,
      defaultLongitude: data.defaultLongitude,
      defaultZ: data.defaultZ,
    };
  },
};
