const mapping: Record<string, string> = {
  accounts: 'account',
  images: 'image',
  integrations: 'integration',
  invitations: 'invitation',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
