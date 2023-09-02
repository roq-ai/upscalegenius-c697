import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface ImageInterface {
  id?: string;
  original_size: number;
  upscaled_size: number;
  upscale_factor: number;
  account_id: string;
  created_at?: any;
  updated_at?: any;

  account?: AccountInterface;
  _count?: {};
}

export interface ImageGetQueryInterface extends GetQueryInterface {
  id?: string;
  account_id?: string;
}
