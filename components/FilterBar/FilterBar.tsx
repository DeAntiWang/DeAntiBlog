import { useState } from "react";
import { Input, Keyboard, Select } from '@geist-ui/react';
import { ChangeEvent } from 'react';

interface Prop {
  onSelect: (value: string) => void,
  changeCallback: Function
}

const SearchIcon = () => {
  return (
    <svg className="feather feather-search"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#999"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{width: "14px", height: "14px"}}
    >
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
};

const MyKeyBoard = <Keyboard id={"keyboard"} small>/</Keyboard>;

export default function FilterBar(props: Prop) {
  const [inputContent, setInputContent] = useState("");

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const str = ev.target.value;
    setInputContent(str);
    props.changeCallback(str);
  }

  return (
    <>
      <Input
        size={"medium"}
        icon={<SearchIcon />}
        iconRight={MyKeyBoard}
        placeholder={"Search..."}
        value={inputContent}
        onChange={onInputChange}
      />
      <Select
        initialValue={"publish_desc"}
        size={"medium"}
        onChange={props.onSelect}
      >
        <Select.Option value="publish_desc">发布时间降序</Select.Option>
        <Select.Option value="publish_asc">发布时间升序</Select.Option>
        <Select.Option value="edit_desc">编辑时间降序</Select.Option>
        <Select.Option value="edit_asc">编辑时间升序</Select.Option>
      </Select>
    </>
  )
}