import React from "react";

const TableHeader = function() {
  return (
    <thead>
      <tr>
        <th>Index</th>
        <th>Stock Name</th>
        <th>StopLoss</th>
        <th>Target</th>
        <th>Current Price</th>
      </tr>
    </thead>
  );
};

const TableBody = function(props) {
  return (
    <tbody>
      {props.stocks
        .filter(
          stock =>
            ~`${stock.stockName}
            ${stock.buyPrice}
            ${stock.stopLoss}
            ${stock.target}`
              .toLowerCase()
              .indexOf(props.search)
        )
        .map((stock, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{stock.stockName}</td>
            <td>{stock.stopLoss}</td>
            <td>{stock.target}</td>
            <td>{stock.currentPrice}</td>
          </tr>
        ))}
    </tbody>
  );
};

class StockDisplay extends React.Component {
  render() {
    return (
      <table className="table">
        <TableHeader />
        <TableBody {...this.props} />
      </table>
    );
  }
}

export default StockDisplay;
