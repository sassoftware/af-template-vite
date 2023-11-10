/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from "react";
import styles from "./Menu.module.scss";

interface MenuProps {
  anchorRef: React.RefObject<HTMLDivElement>;
  items: {
    identifier: string;
    text: string;
  }[];
  onSelect: (identifier: string) => void;
  children?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ anchorRef, items, onSelect, children }) => {
  const [open, setOpen] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null); // Add a ref for the menu content

  const handleClick = () => {
    setOpen(!open);
  };

  const handleItemClick = (identifier: string) => {
    onSelect(identifier);
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click target is outside the anchorRef and the menuContentRef
      if (
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node) &&
        menuContentRef.current &&
        !menuContentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [anchorRef, menuContentRef]);

  return (
    <div className={styles.menuWrapper}>
      <div ref={anchorRef} onClick={handleClick}>
        {children}
      </div>
      <div ref={menuContentRef} className={`${styles.menu} ${open ? styles.open : ""}`}>
        {items.map((item) => (
          <div key={item.identifier} className={styles.menuItem} onClick={() => handleItemClick(item.identifier)}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
