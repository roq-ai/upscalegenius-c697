import { ImageInterface } from 'interfaces/image';
import { IntegrationInterface } from 'interfaces/integration';
import { InvitationInterface } from 'interfaces/invitation';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  image?: ImageInterface[];
  integration?: IntegrationInterface[];
  invitation?: InvitationInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    image?: number;
    integration?: number;
    invitation?: number;
    team_member?: number;
  };
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
