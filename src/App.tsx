import { Container } from "./components/Container";
import { ErrorBoundary } from "react-error-boundary";
import { Error, ErrorHandler } from "./components/common/Error";
import { useSettings } from "./hooks";

export const App = () => {
  const { settings, changeSettings } = useSettings();

  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <Container
        settings={settings}
        changeSettings={changeSettings}
      ></Container>
    </ErrorBoundary>
  );
};

export default App;
