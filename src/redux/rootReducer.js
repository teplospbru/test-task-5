import { FETCH_QUERY, GET_POST, GET_POSTS, LOADING_HIDE, LOADING_SHOW, SET_QUERY, ERROR, QUERY_IS_OK } from "./constants";

const initialState = {
    posts: {},
    skips: null,
    loading: false,
    query: 'this',
    error: false,
    queryIsOk: false
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state, 
                posts: action.payload.posts,
                skips: action.skips,
            }
        case GET_POST:
            return {
                ...state, 
                post: action.payload
            }
        case LOADING_SHOW:
            return {
                ...state, 
                loading: true
            }
        case LOADING_HIDE:
            return {
                ...state, 
                loading: false
            }
        case SET_QUERY:
            return {
                ...state,
                query: action.payload
            }
        case FETCH_QUERY:
            return {
                ...state, 
                posts: action.payload.posts,
                skips: action.skips,
            }
        case ERROR:
            return {
                ...state, 
                error: action.payload,
            }
        case QUERY_IS_OK:
            return {
                ...state,
                queryIsOk: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;
