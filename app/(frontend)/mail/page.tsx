import Image from "next/image";
import { accounts, mails } from "./data";
import { Mail } from "./components/mail";
import { cookies } from "next/headers";

export default async function MailPage() {
  const layoutCookie = (await cookies()).get(
    "react-resizable-panels:layout:mail"
  );
  const collapsedCookie = (await cookies()).get(
    "react-resizable-panels:collapsed"
  );

  const defaultLayout = layoutCookie
    ? JSON.parse(layoutCookie.value)
    : undefined;
  const defaultCollapsed = collapsedCookie
    ? JSON.parse(collapsedCookie.value)
    : undefined;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
