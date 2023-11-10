/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { ReactNode } from "react";
import { MsalAuth } from "@sassoftware/af-axios/react";
import { MsalProvider } from "@azure/msal-react";

import msalInstance from "./msalInstance";

import styles from "./Auth.module.scss";

interface AuthContextProviderProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthContextProviderProps) => (
  <MsalProvider instance={msalInstance}>
    <MsalAuth
      axiosConfig={{ baseURL: import.meta.env.VITE_AF_URL }}
      onAuthError={(err) => {
        console.error(err);
        // TODO: handle the error
      }}
      authenticationRequest={{
        scopes: [`${import.meta.env.VITE_MSAL_CLIENT_ID}/.default`],
      }}
      loadingElement={
        <div className={styles.msgWrapper}>
          <span>loading...</span>
        </div>
      }
      errorElement={
        <div className={styles.msgWrapper}>
          <span>error...</span>
        </div>
      }
    >
      {children}
    </MsalAuth>
  </MsalProvider>
);

export default Auth;
