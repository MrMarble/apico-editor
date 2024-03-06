import { Save } from "@/types/Save";
import { createContext } from "preact";
import { StateUpdater, useContext } from "preact/hooks";


interface GlobalContext {
  title: string;
  setTitle: StateUpdater<string>;
  save: Save;
  setSave: StateUpdater<Save>;
}


export const GlobalContext = createContext<GlobalContext>({
  title: "",
  setTitle: () => { },
  save: {} as Save,
  setSave: () => { },
});

export const useGlobalContext = () => useContext(GlobalContext);
