"use client";

import MessageContainer from "@/components/messages/MessageContainer";
import AuthGuardHOC from "@/components/shared/AuthGaurdHOC";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="mockup-browser border border-gray-300 bg-transparent">
      <div className="mockup-browser-toolbar bg-base-300 !mt-0 !mb-0 py-2">
        <div className="input">https://chat-app.com</div>
      </div>
      <AuthGuardHOC>
        <div className="flex sm:h-[450px] md:h-[550px] rounded-b-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
          <Sidebar />
          <MessageContainer />
        </div>
      </AuthGuardHOC>
    </div>
  );
}
