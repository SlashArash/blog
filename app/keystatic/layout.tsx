import { notFound } from "next/navigation";

import KeystaticApp from "./keystatic";
import { showAdminUI } from "../../keystatic.config";

export default function RootLayout() {
  if (showAdminUI === false) {
    notFound();
  }
  return <KeystaticApp />;
}
