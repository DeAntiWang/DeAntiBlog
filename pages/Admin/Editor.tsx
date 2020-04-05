import * as React from 'react';
import { Button, Input, Textarea, Card } from '@zeit-ui/react';
import Router from 'next/router';
import fetch from '../../common/fetch';
import notice from '../../common/clientMsg';
import debounce from '../../common/debounce';
import "../../static/styles/Admin.scss";

export default class Editor extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state={
      title: '',
      tag: '',
      content: '',
      files: []
    };
  }

  public static async getInitialProps({res, query}: any) {
    const result = await fetch('/User/check');
    if(result.statusCode===200 && result.data.isLogin===false) {
      if(res===undefined) {
        Router.push('/Admin/Login');
      }else{
        res.writeHead(301, {Location: '/Admin/Login'});
        res.end();
      }
    }

    let data = undefined;
    if(query.id!==undefined) {
      const result = await fetch('/Article/findById', 'GET', {id: query.id});
      if(result.statusCode===200) {
        data = result.data;
      }
    }
    return { data: data }
  }

  componentWillMount() {
    const data = this.props.data;
    if(data !== undefined) {
      this.setState({
        fileDisp: false,
        title: data.title,
        tag: data.tag,
        content: data.content
      })
    }
  }

  private async onSubmit() {
    const date = new Date();
    const id = this.props.data===undefined?undefined:this.props.data.id,
          title = this.state.title,
          tag = this.state.tag,
          content = this.state.content,
          formTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const url = '/Article/' + (id===undefined?'upload':'edit');

    let formData = new FormData();
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('content', content);
    formData.append('time', formTime);
    if(this.state.files.length!==0) formData.append('file', this.state.files.map((val: any) => {return val.files[0]}));
    if(id!==undefined) { formData.append('id', id); }

    const result = await fetch(url, 'FILE', formData, {
      'Content-Type': 'multipart/form-data'
    });

    if(result.statusCode===200) {
      notice(`${this.props.data===undefined?'Upload':'Edit'} Success`);
    }else{
      console.log(result);
      notice('系统错误');
    }
  }

  private async onUpload(type: 'image' | 'audio') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type+'/*';
    input.click();

    if(type==='image') {
      input.onchange = (ev: any) => {
        const date = new Date();
        const dateStr = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate();

        let filename = ev.path[0].files[0].name;
        let addContent = `\n![${filename}](http://blog.darkkris.xin/upload/${dateStr}/${filename})\n`;
        this.setState({
          content: this.state.content + addContent
        })
      };
    }else{
      input.onchange = (ev: any) => {
        const date = new Date();
        const dateStr = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate();

        let filename = ev.path[0].files[0].name;
        let addContent = `\n<MusicPlayer src="http://blog.darkkris.xin/upload/${dateStr}/${filename}" imgSrc="" title="" singer=""/>)\n`;
        this.setState({
          content: this.state.content + addContent
        })
      }
    }

    let tmp = this.state.files;
    tmp.push(input);

    this.setState({
      files: tmp
    });
  }

  private onDeleFile(idx: number) {
    let tmp = this.state.files;
    delete tmp[idx];
    this.setState({
      files: tmp
    });
  }

  private onBack() {
    Router.push('/Admin/List');
  }

  private autoSave = debounce((state: any) => {
    let storageStr = `title:${state.title} tag:${state.tag} content:${state.content}`;
    localStorage.setItem('new', storageStr);
  }, 3000);

  componentWillUpdate(nextProps: any, nextState: any) {
    this.autoSave(nextState);
  }

  public render() {
    return (
      <div id={"admin-editor"}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h2>Article Editor</h2>
          <span style={{cursor: "pointer"}} onClick={this.onBack.bind(this)}>Back</span>
        </div>
        <Card id={"editor-file-list"} shadow style={{display: this.state.fileDisp?'block':'none'}}>
          <button onClick={() => this.setState({fileDisp: false})} style={{border: "none", background: "none", cursor: "pointer"}}>X</button>
          <ul>
            {
              this.state.files.map((val: any, index: number) => {
                return (
                  <li key={index}>
                    { val.files[0]===undefined?"":val.files[0].name }
                    <div><Button onClick={() => this.onDeleFile(index)}>Delete</Button></div>
                  </li>
                )
              })
            }
          </ul>
        </Card>
        <div id={"editor-content"}>
          <Input
            placeholder="Title"
            value={this.state.title}
            onChange={(ev: any) => this.setState({title: ev.target.value})}
            width={"100%"}
            status="secondary"
          />
          <Input
            placeholder="Tag Name"
            value={this.state.tag}
            onChange={(ev: any) => this.setState({tag: ev.target.value})}
            width={"100%"}
            status="secondary"
          />
          <div id={"editor-function-group"}>
            <Button onClick={() => this.setState({fileDisp: true})} type="secondary" ghost>FileList</Button>
            <div>
              <span>Attach: </span>
              <Button onClick={() => this.onUpload('image')} type="secondary" ghost>Image</Button>
              <Button onClick={() => this.onUpload('audio')} type="secondary" ghost>Music</Button>
            </div>
          </div>
          <Textarea
            placeholder="Article Content type in here"
            value={this.state.content}
            width={"100%"}
            onChange={(ev: any) => this.setState({content: ev.target.value})}
            status="secondary"
          />
        </div>
        <Button onClick={this.onSubmit.bind(this)} type="secondary">
          {this.props.data===undefined?'Upload':'Edit'}
        </Button>
      </div>
    )
  }
}