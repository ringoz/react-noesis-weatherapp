import { renderGUI } from '@ringozz/react-noesis';
import { App } from './App';

export default renderGUI(<App />, document.querySelector('canvas')!);
