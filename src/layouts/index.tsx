import { lazy } from "react";

const Navbar = lazy(() => import("./navbar/view"));
const Footer = lazy(() => import("./footer/view"));

export { Navbar, Footer };
