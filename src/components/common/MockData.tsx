import { Hyperlink, TextBlock } from "@ringozz/react-noesis";
import { ReactElement } from "react";

type MockDataProps = {
  children: ReactElement;
  useMockData: boolean;
};

export const MockData = ({ children, useMockData }: MockDataProps) => {
  return (
    <>
      {useMockData ? (
        <>
          <TextBlock>
            The application is running in demo mode. To run the application with
            real data please check the{" "}
            <Hyperlink NavigateUri="https://github.com/gheorghedarle/React-WeatherApp">
              documentation
            </Hyperlink>
            .
          </TextBlock>
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default MockData;
