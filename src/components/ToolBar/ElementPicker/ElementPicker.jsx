import { DraggableItem } from './DraggableItem/DraggableItem';
import styles from './ElementPicker.module.scss';
import { TOOLBAR_LIST_LENGTH } from '../../../constant/constant';
import purple from '../../../assets/prupleChel.png';
export const ElementPicker = () => {
  return (
    <div className={styles.container}>
      <div>
        {Array.from({ length: TOOLBAR_LIST_LENGTH }).map((_, i) => {
          return <DraggableItem key={i} type="toolbar_image" id={i + 1} img={purple} />;
        })}
      </div>
    </div>
  );
};
