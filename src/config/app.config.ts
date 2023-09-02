interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Team Member', 'Business Owner'],
  tenantName: 'Account',
  applicationName: 'UpscaleGenius',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage UpscaleGenius account',
    'Upload and download upscaled images',
    'Select the upscaling factor for images',
    'Integrate with automation platforms',
    'Invite Team Members to the account',
  ],
};
