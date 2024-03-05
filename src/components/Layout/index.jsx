import { useGlobalContext } from "..";
import { Container } from "../container/Container";
import Logo from "../../assets/apico logo.png";
import close from "../../assets/close.png";
import question from "../../assets/question.png";
import download from "../../assets/download.png";
import downloadBlob from "../../helpers/downloadBlob";
import { useState } from "preact/hooks";
import { Help } from "../help";
import { createPortal } from "preact/compat";
import { canUseDOM } from "../../helpers/canUseDOM";

export const Layout = ({ children }) => {
  const { title, save, setSave } = useGlobalContext();
  const [showHelp, setShowHelp] = useState(false);

  const container = canUseDOM && document.getElementById("modal");

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <img src={Logo} alt="Apico" className="crisp" width={208} height={153} />
      <div className="relative">
        <Container title={title}>{children}</Container>
        {!save && (
          <img
            src={question}
            alt="Help"
            className="crisp absolute -left-9 top-0 cursor-pointer"
            width="32px"
            height="32px"
            title="Help"
            onClick={() => {
              setShowHelp(!showHelp);
            }}
          />
        )}
        {save && (
          <>
            <img
              src={close}
              alt="Close"
              className="crisp absolute -left-9 top-0 cursor-pointer"
              width="32px"
              height="32px"
              title="Load a new save file."
              onClick={() => {
                setSave(null);
              }}
            />
            <img
              src={question}
              alt="Help"
              className="crisp absolute -left-9 top-9 cursor-pointer"
              width="32px"
              height="32px"
              title="Help"
              onClick={() => {
                setShowHelp(!showHelp);
              }}
            />
            <img
              src={download}
              alt="Download"
              className="crisp absolute -left-9 top-[72px] cursor-pointer"
              width="32px"
              height="32px"
              title="Download your save file."
              onClick={() => {
                downloadBlob(
                  JSON.stringify(save),
                  `apico-modded-save-${save.player.name}.json`,
                  "application/json",
                );
              }}
            />
          </>
        )}
      </div>
      <div className="h-[153]"></div>
      {showHelp &&
        createPortal(<Help onClose={() => setShowHelp(false)} />, container)}
    </div>
  );
};
