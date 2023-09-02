import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  invitee_email: string;
  status: string;
  account_id: string;
  created_at?: any;
  updated_at?: any;

  account?: AccountInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  invitee_email?: string;
  status?: string;
  account_id?: string;
}
