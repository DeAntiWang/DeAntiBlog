import { useEffect, useRef, useState } from "react";
import { Input, Button } from "@geist-ui/react";
import fetch from "../../common/fetch";
import { dateFormat } from "../../common/format";
import "../../styles/UploadBox.scss";

interface UploadFile {
  filename: string,
  filetype: string,
  extname: string,
  data: any, // blob or string?
  object: File,
}

export default function UploadBox() {
  const defaultFileList: Array<UploadFile> = [];

  const dropzoneRef = useRef();
  const [inBox, setIn] = useState(false);
  const [articleText, setText] = useState("");
  const [articleName, setName] = useState("");
  const [articleTag, setTag] = useState("");
  const [attachURL, setAttachURL] = useState("");
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
    if (fileList.length === 1) setFileList([]);
    const files = fileList.filter((val) => (val != file));
    setFileList([...files]);
  };

  const doUpload = async () => {
    const resp = await fetch("/article/upload", "POST", {
      title: articleName,
      tag: articleTag,
      content: articleText,
      time: dateFormat(new Date().toLocaleString())
    });
    // TODO files
    if (resp.statusCode) { // TODO handler response

    }
  };

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
    const articleFile = fileList.find(val => val.filetype === "text/markdown");
    if (!articleFile) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const getTitleRegex = /#\s*(.*)/g;
      const uploadURLRegex = /\!\[.*\]\(\.?\/upload\/(.*)\/.*\)/g
      const text: any = reader.result || "";
      if (text) {
        setText(text);
        // 尝试获取文章标题
        const matches = getTitleRegex.exec(text);
        if (matches && matches[1]) {
          const title = matches[1];
          setName(title);
        }
        // 尝试获取附件目录
        const uploadMatches = uploadURLRegex.exec(text);
        if (uploadMatches && uploadMatches[0]) {
          const uploadURL = uploadMatches[1];
          setAttachURL(uploadURL);
        }
      }
    });
    reader.readAsText(articleFile.object);
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
        <div className="function-group">
          <Input value={articleName} onChange={setName.bind(this)} placeholder={"Article Title"}/>
          <Input value={articleTag} onChange={setTag.bind(this)} placeholder={"Article Tag"}/>
          <Input value={attachURL} onChange={setAttachURL.bind(this)} placeholder={"Files URL of 'upload/'"}/>
          <Button onClick={doUpload}>Upload Article & Files</Button>
        </div>
      </div>
      
    </div>
  );
}