
export const SAVE = 'SAVE';
export const DELETE = 'DELETE';
export const SEARCH = 'SEARCH';
export const ADD_SEARCH_TEXT = 'ADD_SEARCH_TEXT';
export const EDIT_USER = 'EDIT_USER';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

let initialState = {
    data: [],
    searchText: '',
    search: []
};

const Reducer = (state = initialState, action)=>{
    switch (action.type) {
        case SAVE:
            let copy = {...state};
                copy.data.unshift(action.obj);
            return copy
        case DELETE: 
            let newState = [...state.data];
            let index = newState.findIndex(e => e.id === action.id);
                newState.splice(index, 1)
            return {
                ...state,
                data: newState
            }
        case ADD_SEARCH_TEXT: 
            return {
                ...state,
                searchText: action.text
            }
        case SEARCH:
            let copyState = {...state};
            let filterState = state.data.filter(e => e.name.toLowerCase().indexOf(action.value.toLowerCase()) !== -1 );
                copyState.search = filterState;
            return copyState
        case EDIT_USER:
            let showIndex = state.data.findIndex(e => e.id === action.obj.id);
            let copyData = state.data;
                copyData.splice(showIndex, 1, action.obj);
            return {
                ...state,
                data: copyData
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                searchText: ''
            }
        default:
            return state;
    }
};


export default Reducer;