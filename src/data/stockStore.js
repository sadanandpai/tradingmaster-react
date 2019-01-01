import { ReduceStore } from "flux/utils";
import Dispatcher from "./dispatcher";

class StockStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      searchText: "",
      stocks: [],
      counter: { total: 0, filter: 0 }
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case "SEARCH":
        return {
          searchText: action.text,
          counter: state.counter
        };

      case "COUNT_CHANGE":
        return {
          searchText: state.searchText,
          counter: {
            total: action.counter.total,
            filter: action.counter.filter
          }
        };

      default:
        return state;
    }
  }
}

export default new StockStore();
