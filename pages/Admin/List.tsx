import * as React from 'react';
import { Button, Modal } from '@zeit-ui/react';
import fetch from "../../common/fetch";
import Router from "next/router";
import notice from '../../common/clientMsg';
import "../../static/styles/Admin.scss";

export default class List extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      displayModal: false,
      readyDele: null
    };
  }

  static async getInitialProps({res}: any) {
    const result = await fetch('/User/check');
    if(result.statusCode===200 && result.data.isLogin===false) {
      if(res===undefined) {
        Router.push('/Admin/Login');
      }else{
        res.writeHead(301, {Location: '/Admin/Login'});
        res.end();
      }
    }
    const resultData = await fetch('/Article/findAll');
    return {
      list: resultData.data
    }
  }

  private onNew() {
    Router.push('/Admin/Editor');
  }

  private onEdit(id: number) {
    Router.push({pathname:'/Admin/Editor', query:{id: id}});
  }

  private noticeDele(id: number) {
    this.setState({
      displayModal: true,
      readyDele: id
    })
  }

  private async onDele() {
    const result = await fetch('/Article/dele', 'POST', {id: this.state.readyDele});
    if(result.statusCode===200) {
      // 提示删除成功
      notice('删除成功');
    }else{
      // 提示有错误
      notice('系统错误');
    }
    this.setState({
      readyDele: null,
      displayModal: false
    });
  }

  public render() {
    return (
      <div id={"article-list-in-admin"}>
        <div>
          <h2>Article List</h2>
          <Button onClick={this.onNew.bind(this)}>New</Button>
        </div>
        <ul>
          {
            this.props.list.map((val: any) => {
              return (
                <li key={val.id}>
                  {val.title}
                  <div>
                    <Button onClick={() => this.onEdit(val.id)}>Edit</Button>
                    <Button onClick={() => this.noticeDele(val.id)}>Delete</Button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <Modal open={this.state.displayModal} onClose={() => this.setState({displayModal: false})}>
          <Modal.Title>Check Options</Modal.Title>
          <Modal.Subtitle>Really delete this Article?</Modal.Subtitle>
          <Modal.Content>
            <div>
              DeleteOption can't be <code>git reset</code>
            </div>
          </Modal.Content>
          <Modal.Action onClick={() => this.setState({readyDele: null, displayModal: false})}>Cancel</Modal.Action>
          <Modal.Action onClick={this.onDele.bind(this)} passive>Submit</Modal.Action>
        </Modal>
      </div>
    )
  }
}