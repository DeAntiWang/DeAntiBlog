import { useEffect, useRef, useState } from "react";
import { Button } from "@geist-ui/react";
import fetch from "../../common/fetch";
import "../../styles/UploadBox.scss";

interface UploadFile {
  filename: string,
  filetype: string,
  extname: string,
  data: any, // blob or string?
  object: File,
}

const doUpload = async () => {
  return;
  const resp = await fetch("/article/upload", "POST", {

  });
  // TODO
};

export default function UploadBox() {
  const defaultFileList: Array<UploadFile> = [];

  const dropzoneRef = useRef();
  const [inBox, setIn] = useState(false);
  const [fileList, setFileList] = useState(defaultFileList);

  const onEnter = (ev: any) => { ev.target.className.includes("dropzone") && setIn(true); };
  const onLeave = (ev: any) => { ev.target.className.includes("dropzone") && setIn(false); };
  const onOver = (ev: any) => { ev.preventDefault(); };
  const onEnd = (ev: any) => { setIn(false); };
  const onDrop = (ev: any) => {
    if (ev.target.className.includes("dropzone")) {
      ev.preventDefault();
      const files = ev.dataTransfer.files;
      setFileList([
        ...fileList,
        ...([...files].map((file: File) => {
          const retFile: UploadFile = {
            filename: file.name,
            filetype: file.type,
            extname: "",
            data: undefined,
            object: file
          };
          return retFile;
        })),
      ]);
      setIn(false);
    }
  };

  const deleteFile = (file: UploadFile) => {
    const files = fileList.filter((val) => (val != file));
    setFileList([...files]);
  }

  useEffect(() => {
    document.addEventListener("dragenter", onEnter);
    document.addEventListener("dragleave", onLeave);
    document.addEventListener("dragover", onOver);
    document.addEventListener("dragend", onEnd);
    document.addEventListener("drop", onDrop);

    return () => {
      document.removeEventListener("dragenter", onEnter);
      document.removeEventListener("dragleave", onLeave);
      document.removeEventListener("dragover", onOver);
      document.removeEventListener("dragend", onEnd);
      document.removeEventListener("drop", onDrop);
    }
  }, []);

  useEffect(() => {
    const dropzoneDom: any = dropzoneRef.current;
    if (inBox) {
      dropzoneDom.classList.add("dragovering");
    } else {
      if (dropzoneDom.className.includes("dragovering")) {
        dropzoneDom.classList.remove("dragovering")
      }
    }
  }, [inBox]);

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  return (
    <div className="upload-page">
      <div className="upload-box dropzone" ref={dropzoneRef}>
        <span>
          { inBox ? "Release, I will catch them!" : "Drag and drop your article & attached files here" }
        </span>
      </div>
      <div className="upload-operate-box">
        <ul className="upload-file-list">
          <li className="upload-list-title">File List</li>
          {
            fileList.map((val: UploadFile) => (
              <li className="upload-file-element" key={"file-" + val.filename}>
                <div className="file-info">
                  <span className="upload-file-name">{ val.filename }</span>
                  <span className="upload-file-type">{ val.filetype }</span>
                </div>
                <Button type="error" ghost auto
                  onClick={() => deleteFile(val)}
                >Delete</Button>
              </li>
            ))
          }
        </ul>
        <div>
          <Button onClick={doUpload}>Upload Article & Files</Button>
        </div>
      </div>
      
    </div>
  );
}