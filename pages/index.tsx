import React, { useEffect } from "react";
import HomeCards from "../components/HomeCards";
import Hero from "../components/Hero";
import MainLayout from "../components/MainLayout";

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

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}