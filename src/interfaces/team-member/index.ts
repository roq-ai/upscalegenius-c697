import { UserInterface } from 'interfaces/user';
import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id: string;
  account_id: string;
  joined_at?: any;
  role: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  account?: AccountInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  account_id?: string;
  role?: string;
  status?: string;
}
