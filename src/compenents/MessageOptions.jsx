import React, { Component } from "react";
class MessageOptions extends Component {
  render() {
    return (
      <div className="dropdown-menu dropdown-menu-right">
        <a className="dropdown-item" href="/#">
          {this.props.msg}
        </a>
        <a className="dropdown-item" href="/#">
          Archived
        </a>
        <a className="dropdown-item" href="/#">
          Starred
        </a>
        <a className="dropdown-item" href="/#">
          Settings
        </a>
        <a className="dropdown-item" href="/#">
          Log Out
        </a>
      </div>
    );
  }
}
export default MessageOptions;
