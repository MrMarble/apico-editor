import { FileUp } from "lucide-preact";
import { Box } from "../Box";
import { useDropzone } from "@/hooks/useDropzone";
import question from "@/assets/question.png";
import { useGlobalContext } from "../Context";
import { Container } from "../Container";

export const Upload = () => {
  const { setSave } = useGlobalContext();
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "application/json": [".json"],
    },

    onDrop: (files) => {
      const fr = new FileReader();
      fr.onloadend = () => {
        const data = fr.result;
        if (!data || typeof data !== "string") return;

        const save = JSON.parse(data);
        setSave(save);
      };

      if (files[0]) {
        fr.readAsText(files[0] as Blob);
      }
    },
  });

  return (
    <>
      <Container.Primary>
        <div className="flex cursor-pointer justify-center" {...getRootProps()}>
          <Box border="dark">
            <Box border="hilight" className="text-dark">
              <input {...getInputProps()} />
              <FileUp className="m-2" size={50} />
            </Box>
          </Box>
        </div>
      </Container.Primary>
      <Container.Secondary>
        <p className="prose text-black">
          Drag and drop your save or click to select a file. The Apico save file
          is normally located at{" "}
          <code>%localappdata%/APICO/saves/gamesave-1.json</code>.
        </p>
        <p className="prose text-black prose-img:my-0">
          Click the{" "}
          <img src={question} alt="help" className="crisp inline w-4" /> icon
          for more information.
        </p>
      </Container.Secondary>
    </>
  );
};
