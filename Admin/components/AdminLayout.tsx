import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (false) {
        router.push("/login");
      } else {
        console.log("erru");
      }
    };
    getUser();
  }, []);

  return (
    <>
      <nav>
      </nav>
      <main>{children}</main>
    </>
  );
}

