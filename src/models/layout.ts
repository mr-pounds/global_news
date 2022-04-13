import { Reducer } from 'umi';

export interface LayoutModelState {
    collapsed?: boolean,
    header?: string
}

interface setHeaderAction{
    type: 'setHeader',
    payload: string
}

export interface LayoutModelType {
    namespace: 'layout',
    state: LayoutModelState,
    reducers: {
        toggleCollapsed: Reducer<LayoutModelState>;
        setHeader: Reducer<LayoutModelState, setHeaderAction>;
    }
}

const LayoutModel: LayoutModelType = {
    namespace: 'layout',
    state: {
        collapsed: false,
        header: ''
    },
    reducers:{
        toggleCollapsed(state, action) {
            return {
                ...state,
                collapsed: !(state as LayoutModelState).collapsed,
            }
        },
        setHeader(state, action) {
            return {
                ...state,
                header: action.payload
            }
        }
    },
}

export default LayoutModel