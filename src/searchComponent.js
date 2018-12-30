import React from "react";

class Search extends React.Component {
  searchHandler = evt => {
    this.props.handler(evt.target.value);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="search"
        className="form-control"
        value={this.props.search}
        onChange={this.searchHandler}
      />
    );
  }
}

export default Search;
