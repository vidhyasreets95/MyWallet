import { ADD_EXPENSE, SET_BUDGET, SET_CREDIT, SET_NO } from './Types';

const initialState = {
    expenseList: [],
    monthBudget: 0,
    credits: 0,
};
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                expenseList: action.data
            }
        case SET_BUDGET:
            return {
                ...state,
                monthBudget: action.data
            }
        case SET_CREDIT:
            return {
                ...state,
                credits: action.data
            }
        default:
            return state;
    }

}
