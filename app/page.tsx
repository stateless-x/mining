'use client';
import Image from "next/image";
import PoolList from "@Components/PoolList";
import Navbar from "@Components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PoolList />
    </main>
  );
}
