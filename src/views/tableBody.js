import React from "react";
import Actions from "../data/actions";

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.counter = { total: 0, filter: 0 };
    this.filteredStocks = [];
  }

  filterStocks(stocks, searchText, sort, reverse) {
    this.filteredStocks = stocks
      .filter(stock => {
        return ~`${stock.stockName}
            ${stock.buyPrice}
            ${stock.stopLoss}
            ${stock.target}
            ${stock.currentPrice}`
          .toLowerCase()
          .indexOf(searchText);
      })
      .sort((stockA, stockB) => {
        if (reverse) {
          if (typeof stockA[sort] === "string") {
            return stockA[sort] > stockB[sort] ? -1 : 1;
          } else {
            return (stockA[sort] || 0) - (stockB[sort] || 0);
          }
        } else {
          if (typeof stockA[sort] === "string") {
            return stockA[sort] < stockB[sort] ? -1 : 1;
          } else {
            return (stockB[sort] || 0) - (stockA[sort] || 0);
          }
        }
      });
    return this.filteredStocks;
  }

  componentDidMount() {
    if (this.counter.filter !== this.filteredStocks.length) {
      this.counter.total = this.props.stocks.length;
      this.counter.filter = this.filteredStocks.length || 0;
      Actions.stocksCounter(this.counter);
    }
  }

  componentDidUpdate() {
    if (this.counter.filter !== this.filteredStocks.length) {
      this.counter.total = this.props.stocks.length;
      this.counter.filter = this.filteredStocks.length;
      Actions.stocksCounter(this.counter);
    }
  }

  render() {
    return (
      <tbody>
        {this.filterStocks(
          this.props.stocks,
          this.props.searchText,
          this.props.sort,
          this.props.reverse
        ).map((stock, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{stock.stockName}</td>
            <td>{stock.buyPrice}</td>
            <td>{stock.stopLoss}</td>
            <td>{stock.target}</td>
            <td>{stock.currentPrice}</td>
            <td>
              {stock.profit ? (
                <font color="green">{stock.profit}%</font>
              ) : (
                <font color="red">%</font>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
