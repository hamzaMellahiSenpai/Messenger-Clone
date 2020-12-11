import React, { Component } from "react";

class Call extends Component {
  toggleClass() {}
  render() {
    return (
      <div>
          <i className="fas fa-phone mx-3  d-none d-md-block text-greey fa-2x"></i>
          <i className="fas fa-video mx-3 d-none d-md-block text-greey fa-2x"></i>
          <i className="fas fa-ellipsis-h mx-3 d-none d-md-block text-greey fa-2x"></i>
      </div>
    );
  }
}

export default Call;
