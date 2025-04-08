export interface INavigationRoute {
    name: string
    displayName: string
    meta: { icon: string }
    children?: INavigationRoute[]
  }
  
  export default {
    root: {
      name: '/',
      displayName: 'Home',
    },
    routes: [
      {
        name: 'dashboard',
        displayName: 'Dashboard',
        meta: {
          icon: 'vuestic-iconset-dashboard',
        },
      },
      {
        name: 'member',
        displayName: 'Member',
        meta: {
          icon: 'group',
        },
      },
    //   {
    //     name: 'payments',
    //     displayName: 'menu.payments',
    //     meta: {
    //       icon: 'credit_card',
    //     },
    //     children: [
    //       {
    //         name: 'payment-methods',
    //         displayName: 'menu.payment-methods',
    //       },
    //       {
    //         name: 'pricing-plans',
    //         displayName: 'menu.pricing-plans',
    //       },
    //       {
    //         name: 'billing',
    //         displayName: 'menu.billing',
    //       },
    //     ],
    //   },
      
    ] as INavigationRoute[],
  }