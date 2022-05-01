export type { CreateStation, CreateUser, Station, UpdateStation, UpdateUser, User };

type User = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  updated_at: string | null;
  login: string;
};

type Station = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  updated_at: string;
  api_key: string;
};

type CreateUser = {
  name: string;
  comment?: string;
  login: string;
  password: string;
};

type CreateStation = {
  name: string;
  comment?: string;
};

type UpdateStation = Partial<CreateStation>;

type UpdateUser = Partial<CreateUser>;
