export default [
  { path: '/login', component: '@/pages/login/login' },
  {
    path: '/',
    component: '@/pages',
    title: 'zzz',
    routes: [
      {
        path: '/home',
        component: '@/pages/home',
        title: 'zzz',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/user',
        component: '@/pages/user_manage/userList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/right',
        redirect: '/right/right',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/right/role',
        component: '@/pages/right_manage/role_list/roleList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/right/right',
        component: '@/pages/right_manage/right_list/rightList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/news',
        redirect: '/news/newslist',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/news/category',
        component: '@/pages/news_manage/news_catagory/newsCatagory',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/news/newslist',
        component: '@/pages/news_manage/news_list/newsList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/audit',
        component: '@/pages/audit/audit',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/publish',
        component: '@/pages/publish/publish',
        wrappers: ['@/wrappers/auth'],
      },
      { path: '/403', component: '@/pages/403' },
      { path: '*', component: '@/pages/404/notFound' },
    ],
  },
];
