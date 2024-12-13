import { useRef } from 'react';
import { DraggableItem } from '../ToolBar/ElementPicker/DraggableItem/DraggableItem';
import styles from './Table.module.scss';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';

export const Table = () => {
  const itemList = useSelector((state) => state.items.itemList);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const [{ _, isOver }, drop] = useDrop(
    () => ({
      accept: ['toolbar_image', 'table_image'],
      drop: addImage,
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [itemList],
  );

  function handleSaveFile() {
    const dataToSave = JSON.stringify(itemList);
    const blob = new Blob([dataToSave], { type: 'application/json' });
    saveAs(blob, 'fileLayout.json');
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      importFile(file);
    }
  };

  const importFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const importedItemList = JSON.parse(fileContent);

      dispatch({ type: 'IMPORT_LAYOUT', payload: importedItemList });
    };

    reader.readAsText(file);
  };

  function addImage(draggedItem, monitor) {
    const { x, y } = monitor.getClientOffset();
    let relativeX = 0;
    let relativeY = 0;

    if (tableRef?.current) {
      const rect = tableRef.current.getBoundingClientRect();
      relativeX = x - rect.left;
      relativeY = y - rect.top;
    }

    if (draggedItem.type === 'toolbar_image') {
      const newId = Date.now();
      dispatch({
        type: 'ADD_ITEM',
        payload: { ...draggedItem, id: newId, position: { x: relativeX, y: relativeY } },
      });
    } else {
      function getNewPos(left, top) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          return { x: Math.round(left + delta.x), y: Math.round(top + delta.y) };
        }
        return { x: left, y: top };
      }

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: draggedItem.id,
          position: getNewPos(draggedItem.position.x, draggedItem.position.y),
        },
      });
    }
  }

  return (
    <section className={styles.container}>
      <h1>Область размещения</h1>
      <div
        ref={(node) => {
          drop(node);
          tableRef.current = node;
        }}
        style={{
          border: '2px dashed black',
          borderColor: isOver ? 'lightgreen' : 'white',
        }}
        className={styles.table}>
        {itemList.map((item, i) => {
          return (
            <DraggableItem
              id={item.id}
              position={item.position}
              key={i}
              type="table_image"
              img={item.img}
            />
          );
        })}
      </div>
      <button onClick={handleSaveFile}>Сохранить</button>{' '}
      <input type="file" onChange={handleFileUpload} />
    </section>
  );
};
