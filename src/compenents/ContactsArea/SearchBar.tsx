import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSearchText } from "../../redux/messages/messages.selectors";
import { createStructuredSelector } from "reselect";
import { setSearchText } from "../../redux/messages/messages.actions";

function SearchBar({ setSearchText, searchText }) {
  const handleChange = (event) => {
    let search = event.target.value;
    setSearchText(search);
  };
  return (
    <div className="active-cyan-4 my-4  mr-5 input-group text-white" style={styles.searchInput}>
      <div className="input-group-addon pl-2 py-2 m-auto" style={styles.icon}>
        <i className="fas fa-lg fa-search"></i>
      </div>
      <input
        style={styles.searchInput}
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={searchText}
        onChange={handleChange}
        name="searchText"
      />
    </div>
  );
}
const styles = {
  searchInput: {
    background: "#323739",
    border: 0,
    borderRaduis: "250px",
    outline:0,
    color:"white"
  },
  icon : {
    color :'#4f565b'
  }
};
const mapStateToProps = createStructuredSelector({
  searchText: selectSearchText
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (msg) => dispatch(setSearchText(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
