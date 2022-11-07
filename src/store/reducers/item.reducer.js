import { itemTypes } from "../types/item.types";

const initialState = {
  error: false,
  loading: false,
  id: "",
  deleted: false,
  changed: false,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemTypes.ITEM_WAIT_DATA:
      return { error: false, loading: true };
    case itemTypes.ITEM_DATA_ERROR:
      return { error: action.payload, loading: false };
    case itemTypes.ITEM_SERVER_ERROR:
      return { error: action.payload, loading: false };
    case itemTypes.ITEM_ADD:
      return { error: false, loading: false, id: action.payload };
    case itemTypes.ITEM_DELETE:
      return { error: false, loading: false, deleted: action.payload };
    case itemTypes.ITEM_CHANGE:
        return { error: false, loading: false, changed: action.payload };
    default:
      return state;
  }
};
