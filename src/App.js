import React from "react";

import Cards from "./Components/Cards/Cards";
import Graph from "./Components/Graph/Graph";
import Dropdown from "./Components/DropDown/Dropdown";
import TextScroll from "./Components/TextScroll/TextScroll";
import Footer from "./Components/Footer/Footer";

import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  _isMounted = false;

  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    this._isMounted = true;
    const fetchedData = await fetchData();
    if (this._isMounted) {
      this.setState({ data: fetchedData });
    }
  }

  handleCountryChange = async (country) => {
    let fetchedData = null;
    if (country === "Global") {
      fetchedData = await fetchData();
    } else {
      fetchedData = await fetchData(country);
    }
    this.setState({ data: fetchedData, country: country });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>COVID-19 TRACKER</h1>
        <TextScroll />
        <Cards data={data} />
        <Dropdown handleCountryChange={this.handleCountryChange} />
        <Graph data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
