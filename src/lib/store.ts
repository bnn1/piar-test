import { STATIONS, USERS } from 'common/routes/api';
import {
  CreateStation,
  CreateUser,
  Station,
  UpdateStation,
  UpdateUser,
  User,
} from 'common/types/users';
import create from 'zustand';

import { fetch } from './fetch';

export { useStore };

type Store = {
  stations: Station[];
  users: User[];
  createStation: (station: CreateStation, jwt: string, errorMsg?: string) => void;
  createUser: (user: CreateUser, errorMsg?: string) => void;
  updateStation: (id: number, station: UpdateStation, jwt: string, errorMsg?: string) => void;
  updateUser: (id: number, station: UpdateUser, jwt: string, errorMsg?: string) => void;
  deleteStation: (id: number, jwt: string, errorMsg?: string) => void;
  deleteUser: (id: number, jwt: string, errorMsg?: string) => void;
  retrieveStations: (jwt: string, errorMsg?: string) => void;
  retrieveUsers: (jwt: string, errorMsg?: string) => void;
  error: string;
  setError: (msg: string) => void;
  success: string;
  setSuccess: (msg: string) => void;
};

const useStore = create<Store>((set) => ({
  stations: [],
  users: [],
  error: '',
  setError: (msg: string) => set({ error: msg }),
  success: '',
  setSuccess: (msg: string) => set({ success: msg }),
  createStation: async (
    data,
    jwt,
    errorMsg = 'Не удалось создать станцию. Попробуйте позднее.'
  ) => {
    const { error, data: station } = await fetch.post<Station>(STATIONS.CREATE.URL, data, jwt);

    if (error) set({ error: errorMsg });
    if (station)
      set((state) => ({ stations: [...state.stations, station], success: 'Успешно!' }));
  },
  createUser: async (
    data,
    errorMsg = 'Не удалось создать пользователя. Попробуйте позднее.'
  ) => {
    const { error, data: user } = await fetch.post<User>(USERS.CREATE.URL, data);

    if (error) set({ error: errorMsg });
    if (user) set((state) => ({ users: [...state.users, user], success: 'Успешно!' }));
  },
  updateStation: async (
    id,
    updateData,
    jwt,
    errorMsg = 'Произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: updatedStation } = await fetch.patch<Station>(
      STATIONS.UPDATE.URL(id),
      updateData,
      jwt
    );

    if (error) set({ error: errorMsg });
    if (updatedStation)
      set((state) => ({
        stations: state.stations.map((station) =>
          station.id === id ? updatedStation : station
        ),
        success: 'Успешно!',
      }));
  },
  updateUser: async (
    id,
    updateData,
    jwt,
    errorMsg = 'Произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: updatedUser } = await fetch.patch<User>(
      USERS.UPDATE.URL(id),
      updateData,
      jwt
    );

    if (error) set({ error: errorMsg });
    if (updatedUser)
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        success: 'Успешно!',
      }));
  },
  deleteStation: async (id, jwt, errorMsg = 'Произошла ошибка. Попробуйте позднее.') => {
    const { error } = await fetch.delete(STATIONS.DELETE.URL(id), jwt);

    if (error) set({ error: errorMsg });
    else
      set((state) => ({
        stations: state.stations.filter((station) => station.id !== id),
        success: 'Успешно!',
      }));
  },
  deleteUser: async (id, jwt, errorMsg = 'Произошла ошибка. Попробуйте позднее.') => {
    const { error } = await fetch.delete(USERS.DELETE.URL(id), jwt);

    if (error) set({ error: errorMsg });
    else
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        success: 'Успешно!',
      }));
  },
  retrieveStations: async (
    jwt,
    errorMsg = 'При загрузке станций произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: stations } = await fetch.get<Station[]>(STATIONS.LIST.URL, jwt);

    if (error) set({ error: errorMsg });
    if (stations) set({ stations });

    return stations;
  },
  retrieveUsers: async (
    jwt,
    errorMsg = 'При загрузке пользователей произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: users } = await fetch.get<User[]>(USERS.LIST.URL, jwt);

    if (error) set({ error: errorMsg });
    if (users) set({ users });

    return users;
  },
}));
