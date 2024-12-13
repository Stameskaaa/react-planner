import { useRef } from 'react';
import { DraggableItem } from '../ToolBar/ElementPicker/DraggableItem/DraggableItem';
import styles from './Table.module.scss';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { ICON_WIDTH, ICON_HEIGHT } from '../../constant/constant';

export const Table = () => {
  const itemList = useSelector((state) => state.items.itemList);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const [{ _, isOver }, drop] = useDrop(
    () => ({
      accept: ['toolbar_image', 'table_image'],
      drop: addOrReplaceItem,
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

  function addOrReplaceItem(draggedItem, monitor) {
    if (draggedItem.type === 'toolbar_image') {
      // Добавляем картинку с ToolBar
      const newId = Date.now(); // id
      let resultPos = { x: 0, y: 0 };

      if (tableRef?.current) {
        const { x, y } = monitor.getClientOffset();
        const rect = tableRef.current.getBoundingClientRect();
        resultPos.x = x - rect.left - draggedItem.offset.x;
        resultPos.y = y - rect.top - draggedItem.offset.y;
      } // координаты курсора - координаты картинки - смещение курсора при захвате картинки
      // что бы она ровно размещалась

      dispatch({
        type: 'ADD_ITEM',
        payload: { ...draggedItem, id: newId, position: resultPos },
      });
    } else {
      // Переносим картинку уже на Table
      function getNewPos(left, top) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          let newX = Math.round(left + delta.x);
          let newY = Math.round(top + delta.y);

          function validateRange(coordinate, minR, maxR) {
            if (coordinate < minR || coordinate > maxR) return coordinate < minR ? minR : maxR;
            return coordinate;
          }

          return {
            x: validateRange(newX, 0, tableRef?.current.offsetWidth - ICON_WIDTH),
            y: validateRange(newY, 0, tableRef?.current.offsetHeight - ICON_HEIGHT),
          };
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
      <p>dbclick удаляет элемент</p>
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
