import { Container } from "./components/Container";
import { useSettings } from "./hooks";

export const App = () => {
  const { settings, changeSettings } = useSettings();

  return (
    <Container
      settings={settings}
      changeSettings={changeSettings}
    ></Container>
  );
};

export default App;
