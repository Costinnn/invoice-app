"use client";

import React, { useState } from "react";

import Link from "next/link";

import DashHomeSvg from "@/components/svg/DashHomeSvg";
import DashInvoiceSvg from "@/components/svg/DashInvoiceSvg";
import DashRaportsSvg from "@/components/svg/DashRaportsSvg";
import DashConfigSvg from "@/components/svg/DashConfigSvg";
import DashUserSvg from "@/components/svg/DashUserSvg";

import "./DashMenu.scss";

type SubMenuType = { issues: boolean; raports: boolean; config: boolean };

const DashMenu = () => {
  const [subMenusOpen, setSubMenusOpen] = useState<SubMenuType>({
    issues: false,
    raports: false,
    config: false,
  });

  const toggleSubMenusOpen = (subMenuType: "issues" | "raports" | "config") => {
    const oldValue = subMenusOpen[subMenuType as keyof SubMenuType];
    setSubMenusOpen({
      issues: false,
      raports: false,
      config: false,
      [subMenuType]: !oldValue,
    });
  };

  const closeSubMenu = () => {
    setSubMenusOpen({
      issues: false,
      raports: false,
      config: false,
    });
  };

  return (
    <section className="dashmenu">
      <div className="content">
        {/* MENU */}
        <ul className="menubar">
          <li>
            <Link href="/dashboard" onClick={closeSubMenu}>
              <DashHomeSvg color="#F3F8FF" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleSubMenusOpen("issues")}
              style={{
                background: subMenusOpen.issues
                  ? "linear-gradient(var(--violet-medium), var(--violet))"
                  : "",
              }}
            >
              <DashInvoiceSvg color="#F3F8FF" />
              <span>Issuing</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleSubMenusOpen("raports")}
              style={{
                background: subMenusOpen.raports
                  ? "linear-gradient(var(--violet-medium), var(--violet))"
                  : "",
              }}
            >
              <DashRaportsSvg color="#F3F8FF" />
              <span>Raports</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleSubMenusOpen("config")}
              style={{
                background: subMenusOpen.config
                  ? "linear-gradient(var(--violet-medium), var(--violet))"
                  : "",
              }}
            >
              <DashConfigSvg color="#F3F8FF" />
              <span>Configuration</span>
            </button>
          </li>
          <li>
            <Link href="/dashboard" type="button" onClick={closeSubMenu}>
              <DashUserSvg color="#F3F8FF" />
              <span>Contul meu</span>
            </Link>
          </li>
        </ul>

        {/* SUBMENUS */}
        {subMenusOpen.issues && (
          <div className="submenu-issue">
            <h4>Issuing</h4>
            <ul>
              <li>
                <Link
                  href={"/dashboard/issuing/invoice"}
                  onClick={closeSubMenu}
                >
                  Invoice
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/issuing/canceledInvoice"}
                  onClick={closeSubMenu}
                >
                  Canceled invoice
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/issuing/receipt"}
                  onClick={closeSubMenu}
                >
                  Receipt
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/issuing/notice"} onClick={closeSubMenu}>
                  Notice
                </Link>
              </li>
            </ul>
          </div>
        )}

        {subMenusOpen.raports && (
          <div className="submenu-raports">
            <h4>Raports</h4>
            <ul>
              <h5>Issued documents</h5>
              <li>
                <Link
                  href={"/dashboard/raports/invoice"}
                  onClick={closeSubMenu}
                >
                  Invoices
                </Link>
              </li>
              <li>
                <Link href={"/dashboard"} onClick={closeSubMenu}>
                  Canceled invoices
                </Link>
              </li>
              <li>
                <Link href={"/dashboard"} onClick={closeSubMenu}>
                  Receipts
                </Link>
              </li>
              <li>
                <Link href={"/dashboard"} onClick={closeSubMenu}>
                  Notices
                </Link>
              </li>
            </ul>
          </div>
        )}

        {subMenusOpen.config && (
          <div className="submenu-config">
            <h4>Configuration</h4>
            <ul>
              <h5>Company data</h5>
              <li>
                <Link href={"/dashboard"} onClick={closeSubMenu}>
                  General
                </Link>
              </li>
              <li>
                <Link href={"/dashboard"} onClick={closeSubMenu}>
                  Accounts
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashMenu;
