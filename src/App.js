import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeFile from './components/Home/Home';
import UserPosts from './pages/UserPost/UserPosts';
import UserComments from './pages/UserComments/UsersComments';



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







