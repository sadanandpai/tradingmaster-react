import Dispatcher from "./dispatcher";

const Actions = {
  setSearch(text) {
    Dispatcher.dispatch({
      type: "SEARCH",
      text
    });
  },

  setStocks(stocks) {
    Dispatcher.dispatch({
      type: "STOCKS",
      stocks
    });
  },

  stocksCounter(counter) {
    Dispatcher.dispatch({
      type: "COUNT_CHANGE",
      counter
    });
  }
};

export default Actions;
