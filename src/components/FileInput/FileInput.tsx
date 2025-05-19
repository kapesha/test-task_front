import classNames from 'classnames';
import {
  useState,
  ChangeEvent,
  DragEvent,
  Dispatch,
  SetStateAction,
} from 'react';

type Props = {
  files: (string | File)[];
  setFiles: Dispatch<SetStateAction<(string | File)[]>>;
};

export const FileInput: React.FC<Props> = ({
  files,
  setFiles,
}) => {
  const [dragOn, setDragOn] = useState<boolean>(false);

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const dropFiles = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const newFiles =
      event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
    setFiles((prev) => [...prev, ...newFiles]);
    setDragOn(false);
  };

  const handleDragOn = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragOn(true);
  };

  const hadleDragLeave = () => {
    setDragOn(false);
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className={classNames('file-input', {
          isActive: files.length !== 0,
          hoverEffect: dragOn,
        })}
        onDrop={dropFiles}
        onDragOver={handleDragOn}
        onDragLeave={hadleDragLeave}
      >
        <p className="file-input__text-block">
          Drag or click to download
        </p>
      </label>
      <input
        accept=".jpg, .jpeg, .png, .pdf, image/jpeg, image/png, application/pdf"
        multiple
        onChange={addFiles}
        id="fileInput"
        hidden
        type="file"
      />
    </>
  );
};
