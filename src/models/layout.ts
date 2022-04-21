import { Reducer } from 'umi';

export interface LayoutModelState {
  collapsed?: boolean;
  header?: string;
  menuList?: string[];
}

interface setHeaderAction {
  type: 'setHeader';
  payload: string;
}

interface setMenuListAction {
  type: 'setMenuList';
  payload: string[];
}

export interface LayoutModelType {
  namespace: 'layout';
  state: LayoutModelState;
  reducers: {
    toggleCollapsed: Reducer<LayoutModelState>;
    setHeader: Reducer<LayoutModelState, setHeaderAction>;
    setMenuList: Reducer<LayoutModelState, setMenuListAction>;
  };
}

const LayoutModel: LayoutModelType = {
  namespace: 'layout',
  state: {
    collapsed: false,
    header: '',
    menuList: [],
  },
  reducers: {
    toggleCollapsed(state, action) {
      return {
        ...state,
        collapsed: !(state as LayoutModelState).collapsed,
      };
    },
    setHeader(state, action) {
      return {
        ...state,
        header: action.payload,
      };
    },
    setMenuList(state, action) {
      return {
        ...state,
        menuList: action.payload,
      };
    },
  },
};

export default LayoutModel;
