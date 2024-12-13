import { useDrag } from 'react-dnd';
import styles from './DragableItem.module.scss';
import { useDispatch } from 'react-redux';
import { ICON_WIDTH, ICON_HEIGHT } from '../../../../constant/constant';
import { useEffect, useRef } from 'react';

export const DraggableItem = ({ type, img, position, id }) => {
  const dragRef = useRef(null);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: (monitor) => {
        if (type === 'toolbar_image') {
          const currItem = dragRef.current.getBoundingClientRect();
          const cursor = monitor.getClientOffset();
          console.log(1);

          return {
            id,
            img,
            type,
            position,
            offset: { x: cursor.x - currItem.x, y: cursor.y - currItem.y },
          };
        } else {
          return {
            id,
            img,
            type,
            position,
          };
        } // функция которая применяется dragStart
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [position],
  );

  function setPosition(coordinates) {
    if (coordinates) {
      return {
        position: 'absolute',
        left: coordinates.x,
        top: coordinates.y,
      };
    } else {
      return null;
    }
  }

  function handleDoubleClick(type) {
    if (type === 'table_image') {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: id,
      });
    }
  }

  return (
    <div
      onDoubleClick={() => handleDoubleClick(type)}
      className={styles.container}
      ref={(node) => {
        drag(node);
        dragRef.current = node;
      }}
      style={{
        ...setPosition(position),
        display: isDragging && position ? 'none' : 'block',
        zIndex: isDragging ? 2 : 1,
      }}>
      <img
        style={{
          width: `${ICON_WIDTH}px`,
          height: `${ICON_HEIGHT}px`,
        }}
        src={img}
        alt={type}
      />
    </div>
  );
};
