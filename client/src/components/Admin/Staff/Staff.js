import { useHistory, Link } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';


function Staff() {
  const history = useHistory()

  return (
    <>
      <div >
        <StaffList />
      </div>
      <br />
      <div className={styles.container} >
      <button className={styles.back} onClick={() => history.goBack()}>Назад</button>
      <br />
      <br />
      <Link  to={'/staff/new'} ><button className={styles.add}>Добавить работника</button></Link>
      </div>
    </>
  );
}

export default Staff;
