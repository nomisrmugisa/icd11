import React, { useState, SFC } from "react";
import * as ECT from '@whoicd/icd11ect';
import { Input, Form, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import '@whoicd/icd11ect/style.css';
import '../App.css';
import { observer } from "mobx-react";
import { useStore } from "../Context";

const mySettings = {
  apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
  autoBind: false
};

interface ICD {
  field: string;
  form: any;
  codeField?: string;
  uriField?: string;
}


export const ICDField: SFC<ICD> = observer(({ field, form, codeField, uriField }) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(!form.getFieldValue(field));
  const store = useStore();

  const myCallbacks = {
    selectedEntityFunction: (selectedEntity: any) => {
      form.setFieldsValue({
        [field]: selectedEntity.title,
      });
      if (codeField) {
        form.setFieldsValue({
          [codeField]: selectedEntity.code,
        });
      }

      if (uriField) {
        form.setFieldsValue({
          [uriField]: selectedEntity.uri
        });
      }
      ECT.Handler.clear(field);
      setVisible(false);
      setValue('');
    }
  };

  ECT.Handler.configure(mySettings, myCallbacks);
  ECT.Handler.bind(field);

  const clear = () => {
    ECT.Handler.clear(field);
    setVisible(false);
  }
  return (
    <div>
      {visible ? <div className="flex"><Input size="large" className="ctw-input" data-ctw-ino={field} value={value} onChange={(e: any) => {
        setValue(e.target.value)
      }} /><Button size="large" onClick={clear} icon={<CloseOutlined style={{ fontSize: '16px', color: 'red' }} />} /></div> : <Form.Item
        name={field}
        className="m-0"
      >
          <Input size="large" disabled={store.viewMode} onClick={() => {
            if (!store.viewMode) {
              setVisible(true)
            }
          }} />
        </Form.Item>}
      <div className="ctw-window" data-ctw-ino={field}></div>
    </div>
  )
})