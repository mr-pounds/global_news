export default [
    { path: '/login', component: '@/pages/login/login' },
    {
        path: '/', component: '@/pages/index', title: 'zzz', routes: [
            { path: '/home', component: '@/pages/home/home', title: 'zzz' },
            { path: '/user', component: '@/pages/user_manage/userList' },
            { path: '/right', redirect: '/right/right' },
            { path: '/right/role', component: '@/pages/right_manage/role_list/roleList'},
            { path: '/right/right', component: '@/pages/right_manage/right_list/rightList'},
            { path: '/news', redirect: '/news/newslist' },
            { path: '/news/category', component: '@/pages/news_manage/news_catagory/newsCatagory' },
            { path: '/news/newslist', component: '@/pages/news_manage/news_list/newsList' },
            { path:'/audit', component: '@/pages/audit/audit'},
            { path: '/publish', component: '@/pages/publish/publish' },
            { path: '*', component: '@/pages/404/notFound' },
        ]
    },
];