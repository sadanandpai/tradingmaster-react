import React from "react";
import Actions from "../data/actions";

class Search extends React.Component {
  searchHandler = evt => {
    Actions.setSearch(evt.target.value);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search"
        className="form-control"
        value={this.props.searchText}
        onChange={this.searchHandler}
      />
    );
  }
}

export default Search;
