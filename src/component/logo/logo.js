import React, {Component} from 'react';
import logoImg from './job.jpg';
import './logo.css';
class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} style={{maxWidth: 240}} alt=""/>
      </div>
    )
  }
}

export default Logo;