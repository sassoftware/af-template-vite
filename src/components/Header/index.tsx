/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from "react";
import { useMsal, useAccount } from "@azure/msal-react";

import { Avatar } from "../Avatar";
import { Menu } from "../Menu";

import SasLogoWhite from "../../assets/sas-logo-white.svg";
import styles from "./Header.module.scss";

function Header() {
  const menuAnchor = useRef(null);
  const msal = useMsal();
  const account = useAccount();

  return (
    <div className={styles.header}>
      <img src={SasLogoWhite} alt="SAS" />

      <Menu
        anchorRef={menuAnchor}
        onSelect={(identifier) => {
          if (identifier === "logout") {
            console.log("logging out...");
            msal.instance.logout({ account: msal.instance.getActiveAccount() });
          }
        }}
        items={[{ identifier: "logout", text: "Log Out" }]}
      >
        <Avatar ref={menuAnchor} name={account?.name} />
      </Menu>
    </div>
  );
}

export default Header;
