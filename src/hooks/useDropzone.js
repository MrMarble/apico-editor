import { fromEvent } from "file-selector";
import { useRef } from "preact/hooks";

export const useDropzone = ({ onDrop, accept }) => {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (ev) => {
    ev.preventDefault();
    ev.persist();
    const files = await fromEvent(ev);

    onDrop(files);
  };

  const handleClick = async (ev) => {
    ev.persist();

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
      inputRef.current.value = null;
      inputRef.current.click();
    }
  };

  const handleChange = async (ev) => {
    ev.persist();
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
      role: "presentation",
    }),
  };
};
