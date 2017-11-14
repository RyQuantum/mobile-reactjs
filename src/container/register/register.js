import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';


@connect(state => state.user, {register})
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      pwd: '',
      repeatPwd: '',
      type: 'genius'
    }
  };

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  };

  handleRegister = () => {
    this.props.register(this.state);
  };

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.handleChange('user', v)}>Username</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>Password</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v => this.handleChange('repeatPwd', v)}>Repeat</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={v => this.handleChange('type', 'genius')}
            >
              Genuis
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={v => this.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>Submit</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register;