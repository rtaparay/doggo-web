export interface SendMessagePayload {
  content: string;
  sitter_id: number;
  client_id: number;
}

export type Service = {
  id: number;
  title: string;
  price: number;
  sitter_id: number;
  created_at: string;
};

export type Sitter = {
  id: number;
  name: string;
  email: string;
  role: 'sitter';
  created_at: string;
};

export type SittersResponse = {
  sitters: Sitter[];
};

export type Message = {
  id: number;
  content: string;
  sitter_id: number;
  client_id: number;
  created_at: string;
};
