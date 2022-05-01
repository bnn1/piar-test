import { AlertColor } from '@mui/material';

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
  snack: { msg: string; type: AlertColor; show: boolean };
  setSnack: (options: Partial<Store['snack']>) => void;
};

const useStore = create<Store>((set) => ({
  stations: [],
  users: [],
  snack: { msg: '', type: 'success', show: false },
  setSnack: (options) => set((state) => ({ snack: { ...state.snack, ...options } })),
  createStation: async (
    data,
    jwt,
    errorMsg = 'Не удалось создать станцию. Попробуйте позднее.'
  ) => {
    const {
      error,
      message,
      data: station,
    } = await fetch.post<Station>(STATIONS.CREATE.URL, data, jwt);

    if (error) set({ snack: { msg: message || errorMsg, show: true, type: 'error' } });
    if (station)
      set((state) => ({
        stations: [...state.stations, station],
        snack: { msg: 'Успешно!', show: true, type: 'success' },
      }));
  },
  createUser: async (
    data,
    errorMsg = 'Не удалось создать пользователя. Попробуйте позднее.'
  ) => {
    const { error, message, data: user } = await fetch.post<User>(USERS.CREATE.URL, data);

    if (error) set({ snack: { msg: message || errorMsg, show: true, type: 'error' } });
    if (user)
      set((state) => ({
        users: [...state.users, user],
        snack: { msg: 'Успешно!', show: true, type: 'success' },
      }));
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

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    if (updatedStation)
      set((state) => ({
        stations: state.stations.map((station) =>
          station.id === id ? updatedStation : station
        ),
        snack: { msg: 'Успешно!', show: true, type: 'success' },
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

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    if (updatedUser)
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        snack: { msg: 'Успешно!', show: true, type: 'success' },
      }));
  },
  deleteStation: async (id, jwt, errorMsg = 'Произошла ошибка. Попробуйте позднее.') => {
    const { error } = await fetch.delete(STATIONS.DELETE.URL(id), jwt);

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    else
      set((state) => ({
        stations: state.stations.filter((station) => station.id !== id),
        snack: { msg: 'Успешно!', show: true, type: 'success' },
      }));
  },
  deleteUser: async (id, jwt, errorMsg = 'Произошла ошибка. Попробуйте позднее.') => {
    const { error } = await fetch.delete(USERS.DELETE.URL(id), jwt);

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    else
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        snack: { msg: 'Успешно!', show: true, type: 'success' },
      }));
  },
  retrieveStations: async (
    jwt,
    errorMsg = 'При загрузке станций произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: stations } = await fetch.get<Station[]>(STATIONS.LIST.URL, jwt);

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    if (stations) set({ stations });

    return stations;
  },
  retrieveUsers: async (
    jwt,
    errorMsg = 'При загрузке пользователей произошла ошибка. Попробуйте позднее.'
  ) => {
    const { error, data: users } = await fetch.get<User[]>(USERS.LIST.URL, jwt);

    if (error) set({ snack: { msg: errorMsg, show: true, type: 'error' } });
    if (users) set({ users });

    return users;
  },
}));
