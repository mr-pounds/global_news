export default {
    'POST /api/account/rights': [
        {
          key: '/home',
          title: '首页',
          children: []
        },
        {
          key: '/user',
          title: '用户管理',
          children: []
        },
        {
          key: '/right',
          title: '权限管理',
          children: [
            {
              key: '/right/role',
              title: '角色管理',
              children: []
            },
            {
              key: '/right/right',
              title: '权限管理',
              children: []
            },
          ]
        }
      ]
}