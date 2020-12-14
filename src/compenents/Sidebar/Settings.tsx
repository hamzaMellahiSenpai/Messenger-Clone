import React, { Component } from "react";
import firebase from "firebase";
import { Card, Button, Modal } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
class Settings extends Component {
  state = {
    value: "female",
    show: false
  };
  setValue(value: String) {
    this.setState({ value });
  }
  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  handleChange = (event) => {
    this.setValue(event.target.value);
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  render() {
    let { show, value } = this.state;
    return (
      <div className="">
        <h1 className="mb-4 p-3">Settings</h1>
        <Card body onClick={this.handleShow} style={{ fontSize: "2vw" }}>
        <i className="fas fa-cog pr-4 text-fancy"></i>Change theme
        </Card>
        <Card body onClick={this.logOut} style={{ fontSize: "2vw" }}>
          <i className="fas fa-sign-out-alt pr-4 text-fancy"></i>Log Out
        </Card>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl component="fieldset">
              <FormLabel component="legend">Theme</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="Light"
                  control={<Radio />}
                  label="Gays Theme"
                />
                <FormControlLabel
                  value="Dark"
                  control={<Radio />}
                  label="Dark Theme"
                />
              </RadioGroup>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Settings;
