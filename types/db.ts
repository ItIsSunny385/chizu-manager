export interface Converter<T> {
  toData: (instance: T) => any;
  toInstance: (data: any) => T;
}

export interface Status {
  id: string;
  name: string;
  abb: string;
  color: string;
  letterColor: string;
  order: number;
}

export const StatusConverter: Converter<Status> = {
  toData: (instance: Status) => {
    return {
      id: instance.id,
      name: instance.name,
      abb: instance.abb,
      color: instance.color,
      letterColor: instance.letterColor,
      order: instance.order,
    };
  },
  toInstance: (data: any) => {
    return {
      id: data.id,
      name: data.name,
      abb: data.abb,
      color: data.color,
      letterColor: data.letterColor,
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

export interface Chizu {
  id: string;
  name: string;
  description: string;
}

export const ChizuConverter: Converter<Chizu> = {
  toData: (instance: Chizu) => {
    return {
      id: instance.id,
      name: instance.name,
      description: instance.description,
    };
  },
  toInstance: (data: any) => {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  },
};
