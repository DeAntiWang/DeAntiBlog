// 配置文件
import DisplayImage from '../components/DisplayImage';
import { Link } from '@zeit-ui/react';

/**
 * Md2Jsx Options
 */
const md2jsxOptions = {
  overrides: {
    img:  DisplayImage,
    a: {
      component: Link
    }
  }
};

/**
 * xss options
 */
const xssOptions = {
  whiteList: {
    span: ["class"]
  }
};

/**
 * fetch BaseUrl
 */
const baseUrl = "http://localhost:3001/";

export {
  md2jsxOptions,
  xssOptions,
  baseUrl
}