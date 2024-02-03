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







