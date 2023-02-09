import React, { useEffect } from "react";
import HomeCards from "../components/HomeCards";
import Hero from "../components/Hero";
import withLayout from "../components/withLayout";

export default function Home() {
  return (
    <>
      <section className="heroParallax">
        <Hero />
      </section>
      <section className="marginParallax">
        <HomeCards />
      </section>
    </>
  );
}

Home.getLayout = withLayout();
