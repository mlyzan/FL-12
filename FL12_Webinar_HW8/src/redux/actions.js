import {
    SAVE,
    DELETE,
    SEARCH,
    ADD_SEARCH_TEXT,
    EDIT_USER,
    CLEAR_SEARCH
} from './state';

export const callSave = (obj)=>{
    return{
        type: SAVE,
        obj
    }
};

export const callDelete = (id) => {
    return {
        type: DELETE,
        id
    }
;}

export const callSearch = (value) => {
    return {
        type: SEARCH,
        value
    }
}

export const callChangeSearchText = (text) => {
    return {
        type: ADD_SEARCH_TEXT,
        text
    }
}

export const callEditUser = (obj) => {
    return {
        type: EDIT_USER,
        obj
    }
}

export const callClearSearch = () => {
    return {
        type: CLEAR_SEARCH
    }
}