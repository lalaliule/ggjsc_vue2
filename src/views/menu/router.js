import cockpit from '@/components/Layout/index.vue'
// import index1 from './views/children/menu-1/cell/index.vue'
// import index2 from './views/children/menu-2/cell/index.vue'

export default () => (
  {
    path: '/cockpit',
    component: cockpit,
    redirect: '/cockpit/operation',
    meta: {
      title: '高管驾驶舱',
    },
    children: [
      {
        path: '/cockpit/operation',
        name: 'operation',
        component: () => import('./views/children/overallOperation/index.vue'),
        meta: {
          name: '整体经营情况',
        },
      },
      {
        path: '/cockpit/technology',
        name: 'technology',
        component: () => import('./views/children/technology/index.vue'),
        meta: {
          name: '资管业务',
        },
      },
      {
        path: '/cockpit/human',
        name: 'human',
        component: () => import('./views/children/humanSituation/index.vue'),
        meta: {
          name: '人力情况',
        },
      },
      {
        path: '/cockpit/credit',
        name: 'credit',
        component: () => import('./views/children/credit/index.vue'),
        meta: {
          name: '信用业务',
        },
      },
      {
        path: '/cockpit/retail',
        name: 'retail',
        // component: retail,
        component: () => import('./views/children/retail/index.vue'),
        meta: {
          name: '零售业务', // 主要经营指标/cockpit/retail/target  各业务详情/cockpit/retail/business
        },
        children: [
          {
            path: '/cockpit/retail/branch',
            name: 'branch',
            // component: branch,
            component: () => import('./views/children/retail/children/branch/index.vue'),
            meta: {
              name: '分支机构详情',
            },
          },
          {
            path: '/cockpit/retail/target',
            name: 'target',
            // component: target,
            component: () => import('./views/children/retail/children/target/index.vue'),
            meta: {
              name: '主要经营指标',
            },
          },
          {
            path: '/cockpit/retail/business',
            name: 'business',
            // component: business,
            component: () => import('./views/children/retail/children/business/index.vue'),
            meta: {
              name: '各业务详情',
            },
          },
        ],
      },
      {
        path: '/cockpit/customers',
        name: 'customers',
        component: () => import('./views/children/customers/index.vue'),
        mate: {
          name: '产业客户业务',
        },
        children: [
          {
            path: '/cockpit/customers/investBusiness',
            name: 'investBusiness',
            component: () => import('./views/children/customers/children/invest/index.vue'),
            meta: {
              name: '投行业务',
            },
          },
          {
            path: '/cockpit/customers/subBusiness',
            name: 'subBusiness',
            component: () => import('./views/children/customers/children/subBusiness/index.vue'),
            meta: {
              name: '子公司业务',
            },
          },
          {
            path: '/cockpit/customers/macroData',
            name: 'macroData',
            component: () => import('./views/children/customers/children/macroData/index.vue'),
            meta: {
              name: '宏观数据',
            },
          },
        ],
      },
      {
        path: '/cockpit/institutions',
        name: 'institutions',
        component: () => import('./views/children/institutions/index.vue'),
        mate: {
          name: '机构业务',
        },
      },
      {
        path: '/cockpit/investment',
        name: 'investment',
        component: () => import('./views/children/investment/index.vue'),
        mate: {
          name: '投资业务',
        },
      },
      // {
      //   path: '/home/index1',
      //   name: 'investment',
      //   component: index1,
      //   meta: {
      //     title: '投资业务',
      //   },
      // },
      // {
      //   path: '/home/index2',
      //   component: index2,
      //   meta: {
      //     title: '测试2',
      //   },
      // },
    ],
  })