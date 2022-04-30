export type { User };

type User = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  updated_at: string | null;
  login: string;
};
