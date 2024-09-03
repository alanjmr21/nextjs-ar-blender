"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <a rel="ar" href="/Praying.usdz">
        <Image
          src="/thumbnail.png"
          width={500}
          height={500}
          alt="Picture of a cage"
        />
      </a>
    </div>
  );
}
