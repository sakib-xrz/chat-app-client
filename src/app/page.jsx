import MessageContainer from "@/components/messages/MessageContainer";
import AuthGuardHOC from "@/components/shared/AuthGaurdHOC";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <AuthGuardHOC>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </AuthGuardHOC>
  );
}