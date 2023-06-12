import { FieldValues } from "react-hook-form";

// 表示表单数据
export type FormDate = {
  name: string;
  email: string;
  password: string;
} & FieldValues