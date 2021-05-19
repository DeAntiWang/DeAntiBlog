import { useContext } from "react";
import { Modal, Tabs, Image } from "@geist-ui/react";
import { SponsorContext } from "../../pages/Article";


export default function SponsorModal() {
  const { bindings } = useContext(SponsorContext);

  return (
    <Modal {...bindings}>
      <Modal.Title>Sponsor</Modal.Title>
      <Modal.Subtitle>Thanks for your giving</Modal.Subtitle>
      <Modal.Content>
        <Tabs initialValue="1">
          <Tabs.Item label="支付宝" value="1">
            <Image width={350} height={350} src="/static/img/alipay.jpg" />
          </Tabs.Item>
          <Tabs.Item label="微信" value="2">
            <Image width={350} height={350} src="/static/img/wechat.jpg" />
          </Tabs.Item>
        </Tabs>
      </Modal.Content>
    </Modal>
  );
}