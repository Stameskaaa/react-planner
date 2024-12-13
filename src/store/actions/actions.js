export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const updateItem = (id, position) => ({
  type: 'UPDATE_ITEM',
  payload: { id, position },
});

export const removeItem = (id) => ({
  type: 'REMOVE_ITEM',
  payload: id,
});

export const importFile = (id) => ({
  type: 'IMPORT_LAYOUT',
  payload: itemList,
});
