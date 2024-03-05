import { Upload, GlobalContext } from "./components";
import { useState } from "react";
import { Layout } from "./components/Layout";
import { Microscope } from "./components/microscope";
import { useImmer } from "./hooks/useImmer";

export function App() {
  const [save, setSave] = useImmer(null);
  const [title, setTitle] = useState("save editor");

  return (
    <GlobalContext.Provider value={{ title, save, setSave, setTitle }}>
      <Layout>{!save ? <Upload /> : <Microscope />}</Layout>
    </GlobalContext.Provider>
  );
}
