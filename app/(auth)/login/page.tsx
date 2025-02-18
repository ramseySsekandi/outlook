import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-[1fr,2fr]">
      {/* Left blue section */}
      <div className="bg-[#0078D4] p-8 flex items-center justify-center">
        <Image alt="outlook" src="/logo.png" width={150} height={150} />
      </div>

      {/* Right login section */}
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-8">
            <Image
              src="https://cdn.mos.cms.futurecdn.net/Un5CRWVYRDC769ZrkZKAjn-650-80.jpg.webp"
              alt="Outlook Logo"
              width={200}
              height={50}
              className="h-24 w-auto"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
