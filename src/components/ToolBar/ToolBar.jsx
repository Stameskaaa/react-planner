import { ElementPicker } from './ElementPicker/ElementPicker';
import { ElementSettings } from './ElementSettings/ElementSettings';
import styles from './ToolBar.module.scss';

export const ToolBar = () => {
  return (
    <section className={styles.container}>
      <ElementPicker />
      {/* <ElementSettings /> */}
    </section>
  );
};
