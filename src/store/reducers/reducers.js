const initialState = {
  itemList: [],
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        itemList: state.itemList.map((item) =>
          item.id === action.payload.id ? { ...item, position: action.payload.position } : item,
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.id !== action.payload),
      };
    case 'IMPORT_LAYOUT':
      return {
        ...state,
        itemList: action.payload,
      };
    default:
      return state;
  }
};
