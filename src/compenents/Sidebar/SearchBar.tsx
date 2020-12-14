import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSearchText } from "../../redux/messages/messages.selectors";
import { createStructuredSelector } from "reselect";
import { setSearchText } from "../../redux/messages/messages.actions";
import styled from "styled-components";

const CustomInput = styled.input`
  outline: 0;
  border: 0!important;
  :focus {
    outline: none;
    border: none;
  }
`;

const Icon = styled.i`
  color: #4f565b;
`;

const SearchBarBox = styled.div`
  border-radius: 25px !important;
  background: white;
  outline: 0;
  border: 0;
  :focus {
    outline: none;
    border: none;
  }
`;

function SearchBar({ setSearchText, searchText }) {
  const handleChange = (event) => {
    let search = event.target.value;
    setSearchText(search);
  };
  return (
    <SearchBarBox className="active-cyan-4  input-group mb-5 mt-2 text-white py-2">
      <div className="input-group-addon pl-3  m-auto">
        <Icon className="fas fa-lg fa-search"></Icon>
      </div>
      <CustomInput
        className="form-control p-4"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={searchText}
        onChange={handleChange}
        name="searchText"
      />
    </SearchBarBox>
  );
}
const mapStateToProps = createStructuredSelector({
  searchText: selectSearchText
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (msg) => dispatch(setSearchText(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
