import React, {Component} from 'react';
import axios from 'axios';
import  {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
  async componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathame;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    const res = await axios.get('/user/info');
    if (res.status === 200) {
      if (res.data.code === 0) {

      } else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return null;
  }
}

export default AuthRoute;