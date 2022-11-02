import { useState } from 'react';
import { checkLoginFunction } from "./common/checkLoginFunction";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import "./App.scss";

function App() {
  //const isLogin = checkLoginFunction();
  const [isLogin, setIsLogin] = useState(checkLoginFunction())
  const toggleLogin = (data) => {
    setIsLogin(data)
  }
  console.log(isLogin)
  if (!isLogin) {
    return (
      <Layout toggleLogin={toggleLogin}>
        <Auth toggleLogin={toggleLogin} />
      </Layout>
    );
  }
  return <Layout toggleLogin={toggleLogin}>hhhhh</Layout>;
}

export default App;
