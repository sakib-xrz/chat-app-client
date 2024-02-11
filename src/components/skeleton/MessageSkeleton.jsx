const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="animate-pulse bg-gray-100/10 w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="animate-pulse rounded-md bg-gray-100/10 h-4 w-40"></div>
          <div className="animate-pulse rounded-md bg-gray-100/10 h-4 w-40"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="animate-pulse rounded-md bg-gray-100/10 h-4 w-40"></div>
        </div>
        <div className="animate-pulse bg-gray-100/10 w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </>
  );
};
export default MessageSkeleton;
