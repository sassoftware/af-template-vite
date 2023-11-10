/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import Header from "./components/Header";
import logo from "./assets/sas-logo-large.png";
import styles from "./App.module.scss";

const App = () => (
  <div className={styles.app}>
    <Header />
    <div className={styles.content}>
      <img src={logo} alt="SAS logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a href="https://appfactory-docs.engage.sas.com/" target="_blank" rel="noopener noreferrer">
        Visit App Factory documentation
      </a>
    </div>
  </div>
);

export default App;
