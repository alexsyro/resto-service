import styles from './Main.module.scss';
import Orders from './Orders/Orders';

function Main() {
  return (
    <div className={styles.container}>
      <Orders />
    </div>
  );
}

export default Main;
