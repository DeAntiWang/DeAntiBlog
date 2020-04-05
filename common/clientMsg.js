export default function(txt, delay=2300) {
  let msgNode = document.createElement('div'),
      content = document.createElement('p');
  msgNode.className = "msg-notice";
  content.innerText = txt;
  msgNode.appendChild(content);
  document.body.appendChild(msgNode);
  setTimeout(() => {
    document.body.removeChild(msgNode);
  }, delay);
}