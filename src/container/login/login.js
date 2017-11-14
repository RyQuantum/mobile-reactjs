import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class Login extends Component {

  register = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo/>
        <h2>Login page</h2>
        <WingBlank>
          <List>
            <InputItem>Username</InputItem>
            <WhiteSpace/>
            <InputItem>Password</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary">Login</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;