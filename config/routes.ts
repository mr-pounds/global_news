export default [
    { path: '/login', component: '@/pages/login/login' },
    {
        path: '/', component: '@/pages/index', title: 'zzz', routes: [
            { path: '/home', component: '@/pages/home/Home', title: 'zzz' },
            { path: '/user', component: '@/pages/user_manage/UserList' },
            { path: '/right', redirect: '/right/right' },
            { path: '/right/role', component: '@/pages/right_manage/RoleList'},
            { path: '/right/right', component: '@/pages/right_manage/RightList'},
            { path: '*', component: '@/pages/404/notFound' },
        ]
    },
];