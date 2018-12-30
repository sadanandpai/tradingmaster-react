import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import SearchComponent from "./searchComponent.js";
import StockDisplay from "./stockDisplay.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      stocks: []
    };
  }

  searchHandler = search => {
    this.setState({
      search: search
    });
  };

  componentDidMount() {
    Axios.get("https://tradingmasters.herokuapp.com/rest/").then(response => {
      this.setState({
        stocks: response.data
      });
      var stocks = response.data;

      stocks.forEach((stock, idx) => {
        Axios.get(
          "https://www.quandl.com/api/v3/datasets/NSE/" +
            stock.stockName +
            ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1"
        ).then(
          response => {
            let temp = this.state.stocks;
            temp[idx].currentPrice = response.data.dataset.data[0][4];
            this.setState({
              stocks: temp
            });
          },
          error => {
            let temp = this.state.stocks;
            temp[idx].currentPrice = "Error";
            this.setState({
              stocks: temp
            });
          }
        );
      });
    });
  }

  render() {
    return (
      <div>
        <SearchComponent
          search={this.state.search}
          handler={this.searchHandler}
        />
        <StockDisplay stocks={this.state.stocks} search={this.state.search} />
      </div>
    );
  }
}

ReactDOM.render(<HomePage />, document.getElementById("app"));
