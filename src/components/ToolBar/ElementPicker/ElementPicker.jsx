import { DraggableItem } from './DraggableItem/DraggableItem';
import styles from './ElementPicker.module.scss';
import { TOOLBAR_LIST_LENGTH } from '../../../constant/constant';
import purple from '../../../assets/prupleChel.png';
import chair from '../../../assets/chair.png';
import table from '../../../assets/table.png';

const imagesList = [purple, chair, table];

export const ElementPicker = () => {
  return (
    <div className={styles.container}>
      <h1>Область выбора</h1>
      <div className={styles.list}>
        {imagesList.map((image, i) => {
          return <DraggableItem key={i} type="toolbar_image" id={i + 1} img={image} />;
        })}
      </div>
    </div>
  );
};
