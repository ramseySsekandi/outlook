import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserSession } from "@/utils/dal";

// import { getUserSession } from "@/lib/dal";

export default async function FrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }
  return <div>{children}</div>;
}
