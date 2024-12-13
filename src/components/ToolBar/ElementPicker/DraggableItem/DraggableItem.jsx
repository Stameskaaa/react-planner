import { useDrag } from 'react-dnd';
import styles from './DragableItem.module.scss';

export const DraggableItem = ({ type, img, position, id }) => {
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

  return (
    <div
      className={styles.container}
      ref={drag}
      style={{
        ...setPosition(position),
        display: isDragging && position ? 'none' : 'block',
      }}>
      <img src={img} alt={type} />
    </div>
  );
};
