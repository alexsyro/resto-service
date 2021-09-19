import { useHistory, Link } from 'react-router-dom';
import ClientList from './ClientList';

function UsersPage() {
  const history = useHistory()

  return (
    <>
      <div>
        <ClientList />
      </div>
      <br />
      <button className='uk-button uk-button-default' onClick={() => history.goBack()}>Назад</button>
      <br />
      <br />
      {/* <Link to={'/staff/addworker'} className="uk-button uk-button-default"><button>Добавить работника</button></Link> */}
    </>
  );
}

export default UsersPage;
