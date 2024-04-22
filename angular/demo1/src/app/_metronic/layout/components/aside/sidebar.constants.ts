export interface SidebarItem {
  id: string;
  title: string;
  // subtitle?: string;
  type:
  // | 'aside'
    | 'basic'
    // | 'collapsable'
    | 'divider'
    | 'group'
    | 'spacer';
  hidden?: boolean;
  tooltip?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  authorities?: string[];
  routerLink?: string;
  exactMatch?: boolean;
  // externalLink?: boolean;
  meta?: any;
  children?: SidebarItem[];

}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    title: 'MENU.DASHBOARD',
    icon: './assets/media/icons/duotune/art/art002.svg',
    authorities: [],
    type: 'basic',
    routerLink: '/dashboard'
  },
  {
    id: 'builder',
    title: 'Layout Builder',
    type: 'basic',
    icon: './assets/media/icons/duotune/general/gen019.svg',
    authorities: [],
    routerLink: '/builder'
  },
  {
    id: 'Crafted',
    type: 'spacer',
    title: 'Crafted',
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: './assets/media/icons/duotune/general/gen022.svg',
    children: [
      {
        id: 'profile',
        type: 'group',

        // icon: '/crafted/pages/profile',
        title: 'Profile',

        // routerLink: '/crafted/pages/profile',
        children: [
          {
            id: 'overview',
            title: 'Overview',
            routerLink: '/crafted/pages/profile/overview',
            type: 'basic',

          }
        ]
      },
      {
        id: 'overview',
        title: 'Overview',
        // routerLink: '/crafted/pages/profile/overview',
        type: 'group',

      }
    ]
  },
  {
    id:'IAM',
    title: 'IAM',
    icon: './assets/media/icons/duotune/communication/com006.svg',
    type: 'group',
    children: [
      {
        id: 'overview',
        title: 'Overview',
        type: 'basic',
        routerLink: '/crafted/account/overview'
      },
      {
        id: 'user',
        title: 'User',
        type: 'basic',
        routerLink: '/users'
      }
    ]
  }
]
