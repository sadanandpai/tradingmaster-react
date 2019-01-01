import React from "react";
import Axios from "axios";
import TableBody from "./tableBody";
import "../style.css";

class StockDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      sort: "profit",
      reverse: false,
      load: true
    };
  }

  sortStocks = sortCol => {
    this.setState({
      sort: sortCol,
      reverse: !this.state.reverse
    });
  };

  componentDidMount() {
    Axios.get("https://tradingmasters.herokuapp.com/rest/").then(response => {
      var stocks = response.data;
      var promises = [];

      stocks.forEach((stock, idx) => {
        stocks[idx].currentPrice = "";
        var promise = Axios.get(
          "https://www.quandl.com/api/v3/datasets/NSE/" +
            stock.stockName +
            ".json?api_key=gwZhGszfyS5bH7p44UfA&rows=1"
        );

        promises.push(
          promise.then(
            response => {
              stocks[idx].currentPrice = response.data.dataset.data[0][4];
              stocks[idx].profit = +(
                ((stocks[idx].buyPrice - stocks[idx].currentPrice) * 100) /
                stocks[idx].buyPrice
              ).toFixed(2);
            },
            error => {
              stocks[idx].currentPrice = "Error";
            }
          )
        );
      });

      Promise.all(promises).then(
        () => {
          this.setState({
            stocks: stocks,
            load: false
          });
        },
        () => {
          this.setState({
            stocks: stocks,
            load: false
          });
        }
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col" onClick={this.sortStocks.bind(this, "stockName")}>
              Stock Name
              {this.state.sort === "stockName" ? (
                this.state.reverse ? (
                  <span className="oi oi-sort-descending" />
                ) : (
                  <span className="oi oi-sort-ascending" />
                )
              ) : (
                ""
              )}
            </th>
            <th scope="col">Buy Price</th>
            <th scope="col">StopLoss</th>
            <th scope="col">Target</th>
            <th scope="col">Current Price</th>
            <th scope="col" onClick={this.sortStocks.bind(this, "profit")}>
              P & L
              {this.state.sort === "profit" ? (
                this.state.reverse ? (
                  <span className="oi oi-sort-ascending" />
                ) : (
                  <span className="oi oi-sort-descending" />
                )
              ) : (
                ""
              )}
            </th>
          </tr>
        </thead>
        {this.state.load ? (
          <tbody className="loader" />
        ) : (
          <TableBody
            searchText={this.props.searchText}
            stocks={this.state.stocks}
            sort={this.state.sort}
            reverse={this.state.reverse}
          />
        )}
      </table>
    );
  }
}

export default StockDisplay;
