/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React from "react";
import { forwardRef } from "react";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  name?: string;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar({ name }, ref) {
  return (
    <div className={styles.avatar} ref={ref} title={name && `Signed in as ${name}`}>
      {name?.charAt(0) || "U"}
    </div>
  );
});

export default Avatar;
