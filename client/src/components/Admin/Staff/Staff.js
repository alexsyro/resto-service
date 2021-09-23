import { useHistory, Link } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';


function Staff() {
  const history = useHistory()

  return (
    <>
      <div className={styles.find__block}>
        <p>Поиск сотрудника:</p>
        <StaffList />
      </div>
      <div className={styles.container}>
      <button className="uk-button uk-button-primary" onClick={() => history.goBack()}>Назад</button>
      <Link  to={'/staff/new'} ><button className="uk-button uk-button-primary">Добавить работника</button></Link>
      </div>
    </>
  );
}

export default Staff;
