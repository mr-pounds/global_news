const rights = [
  {
    id: 1,
    key: '/home',
    title: '首页',
    permission: 1,
    children: []
  },
  {
    id: 2,
    key: '/user',
    title: '用户管理',
    permission: 1,
    children: []
  },
  {
    id: 7,
    key: '/right',
    title: '权限管理',
    permission: 1,
    children: [
      {
        id: 8,
        key: '/right/role',
        title: '角色管理',
        permission: 1,
        children: []
      },
      {
        id: 9,
        key: '/right/right',
        title: '权限管理',
        permission: 1,
        children: []
      },
    ]
  },
  {
    id: 14,
    key: '/news',
    title: '新闻管理',
    permission: 1,
    children: [
      {
        id: 20,
        key: '/news/category',
        title: '新闻分类',
        permission: 0,
        children: []
      },
      {
        id: 14,
        key: '/news/newslist',
        title: '新闻列表',
        permission: 1,
        children: []
      }
    ]
  },
  {
    id: 21,
    key: '/audit',
    title: '审核管理',
    permission: 1,
    children: []
  },
  {
    id: 24,
    key: '/publish',
    title: '发布管理',
    permission: 1,
    children: []
  }
]

export default {
    'GET /api/account/rights': rights,
    'DELETE /api/account/rights/:id': (req: any, res: any)=>{
      console.log('删除权限项', req.params.id)
      res.send({
        msg: '',
        code: 0
      }) 
    },
    'PUT /api/account/rights/:id': (req: any, res: any)=>{
      console.log('更新权限项', req.params.id)
      res.send({
        msg: '',
        code: 0
      }) 
    }
}