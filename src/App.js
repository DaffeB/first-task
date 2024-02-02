import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserPosts from './pages/UserPosts';

import HomeFile from './pages/HomeFile';
import UserComments from './pages/UsersComments';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomeFile} />
        <Route path='/user/:userId' component={UserPosts} />
        <Route path="/post/:postId/comments" component={UserComments} />
      </Switch>
    </Router>
  );
};

export default App;







// import Home from "./pages/home";
// import UserDetails from "./pages/UserDetails";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// const App = () => {
//   return (
//     <div className='container'>
//       <Router>
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/user-details">User Details</Link>
//               </li>
//             </ul>
//           </nav>

//           <Switch>
//             <Route strict path="/user-details">
//               <UserDetails />
//             </Route>
//             <Route strict path="/">
//               <Home />
//             </Route>
//           </Switch>
//         </div>
//       </Router>
//     </div>
//   );
// };

// export default App;
