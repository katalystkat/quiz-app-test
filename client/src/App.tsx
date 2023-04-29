import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

/** Components */
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';


/** Routes */
const router = createBrowserRouter([
  {
    path: '/',
    element : <Home/>
  },
  {
    path: '/login',
    element : <Login/>
  },
  {
    path: '/register',
    element : <Register/>
  },
  {
    path: '/quiz',
    element : <Quiz/>
  },
  {
    path: '/results',
    element : <Results/>
  },
  {
    path: '/*',
    element : <PageNotFound/>
  },
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
