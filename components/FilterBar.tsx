import { useState, useRef, ChangeEvent } from "react";
import { Input, Keyboard, KeyCode, Select, useKeyboard } from '@geist-ui/react';
import styles from 'styles/FilterBar.module.scss';

type Props = {
  onSelect: (value: string) => void,
  onChange: Function
};

export enum FilterType {
  PUBLIST_ASC = 0b00,
  PUBLIST_DESC = 0b01,
  EDIT_ASC = 0b10,
  EDIT_DESC = 0b11,
};

const FilterBar = ({ onSelect, onChange }: Props): JSX.Element => {
  const inputBar = useRef(null);
  const [content, setContent] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const str = event.target.value;
    setContent(str);
    onChange(str);
  };

  useKeyboard(() => { inputBar.current.focus(); }, [KeyCode.Backslash])

  return (
    <>
      <Input
        ref={inputBar}
        icon={<i className={styles.iconSearch}/>}
        iconRight={<Keyboard scale={0.5}>\</Keyboard>}
        placeholder={"Search..."}
        value={content}
        onChange={changeHandler}
      />
      <div className={styles.selectBar}>
        <Select initialValue={`${FilterType.PUBLIST_DESC}`} onChange={onSelect}>
          <Select.Option value={`${FilterType.PUBLIST_DESC}`}>发布时间降序</Select.Option>
          <Select.Option value={`${FilterType.PUBLIST_ASC}`}>发布时间升序</Select.Option>
          <Select.Option value={`${FilterType.EDIT_DESC}`}>编辑时间降序</Select.Option>
          <Select.Option value={`${FilterType.EDIT_ASC}`}>编辑时间升序</Select.Option>
        </Select>
      </div>
    </>
  );
};

export default FilterBar;
