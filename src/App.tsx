import { Container } from "./components/Container";
import { ErrorBoundary } from "react-error-boundary";
import { Error, ErrorHandler } from "./components/common/Error";
import { useSettings } from "./hooks";
import { StackPanel } from "@ringozz/react-noesis";

export const App = () => {
  const { settings, changeSettings } = useSettings();

  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <StackPanel>
        <Container
          settings={settings}
          changeSettings={changeSettings}
        ></Container>
      </StackPanel>
    </ErrorBoundary>
  );
};

export default App;
