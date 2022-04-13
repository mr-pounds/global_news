import { Reducer } from 'umi';

export interface LayoutModelState {
    collapsed: boolean
}

export interface LayoutModelType {
    namespace: 'layout',
    state: LayoutModelState,
    reducers: {
        toggleCollapsed: Reducer<LayoutModelState>;
    }
}

const LayoutModel: LayoutModelType = {
    namespace: 'layout',
    state: {
        collapsed: false,
    },
    reducers:{
        toggleCollapsed(state, action) {
            return {
                ...state,
                collapsed: ! (state as LayoutModelState).collapsed,
            }
        }
    },
}

export default LayoutModel