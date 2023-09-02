import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface IntegrationInterface {
  id?: string;
  platform_name: string;
  api_key: string;
  account_id: string;
  created_at?: any;
  updated_at?: any;

  account?: AccountInterface;
  _count?: {};
}

export interface IntegrationGetQueryInterface extends GetQueryInterface {
  id?: string;
  platform_name?: string;
  api_key?: string;
  account_id?: string;
}
