"use client";

import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RecursiveMenuItem = ({
  menu,
  openMenus,
  toggleMenu,
  parentId,
  path,
  closeFunction,
}: {
  menu: any;
  openMenus: Record<string, string | null>;
  toggleMenu: (parentId: string | null, id: string) => void;
  parentId: string | null;
  path: string | null;
  closeFunction: Function;
}) => {
  if (!menu) return null;

  const isOpen = openMenus[parentId || "root"] === menu.id;

  const handleClick = () => {
    toggleMenu(parentId, menu.id);
  };

  if (menu.type === "group") {
    return (
      <Box
        sx={[
          {
            fontFamily: "vazirmatn",
            alignItems: "center",
          },
        ]}
        key={menu.id}
      >
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
          onClick={handleClick}
        >
          <Box
            sx={[
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "right",
              },
            ]}
          >
            {menu?.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  width: "2rem",
                }}
              >
                {<menu.icon />}
              </ListItemIcon>
            )}
            <ListItemText
              primary={menu.title}
              sx={{ textAlign: "right", flex: 1 }}
            />
          </Box>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List sx={{}}>
            {menu.children?.map((child: any) => (
              <RecursiveMenuItem
                key={child.id}
                menu={child}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                parentId={menu.id}
                path={path}
                closeFunction={closeFunction}
              />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  if (menu.type === "item") {
    return (
      <ListItemButton
        onClick={() => closeFunction()}
        component={Link}
        href={`/admin/${menu.id}`}
        sx={[menu?.id == path && { backgroundColor: "#f0f0f0" }]}
        key={menu.id}
      >
        {menu?.icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              width: "2rem",
            }}
          >
            {<menu.icon />}
          </ListItemIcon>
        )}
        <ListItemText
          sx={[
            {
              flex: 1,
            },
          ]}
          primary={menu.title}
        />
      </ListItemButton>
    );
  }

  return null;
};

const SideCollapsingMenu = ({
  menuList,
  closeFunction,
}: {
  menuList: any;
  closeFunction: Function;
}) => {
  const path = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, string | null>>({
    root: null,
  });

  const toggleMenu = (parentId: string | null, id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [parentId || "root"]: prev[parentId || "root"] === id ? null : id,
    }));
  };

  return (
    <List
      sx={{
        zIndex: 5,
        position: "fixed",
        borderRight: "1px solid #ccc",
        height: "100%",
        backgroundColor: "#f7f7f7",
      }}
    >
      {menuList.map((menu: any) => (
        <RecursiveMenuItem
          key={menu.id}
          menu={menu}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          parentId={null} // Top-level menus have no parent
          path={path}
          closeFunction={closeFunction}
        />
      ))}
    </List>
  );
};

export default SideCollapsingMenu;
