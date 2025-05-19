import { Loader } from "lucide-react";
import React from "react";

const LoadingPost = () => {
  return (
    <div className="not-prose flex flex-row justify-center items-center h-full">
      <Loader className="h-4 w-4 text-primary animate-spin" />
    </div>
  );
};

export default LoadingPost;
