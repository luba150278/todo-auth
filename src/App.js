import { Component } from "react";
import { checkLoginFunction } from "./common/functions/checkLoginFunction";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import "./App.scss";
import ToDo from "./components/ToDo/ToDo";

class App extends Component {
  state = {
    isLogin: checkLoginFunction(),
  };
  
  toggleLogin = (data) => {
    this.setState({ isLogin: data });
  };

  render() {
    if (!this.state.isLogin) {
      return (
        <Layout toggleLogin={this.toggleLogin}>
          <Auth toggleLogin={this.toggleLogin} />
        </Layout>
      );
    }
    return (
      <Layout toggleLogin={this.toggleLogin}>
        <ToDo />
      </Layout>
    );
  }
}

export default App;
