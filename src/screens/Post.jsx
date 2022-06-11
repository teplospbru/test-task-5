import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {

    const post = useSelector(state => state.post);
    const loading = useSelector(state => state.loading);

    return (
        <>
            <header>
                <h1>Post</h1>
                <Link to='/posts'>Back To Posts</Link>
            </header>

            {
                !loading 
                    ? (
                        <main>
                            <h2>{ post.title }</h2>
                            <p>{ post.body }</p>
                        </main> )
                    : (
                        <div className="loading">
                            Loading Post...
                        </div> )
            }
        </>
    )
};

export default Post;


