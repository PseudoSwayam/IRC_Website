import React from "react";
import { Navbar2 } from "../home/components/navbar-02";
import { Header30 } from "../home/components/header-30";
import { Layout239 } from "../home/components/layout-239";
import { Layout239_1 } from "../home/components/layout-239_1";
import { Blog34 } from "../home/components/blog-34";
import { Footer9 } from "../home/components/footer-09";

export default function Page() {
  return (
    // Wrap your entire page in a <main> tag with the "dark-bg" class
    <main className="dark-bg">
      <Navbar2 />
      <Header30 />
      <Layout239 />
      <Layout239_1 />
      <Blog34 />
      <Footer9 />
    </main>
  );
}