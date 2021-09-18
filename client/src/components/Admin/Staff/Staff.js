import { useHistory, Link } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';

function Staff() {
  const history = useHistory()


  return (
    <div className={styles.container}>
      <StaffList />
      <button onClick={() => history.goBack()}>Назад</button>
      <Link to={'/staff/addworker'} className="uk-button uk-button-default"><button>Добавить работника</button></Link>
    </div>
  );
}

export default Staff;
