import { useState } from "preact/hooks";
import { Layout } from "./components/Layout";
import { Microscope } from "./components/Microscope";
import { useImmer } from "@/hooks/useImmer";
import { GlobalContext } from "./components/Context";
import { Upload } from "./components/Upload";

export function App() {
  const [save, setSave] = useImmer(null);
  const [title, setTitle] = useState("save editor");

  return (
    <GlobalContext.Provider value={{ title, save, setSave, setTitle }}>
      <Layout>{!save ? <Upload /> : <Microscope />}</Layout>
    </GlobalContext.Provider>
  );
}
