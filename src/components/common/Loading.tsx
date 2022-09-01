import { ReactElement } from "react";

type LoadingProps = {
  children: ReactElement;
  isLoading: boolean;
};

export const Loading = ({ children, isLoading }: LoadingProps) => {
  return (
    <>{isLoading ? <div className="loading">Loading...</div> : children}</>
  );
};

export default Loading;
