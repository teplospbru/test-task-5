import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { getPosts } from './redux/actions';
import { useDispatch } from 'react-redux';

import './App.css';

// Screens
import Posts from './screens/Posts';
import Post from './screens/Post';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(0)); // здесь при загрузке приложения получаем все посты
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/post' element={ <Post /> } /> { /*Страница поста*/ }
          <Route path='/posts' element={ <Posts /> } /> { /*Страница постов*/ }
          <Route path='/' element={ <Posts /> } /> { /*Страница постов*/ }
        </Routes>
      </div>
    </Router>
  );
}

export default App;