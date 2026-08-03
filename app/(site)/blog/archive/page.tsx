// This file just "borrows" the logic from the page 1 route
import ArchivePage from "./[page]/page";

export default function Page() {
  // We manually pass "1" as the param
  return <ArchivePage params={Promise.resolve({ page: "1" })} />;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بایگانی نوشته‌ها",
  description: "فهرست کامل تمامی مقالات و یادداشت‌های آرش کدخدائی",
};
