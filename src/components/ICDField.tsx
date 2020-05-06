import React, {SFC, useState} from "react";
import * as ECT from '@whoicd/icd11ect';
import {Button, Form, Input, Popconfirm} from 'antd';
import {CloseOutlined} from '@ant-design/icons';


import '@whoicd/icd11ect/style.css';
import '../App.css';
import {observer} from "mobx-react";
import {useStore} from "../Context";

const mySettings = {
  apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
  autoBind: false
};

interface ICD {
  field: string;
  form: any;
  codeField?: string;
  uriField?: string;
  disabled?: boolean;
  next?: string;
  searchQueryField?: string;
  bestMatchTextField?: string;
}


export const ICDField: SFC<ICD> = observer(({field, form, codeField, uriField, searchQueryField, bestMatchTextField, next, disabled = false}) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(!form.getFieldValue(field));
  const store = useStore();

  const myCallbacks = {
    selectedEntityFunction: (selectedEntity: any) => {
      form.setFieldsValue({
        [field]: selectedEntity.title,
      });
      if (next) {
        store.enableValue(next);
      }
      if (codeField) {
        console.log(selectedEntity.code)
        
        form.setFieldsValue({
          [codeField]: selectedEntity.code,
          
        });
      }

      if (uriField) {
        form.setFieldsValue({
          [uriField]: selectedEntity.uri
        });
      }

      if (searchQueryField) {
        //console.log(selectedEntity.searchQuery);
        console.log(selectedEntity.searchQuery)
        
        form.setFieldsValue({
          [searchQueryField]: selectedEntity.searchQuery
        });
      }

      if (bestMatchTextField) {
        //console.log(selectedEntity.searchQuery);
        console.log(selectedEntity.bestMatchText)
        
        form.setFieldsValue({
          //[uriField]: selectedEntity.uri
        });
      }
      ECT.Handler.clear(field);
      setVisible(false);
      setValue('');
    }
  };

  ECT.Handler.configure(mySettings, myCallbacks);
  ECT.Handler.bind(field);
  var altSearchText;
  const clear = () => {
    ECT.Handler.clear(field);
    setVisible(false);
  }
  return (
    <div>
      {visible ?
        <div className="flex">
          <Input
            size="large" disabled={disabled} className="ctw-input"  data-ctw-ino={field} value={value}
            onChange={(e: any) => {
              setValue(e.target.value)
              console.log(e.target.value)
              altSearchText = e.target.value;
              
            }}/>
           <Popconfirm title="Sure to delete?" onConfirm={clear}  ><Button
            size="large" 
            icon={<CloseOutlined style={{fontSize: '16px', color: 'red'}}/>}/>
            </Popconfirm>
        </div> : <Form.Item
          name={field}
          className="m-0"
        >
          <Input size="large" disabled={store.viewMode} onClick={() => {
            if (!store.viewMode) {
              setVisible(true)
            }

          }}
          
         
          />
        </Form.Item>}
      <div className="ctw-window" data-ctw-ino={field}></div>
    </div>
  )
})
