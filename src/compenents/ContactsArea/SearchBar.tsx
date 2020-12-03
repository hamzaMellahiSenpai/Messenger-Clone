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
    <div class="active-cyan-4 mb-4">
      <input
        class="form-control"
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

const mapStateToProps = createStructuredSelector({
  searchText: selectSearchText
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (msg) => dispatch(setSearchText(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
