import { Route, Switch, useHistory } from 'react-router-dom';
import styles from './Staff.module.scss';

function Staff() {
  const history = useHistory()

  return (
    <div className={styles.container}>
      <p>Here's staff and some stuff....</p>
      <button onClick={() => history.goBack()}>Назад</button>
    </div>
  );
}

export default Staff;
