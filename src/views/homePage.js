import React from "react";
import SearchComponent from "./searchComponent.js";
import StockDisplay from "./stockDisplay.js";
import StockStore from "../data/stockStore";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      counter: { total: 0, filter: 0 }
    };
  }

  static getStores() {
    return [StockStore];
  }

  static calculateState(prevState) {
    return {
      searchText: StockStore.getState().searchText,
      counter: StockStore.getState().counter
    };
  }

  render() {
    return (
      <div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <SearchComponent searchText={this.state.searchText} />
          </div>
          <div className="col-md-2">
            {this.state.searchText === ""
              ? ""
              : this.state.counter.filter + " /"}{" "}
            {this.state.counter.total} Stocks
          </div>
          <div className="col-md-6 text-right">
            <a
              href="#!/stocks/addStock"
              className="btn btn-primary"
              role="button"
            >
              Add a stock
            </a>
          </div>
        </div>
        <br />
        <StockDisplay searchText={this.state.searchText} />
      </div>
    );
  }
}

export default HomePage;
