import { useHistory, Link } from 'react-router-dom';
import styles from './Staff.module.scss';
import StaffList from './StaffList';

function Staff() {
  const history = useHistory()

  return (
    <>
      <div className={styles.container}>
        <StaffList />
      </div>
      <br />
      <button className='uk-button uk-button-default' onClick={() => history.goBack()}>Назад</button>
      <br />
      <br />
      <Link to={'/staff/new'} className="uk-button uk-button-default"><button>Добавить работника</button></Link>
    </>
  );
}

export default Staff;
