export const htmlEncode = (html: string) => {
  const temp = document.createElement("div");
  
  if (temp.textContent) {
    temp.textContent = html;
  } else {
    temp.innerText = html;
  }

  return temp.innerHTML;
};