import { BsSend } from "react-icons/bs";

export default function MessageInput() {
  return (
    <form className="px-4 my-3">
      <div className="w-full">
        <input
          type="text"
          className="w-full input border h-10 bg-transparent border-white/50 focus:border-white focus:outline-none text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
}
