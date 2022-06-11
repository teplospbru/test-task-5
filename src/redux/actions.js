import { GET_POSTS, GET_POST, LOADING_SHOW, LOADING_HIDE, SET_QUERY, ERROR, QUERY_IS_OK } from "./constants";

// Экшн получения постов
export const getPosts = (skip, query) => {
    return dispatch => {
        dispatch(loadingShow());
        if(query) { // Здесь получаем посты, содержащие слово и когда queryIsOk = true
            fetch(`https://dummyjson.com/posts/search?limit=10&skip=${skip}&q=${query}`)
                .then(res => res.json())
                .then(json => {
                    dispatch({ type: GET_POSTS, payload: json, skips: skips(json.total) });
                    setTimeout(() => {
                        dispatch(loadingHide());
                    }, 1000)
                })
        } else { // Здесь получаем все посты
            fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: GET_POSTS, payload: json, skips: skips(json.total) });
                setTimeout(() => {
                    dispatch(loadingHide());
                }, 1000);
            });
        }
        
    }
}

// Экшн получения конкретного поста
export const getPost = (id) => {
    return dispatch => {
        dispatch(loadingShow());
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: GET_POST, payload: json });
                setTimeout(() => {
                    dispatch(loadingHide());
                }, 1000);
            });
    }
}

// Показываем загрузку
export const loadingShow = () => {
    return {
        type: LOADING_SHOW
    }
}

// Прячем загрузку
export const loadingHide = () => {
    return {
        type: LOADING_HIDE
    }
}

// Заисываем значение инпута в стейт
export const setQuery = (value) => {
    return {
        type: SET_QUERY,
        payload: value
    }
}

// Экшн запроса получения постов, содержащих нужное слово
export const fetchQuery = (query) => {
    return dispatch => {
        dispatch(loadingShow());
        fetch(`https://dummyjson.com/posts/search?q=${query}&limit=10&skip=0`)
            .then(res => res.json())
            .then(json => {
                if(json.posts.length == 0) { // если постов с таким словом не оказалось
                    dispatch(error(true));
                    dispatch(queryIsOk(false))
                    dispatch(loadingHide());
                    setTimeout(() => {
                        dispatch(error(false));
                        dispatch(getPosts(0,null));
                        dispatch(setQuery(''));
                    }, 2000)
                } else { // если посты с нужным словом найдены
                    dispatch(queryIsOk(true))
                    dispatch({ type: GET_POSTS, payload: json, skips: skips(json.total) });
                    setTimeout(() => {
                        dispatch(loadingHide());
                    }, 1000);
                }
            });
    }
}

// Показываем ошибку
export const error = (isError) => {
    return {
        type: ERROR,
        payload: isError
    }
}

// Запоминаем, нашлись ли посты с нужным словом
export const queryIsOk = (isOk) => {
    return {
        type: QUERY_IS_OK,
        payload: isOk
    }
}

// Здесь создаём массив значений skip, чтобы передать его в стейт
const skips = (total) => {
    let arr = [];
    if(total === 0) {
        arr[0] = 0;
    } else {
        const pages = Math.ceil(total / 10);
        for(let i = 0; i < pages; i++) {
            arr.push(i * 10);
        }
    }
    return arr;
};