import { Route, Switch, useHistory } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';

function Staff() {
  const history = useHistory()


  return (
    <div className={styles.container}>
      <StaffList />
      <button onClick={() => history.goBack()}>Назад</button>
    </div>
  );
}

export default Staff;
