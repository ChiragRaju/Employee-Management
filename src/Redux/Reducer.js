import { MAKE_REQ, OPEN_POPUP, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_GETBYCODE_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const initialstate = {
    isloading: false,
    employeelist: [],
    employeeobj: {},
    errormessage: ''
}

export const EmployeeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isloading: true
            }
        case REQ_GETALL_SUCC:
            return {
                ...state,
                isloading: false,
                employeelist: action.payload
            }
        case REQ_GETBYCODE_SUCC:
            return {
                ...state,
                employeeobj: action.payload
            }
        case REQ_GETALL_FAIL:
            return {
                ...state,
                isloading: false,
                employeelist: [],
                errormessage: action.payload
            }
        case OPEN_POPUP:
            return {
                ...state,
                employeeobj: {}
            }
        case REQ_ADD_SUCC:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.employeelist.map(o => o.id));
            _inputdata.id = _maxid + 1;
            return {
                ...state,
                employeelist: [...state.employeelist, _inputdata]
            }
        case REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            const _finaldata = state.employeelist.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                employeelist: _finaldata
            }
        case REQ_DELETE_SUCC:
            const _filterdata = state.employeelist.filter((data) => {
                return data.id !== action.payload
            })
            return {
                ...state,
                employeelist: _filterdata
            }
        default: return state;
    }
}