import { FileWithPath, fromEvent } from "file-selector";
import { ChangeEvent } from "preact/compat";
import { useRef } from "preact/hooks";


declare global {
  interface Window {
    showOpenFilePicker: (options: unknown) => Promise<unknown>;
  }
}

interface DropzoneProps {
  onDrop: (files: (FileWithPath | DataTransferItem)[]) => void;
  accept: Record<string, string[]>;
}

export const useDropzone = ({ onDrop, accept }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (ev: DragEvent) => {
    ev.preventDefault();
    const files = await fromEvent(ev);

    onDrop(files);
  };

  const handleClick = async () => {
    if (window.isSecureContext && "showOpenFilePicker" in window) {
      const handles = await window.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: "File",
            accept,
          },
        ],
      });
      const files = await fromEvent(handles);

      onDrop(files);
      return;
    }

    if (inputRef.current) {
      console.log(inputRef.current);
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const files = await fromEvent(ev);

    onDrop(files);
  };

  return {
    getInputProps: () => ({
      ref: inputRef,
      type: "file",
      accept: Object.keys(accept).join(","),
      onChange: handleChange,
      className: "hidden",
    }),
    getRootProps: () => ({
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      onClick: handleClick,
      role: "presentation" as const,
    }),
  };
};
