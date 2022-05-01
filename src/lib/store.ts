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
  createStation: (station: CreateStation, jwt: string) => void;
  createUser: (user: CreateUser) => void;
  updateStation: (id: number, station: UpdateStation, jwt: string) => void;
  updateUser: (id: number, station: UpdateUser, jwt: string) => void;
  deleteStation: (id: number, jwt: string) => void;
  deleteUser: (id: number, jwt: string) => void;
  retrieveStations: (jwt: string) => void;
  retrieveUsers: (jwt: string) => void;
};

const useStore = create<Store>((set) => ({
  stations: [],
  users: [],
  createStation: async (data, jwt) => {
    const { data: station } = await fetch.post(STATIONS.CREATE.URL, data, {
      headers: { 'user-jwt': jwt },
    });

    set((state) => ({ stations: [...state.stations, station] }));
  },
  createUser: async (data) => {
    const { data: user } = await fetch.post(USERS.CREATE.URL, data);

    set((state) => ({ users: [...state.users, user] }));
  },
  updateStation: async (id, updateData, jwt) => {
    const { data: updatedStation } = await fetch.patch(STATIONS.UPDATE.URL(id), updateData, {
      headers: { 'user-jwt': jwt },
    });

    set((state) => ({
      stations: state.stations.map((station) =>
        station.id === id ? updatedStation : station
      ),
    }));
  },
  updateUser: async (id, updateData, jwt) => {
    const { data: updatedUser } = await fetch.patch(USERS.UPDATE.URL(id), updateData, {
      headers: { 'user-jwt': jwt },
    });

    set((state) => ({
      users: state.users.map((user) => (user.id === id ? updatedUser : user)),
    }));
  },
  deleteStation: async (id, jwt) => {
    await fetch.delete(STATIONS.DELETE.URL(id), {
      headers: { 'user-jwt': jwt },
    });

    set((state) => ({ stations: state.stations.filter((station) => station.id !== id) }));
  },
  deleteUser: async (id, jwt) => {
    await fetch.delete(USERS.DELETE.URL(id), {
      headers: { 'user-jwt': jwt },
    });

    set((state) => ({ stations: state.stations.filter((station) => station.id !== id) }));
  },
  retrieveStations: async (jwt) => {
    const { data: stations } = await fetch.get(STATIONS.LIST.URL, {
      headers: { 'user-jwt': jwt },
    });

    set({ stations });

    return stations;
  },
  retrieveUsers: async (jwt) => {
    const { data: users } = await fetch.get(USERS.LIST.URL, {
      headers: { 'user-jwt': jwt },
    });

    set({ users });

    return users;
  },
}));
