import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import styles from './Admin.module.scss';

function Admin() {
  return (
    <div className={styles.container}>
      <SideMenu />
      <Main />
    </div>
  );
}

export default Admin;
