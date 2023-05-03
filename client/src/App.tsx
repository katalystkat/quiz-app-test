// import React, {useState} from 'react';
// import { createBrowserRouter, RouterProvider} from 'react-router-dom';

// /** Components */
// import Login from './components/Login';
// import Register from './components/Register';
// import Quiz from './components/Quiz';
// import Results from './components/Results';
// import Home from './components/Home';
// import PageNotFound from './components/PageNotFound';


// /** Routes */

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(checkLogin());
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//     },
//     {
//       path: '/login',
//       element : <Login/>
//     },
//     {
//       path: '/register',
//       element : <Register/>
//     },
//     {
//       path: '/quiz',
//       element : <Quiz/>
//     },
//     {
//       path: '/results',
//       element : <Results/>
//     },
//     {
//       path: '/*',
//       element : <PageNotFound/>
//     },
//   ])
//   return (
//     <div className="App">
//       <RouterProvider router={router}></RouterProvider>
//     </div>
//   );
// }
// export default App
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** Components */
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import { checkLogin } from './helper/loginStatus';


/** Routes */

interface HomeWrapperProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin());
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeWrapper isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    },
    {
      path: '/login',
      element: <Login setIsLoggedIn={setIsLoggedIn}/>,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/quiz',
      element: <Quiz />,
    },
    {
      path: '/results',
      element: <Results setIsLoggedIn={setIsLoggedIn}/>,
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
