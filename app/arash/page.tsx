import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Metadata } from "next";

import { reader } from "../reader";
import { markdocConfig } from "../../keystatic.config";

export default async function AboutPage() {
  const data = await reader.singletons.about.read();

  if (!data) return <div>در حال بارگذاری...</div>;

  const { node } = await data.content();
  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <main className="max-w-3xl mx-auto py-16 px-4" dir="rtl">
      <article className="prose prose-lg dark:prose-invert prose-blue prose-rtl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
        {Markdoc.renderers.react(renderable, React)}
      </article>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await reader.singletons.about.read();

  // Fallback values if the singleton hasn't been created yet
  const title = "درباره‌ی من";
  const description =
    "بیوگرافی، تجربیات و مسیر حرفه‌ای آرش کدخدایی در دنیای توسعه نرم‌افزار";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: "https://kadkhodaei.ir/arash",
      siteName: "آرش کدخدایی",
      locale: "fa_IR",
      type: "profile",
      firstName: "آرش",
      lastName: "کدخدایی",
      username: "arash",
    },
    alternates: {
      canonical: "/arash",
    },
  };
}
