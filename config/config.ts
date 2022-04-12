import { defineConfig } from 'umi';
import  routes  from './routes' 

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history:{
    type: 'hash',
  },
  routes: routes,
  fastRefresh: {},
  antd: {
    dark: false,
    compact: false,
  },
  // links: [
  //   { rel:'icon', type:'image/x-icon', href:'react_icons.webp' },
  // ],
  favicon: 'react_icons.webp',
  title: '第一个 React 项目',
});
