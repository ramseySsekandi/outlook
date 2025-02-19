import React, { ReactNode } from "react";
import { getSession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function FrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSession();
  if (!user) {
    return redirect("/login");
  }
  return <div>{children}</div>;
}
