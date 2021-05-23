import { useCallback, useEffect, useRef, useState } from "react";
import { Input, Button, useToasts } from "@geist-ui/react";
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
  const dropzoneRef = useRef();
  const [inBox, setIn] = useState(false);
  const [articleText, setText] = useState("");
  const [articleName, setName] = useState("");
  const [articleTag, setTag] = useState("");
  const [attachURL, setAttachURL] = useState("");
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const [toasts, setToast] = useToasts();

  const onEnter = (ev: any) => { ev.target.className.includes("dropzone") && setIn(() => true); };
  const onLeave = (ev: any) => { ev.target.className.includes("dropzone") && setIn(() => false); };
  const onOver = (ev: DragEvent) => { ev.preventDefault(); };
  const onEnd = () => { setIn(() => false); };
  const onDrop = (ev: DragEvent) => {
    const target: any = ev.target;
    if (target.className?.includes("dropzone")) {
      ev.preventDefault();
      
      const files = ev.dataTransfer.files;
      const newFiles = [...files].map((file: File) => (
        {
          filename: file.name,
          filetype: file.type,
          extname: "",
          data: undefined,
          object: file
        }
      ));

      setFileList(prevList => ([...prevList, ...newFiles]));
      setIn(() => false);
    }
  };

  const deleteFile = (file: UploadFile) => {
    if (fileList.length === 1) setFileList([]);
    const files = fileList.filter((val) => (val != file));
    setFileList([...files]);
  };

  const doUpload = async () => {
    const formData = new FormData();
    formData.append("title", articleName);
    formData.append("tag", articleTag);
    formData.append("content", articleText);
    formData.append("time", dateFormat("", new Date()));
    fileList.forEach((file) => {
      if (file.filetype !== "text/markdown") {
        formData.append("files", file.object);
      }
    });

    const resp = await fetch("/article/upload", "POST", formData);
    if (resp.statusCode === 200) {
      const data = resp.data;
      const id = data.id;
      setToast({
        text: '上传发表成功',
        type: 'success',
      });
    } else {
      console.error("🚀 err_msg: %s", resp.message);
      setToast({
        text: '上传失败',
        type: 'error',
      });
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
    
    if (articleFile) {
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
    }

  }, [fileList]);

  return (
    <div className="upload-page">
      <div className="upload-box dropzone" ref={dropzoneRef}>
        { inBox ? "Release, I will catch them!" : "Drag and drop your article & attached files here" }
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
          <Input value={articleName} onChange={(ev) => setName(ev.target.value)} placeholder={"Article Title"}/>
          <Input value={articleTag} onChange={(ev) => setTag(ev.target.value)} placeholder={"Article Tag"}/>
          <Input value={attachURL} onChange={(ev) => setAttachURL(ev.target.value)} placeholder={"Files URL of 'upload/'"}/>
          <Button onClick={doUpload}>Upload Article & Files</Button>
        </div>
      </div>
      
    </div>
  );
}