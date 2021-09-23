import { useHistory, Link } from 'react-router-dom';
import ClientList from './ClientList';
import styles from './Client.module.scss'

function UsersPage() {
  const history = useHistory()

  return (
    <>
      <div className={styles.buttons}>
        <button className={styles.back} onClick={() => history.goBack()}>Назад</button>
        <Link to={`/clients/new`} >
          <button className={styles.add}> Добавить Клиента </button>
        </Link>
      </div>
      <div>
        <ClientList />
      </div>
    </>
  );
}

export default UsersPage;
