import RegisterForm from "@/components/(auth)/RegisterForm";
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
        <div className="w-full max-w-md ">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default page;
