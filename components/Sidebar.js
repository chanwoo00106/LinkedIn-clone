import { Avatar } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";

function Sidebar() {
  return (
    <div className="space-y-2 min-w-max max-w-lg">
      <div className="bg-white light dark:bg-[#1d2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          <Image
            src="https://rb.gy/i26zak"
            layout="fill"
            alt="profile"
            priority
          />
        </div>
        <Avatar
          //   onClick={signOut}
          // src=""
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            Chan Woo
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            example@example.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
