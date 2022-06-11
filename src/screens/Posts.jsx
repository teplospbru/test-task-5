import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, getPosts, setQuery, fetchQuery } from "../redux/actions";

const Posts = () => {

    const posts = useSelector(state => state.posts);
    const loading = useSelector(state => state.loading);
    const skips = useSelector(state => state.skips);
    const query = useSelector(state => state.query);
    const error = useSelector(state => state.error);
    const queryIsOk = useSelector(state => state.queryIsOk);
    const dispatch = useDispatch();

    // Хэндлер поста, который нужно отобразить
    const handleClick = (id) => {
        dispatch(getPost(id));
    };

    // Хэндлер пагинации. Здесь значение query будет передано в экшн, если до этого, когда искали
    // посты по предёлённому слову, такие посты были найдены (queryIsOk = true)
    const handleSkip = (skip) => {
        let q;
        queryIsOk ? q = query : q = null;
        dispatch(getPosts(skip, q));
    }

    // Хэндлер инпута
    const handleInput = (event) => {
        const value = event.target.value;
        dispatch(setQuery(value));
    }

    // Хэндлер кнопки
    const handleSubscribe = (query) => {
        dispatch(fetchQuery(query));
    }

    return posts.length && (
        <>
            <header>
                <h1>All Posts</h1>
            </header>
            <main>

                {   error 
                    ? (
                        <div className="loading">
                                No Natches Found...
                                <br></br>
                                <br></br>
                                All Post Will Be Loaded
                            </div> )
                    : loading 
                        ? (
                            <div className="loading">
                                Loading Posts...
                            </div> )
                        : (
                            <>
                                <div className="posts-list">
                                    {
                                        posts.map(({ id, title }) => (<Link to='/post' key={ id.toString() }><h2 onClick={ () => handleClick(id) }>{ title }</h2></Link>))
                                    }
                                </div>
                                <div className="pagination">
                                    {
                                        skips.map(skip => (<Link to='/posts'><span onClick={ () => handleSkip(skip) }>{ (skip / 10) + 1 }</span></Link>))
                                    }
                                </div>
                                <div className="input">
                                    <input type="text" onChange={ (event) => handleInput(event) } value={ query }></input>
                                    <button onClick={ () => handleSubscribe(query) }>Find</button>
                                </div>
                            </> )
                }
                
                
            </main>
        </>
    )
};

export default Posts;