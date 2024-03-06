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
                backgroundColor: subMenusOpen.issues ? "var(--violet)" : "",
              }}
            >
              <DashInvoiceSvg color="#F3F8FF" />
              <span>Emitere</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleSubMenusOpen("raports")}
              style={{
                backgroundColor: subMenusOpen.raports ? "var(--violet)" : "",
              }}
            >
              <DashRaportsSvg color="#F3F8FF" />
              <span>Rapoarte</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleSubMenusOpen("config")}
              style={{
                backgroundColor: subMenusOpen.config ? "var(--violet)" : "",
              }}
            >
              <DashConfigSvg color="#F3F8FF" />
              <span>Configurare</span>
            </button>
          </li>
          <li>
            <Link
              href="/dashboard/invoice"
              type="button"
              onClick={closeSubMenu}
            >
              <DashUserSvg color="#F3F8FF" />
              <span>Contul meu</span>
            </Link>
          </li>
        </ul>
        {subMenusOpen.issues && (
          <div className="submenu-issue">
            <h4>Emitere</h4>
            <ul>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Factura
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Factura storno
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Bon Fiscal
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Aviz
                </Link>
              </li>
            </ul>
          </div>
        )}

        {subMenusOpen.raports && (
          <div className="submenu-raports">
            <h4>Rapoarte</h4>
            <ul>
              <h5>Documente emise</h5>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Facturi
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Facturi storno
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Bonuri fiscale
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Avize
                </Link>
              </li>
            </ul>
          </div>
        )}

        {subMenusOpen.config && (
          <div className="submenu-config">
            <h4>Configurare</h4>
            <ul>
              <h5>Datele firmei</h5>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Generale
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/invoice"} onClick={closeSubMenu}>
                  Conturi
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
