import { Button } from "react-bootstrap";
import instance from "../../api/request";
import { clearSrorage } from "../../common/clearLocalStorageFunction";
import styles from './Header.module.scss'

function Header({toggleLogin}) {
  // Приймаємо глобальні значення lang  за допомогою хука useContext
  const logoutFunction = async () => {
    try {
      const res = await instance.post("router?action=logout");
      if (res.data.ok) {
        clearSrorage();
        toggleLogin(false)
      } else {
        
      }
    } catch (err) {
      
    }

  }
  return (
    <header>
      <div className="container">
        <div className={styles.header} onClick={logoutFunction}>
          <Button variant="primary">Logout</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;