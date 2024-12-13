import { useDrag } from 'react-dnd';
import styles from './DragableItem.module.scss';
import { useDispatch } from 'react-redux';
import { ICON_WIDTH, ICON_HEIGHT } from '../../../../constant/constant';
export const DraggableItem = ({ type, img, position, id }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id, img, type, position },
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
    console.log('dbclick');

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
      ref={drag}
      style={{
        ...setPosition(position),
        display: isDragging && position ? 'none' : 'block',
      }}>
      <img style={{ width: `${ICON_WIDTH}px`, height: `${ICON_HEIGHT}px` }} src={img} alt={type} />
    </div>
  );
};
