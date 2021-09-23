import { useHistory, Link } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';


function Staff() {
  const history = useHistory()
  

  return (
    <>
     <div className={styles.container}>
      <button  className={styles.back} onClick={() => history.goBack()}>Назад</button>
      <Link  to={'/staff/new'} ><button  className={styles.add}>Добавить работника</button></Link>
      </div>
      <div className={styles.find__block}>
        <p className={styles.worker}>Поиск сотрудника:</p>
        <StaffList />
      </div>
     
    </>
  );
}

export default Staff;
