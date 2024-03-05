import { createContext } from "preact";
import { useContext } from "preact/hooks";

export { Box } from "./box/Box";
export { Container } from "./container/Container";
export { Upload } from "./upload/Upload";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
