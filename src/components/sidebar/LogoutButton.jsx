"use client";

import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <div className="mt-auto ">
      <div
        onClick={() => router.push("/logout")}
        className="flex items-center gap-2 bg-red-500 w-fit py-1.5 pl-2 pr-3 rounded-lg cursor-pointer"
      >
        <BiLogOut className="w-6 h-6 text-white" />
        <p className="text-white"> Logout</p>
      </div>
    </div>
  );
}
