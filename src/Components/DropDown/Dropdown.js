import React from "react";
import { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./Dropdown.module.css";
import { fetchCountries } from "../../api";

const Dropdown = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const Global = "Global";
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setCountries]);

  return (
    <FormControl className={styles.container}>
      <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="Global">{Global}</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Dropdown;
