import React, { useEffect, useState, SFC, } from "react";
import { Input, Checkbox, Button, Form, DatePicker, Select, Card, Popconfirm } from 'antd';
import { observer } from "mobx-react";
import { ICDField } from "./ICDField";
import { useStore } from "../Context";
import { isEmpty } from 'lodash';
import moment from "moment";

const { Option } = Select;

export const DataEntryForm: SFC = observer(() => {
  const [form] = Form.useForm();
  const [optionSets, setOptionSets] = useState<any>();
  const store = useStore();

  const onFinish = async (values: any) => {
    await store.addEvent(values)
  };

  const notTomorrow = (date: moment.Moment) => {
    return date.isAfter(moment());
  }

  useEffect(() => {
    store.loadUserOrgUnits().then(() => {
      setOptionSets(store.optionSets);
    });
  }, [store]);

  const optionSet = (os: string) => {
    const options = optionSets[os];
    if (options) {
      return <Select style={{ width: '100%' }} size="large" disabled={store.viewMode}>
        {options.map((option: any) => <Option key={option.code} value={option.code}>{option.name}</Option>)}
      </Select>
    }
    return null
  }


  return (

    <Form form={form} name="death-certificate"
      onFinish={onFinish}
      scrollToFirstError={true}
      initialValues={store.defaultValues}
    >

      <Card title="New Death Certificate"
        actions={[
          <p>Inserting for {store.currentOrganisation} </p>,
          !isEmpty(store.defaultValues) ? <Popconfirm title="Sure to delete?" onConfirm={() => store.deleteEvent()}><Button size="large">Delete</Button> </Popconfirm> : null,
          <Button size="large" onClick={store.showEvents}>Cancel</Button>,
          <Button htmlType="submit" size="large" disabled={store.viewMode}>Save</Button>
        ]}
        type="inner"
        bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
      >
        <Form.Item
          label="Date of review"
          rules={[{ type: 'object', required: true, message: 'Please select date!' }]}
          name="eventDate"
          className="m-0"
        >
          <DatePicker disabledDate={notTomorrow} size="large" disabled={store.viewMode} />
        </Form.Item>
        <table className="my-2 w-full border-collapse">
          <tbody>
            <tr>
              <td className="border p-1" colSpan={2}>Ministry of Health National Case Number</td>
              <td className="border p-1" colSpan={2}>
                <Form.Item
                  name="ZKBE8Xm9DJG"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">Name (Full name):</td>
              <td className="border p-1">
                <Form.Item
                  name="ZYKmQ9GPOaF"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                NIN
            </td>
              <td className="border p-1">
                <Form.Item
                  name="MOstDqSY0gO"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                Usual Residence (village)
            </td>
              <td className="border p-1" colSpan={3}>
                <Form.Item
                  name="zwKo51BEayZ"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                Usual Residence (Parish)
            </td>
              <td className="border p-1">
                <Form.Item
                  name="bNpMzyShDCX"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Usual Residence (Sub-county)
            </td>
              <td className="border p-1">
                <Form.Item
                  name="u44XP9fZweA"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Usual Residence (County)
            </td>
              <td className="border p-1">
                <Form.Item
                  name="b70okb06FWa"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Usual Residence (District)
            </td>
              <td className="border p-1">
                <Form.Item
                  name="t5nTEmlScSt"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Occupation
            </td>
              <td className="border p-1">
                <Form.Item
                  name="dsiwvNQLe5n"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Date of Birth
            </td>
              <td className="border p-1">
                <Form.Item
                  rules={[{ type: 'object', required: false, message: 'Please select date!' }]}
                  name="RbrUuKFSqkZ"
                  className="m-0"
                >
                  <DatePicker disabledDate={notTomorrow} size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Age
            </td>
              <td className="border p-1">
                <Form.Item
                  name="q7e7FOXKnOf"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Sex
            </td>
              <td className="border p-1">

                {optionSets ? <Form.Item
                  name="e96GB4CXyd3"
                  className="m-0"
                >
                  {optionSet('SX01')}
                </Form.Item> : null}

              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Place of Birth
            </td>
              <td className="border p-1">
                <Form.Item
                  name="xNCSFrgdUgi"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Date and time of death
            </td>
              <td className="border p-1">
                <Form.Item
                  rules={[{ type: 'object', required: true, message: 'Please select date and time of death!' }]}
                  name="i8rrl8YWxLF"
                  className="m-0"
                >
                  <DatePicker disabledDate={notTomorrow} size="large" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time of death" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td colSpan={7} className="border p-1 text-lg">
                Frame A: Medical Data. Part 1 and 2
						</td>
            </tr>
            <tr>
              <td className="border p-1 w-1/4">
              </td>
              <td className="border p-1"></td>
              <td className="border p-1"> Cause of death</td>
              <td className="border p-1"> Code</td>
              <td className="border p-1"> URI</td>
              <td className="border p-1">Time interval type from onset to death</td>
              <td className="border p-1">Time interval from onset to death</td>
            </tr>
            <tr>
              <td className="border p-1">Report disease or condition directly leading to death on line a</td>
              <td className="border p-1"> a	</td>
              <td className="border p-1">
                <ICDField form={form} field="sfpqAeqKeyQ" codeField="zD0E77W4rFs" uriField="k9xdBQzYMXo" />
              </td>
              <td className="border p-1">
                <Form.Item
                  name="zD0E77W4rFs"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="k9xdBQzYMXo"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="Ylht9kCLSRW"
                  className="m-0"
                >
                  {optionSet('TI01')}
                </Form.Item> : null}
              </td>
              <td className="border p-1">
                <Form.Item
                  name="WkXxkKEJLsg"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1" rowSpan={3}>
                Report chain of events 'due to'  (b to d) in order (if applicable)
            </td>
              <td className="border p-1">
                b
						</td>
              <td className="border p-1">
                <ICDField form={form} field="zb7uTuBCPrN" codeField="tuMMQsGtE69" uriField="yftBZ5bSEOb" />
              </td>
              <td className="border p-1">
                <Form.Item
                  name="tuMMQsGtE69"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="yftBZ5bSEOb"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="myydnkmLfhp"
                  className="m-0"
                >
                  {optionSet('TI01')}
                </Form.Item> : null}
              </td>
              <td className="border p-1">
                <Form.Item
                  name="fleGy9CvHYh"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                c
            </td>
              <td className="border p-1">
                <ICDField form={form} field="QGFYJK00ES7" codeField="C8n6hBilwsX" uriField="fJUy96o8akn" />
              </td>

              <td className="border p-1">
                <Form.Item
                  name="C8n6hBilwsX"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="fJUy96o8akn"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="aC64sB86ThG"
                  className="m-0"
                >
                  {optionSet('TI01')}
                </Form.Item> : null}
              </td>
              <td className="border p-1">
                <Form.Item
                  name="hO8No9fHVd2"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                d
							</td>
              <td className="border p-1">
                <ICDField form={form} field="CnPGhOcERFF" codeField="IeS8V8Yf40N" uriField="S53kx50gjQn" />
              </td>
              <td className="border p-1">
                <Form.Item
                  name="IeS8V8Yf40N"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                <Form.Item
                  name="S53kx50gjQn"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">

                {optionSets ? <Form.Item
                  name="cmZrrHfTxW3"
                  className="m-0"
                >
                  {optionSet('TI01')}
                </Form.Item> : null}
              </td>
              <td className="border p-1">
                <Form.Item
                  name="eCVDO6lt4go"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                State the underlying cause
            </td>
              <td className="border p-1" colSpan={5}>
                <ICDField form={form} field="QTKk2Xt8KDu" />
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                Other significant conditions contributing to death (time intervals can be included in brackets after the condition)
            </td>
              <td className="border p-1" colSpan={5}>
                <ICDField form={form} field="xeE5TQLvucB" />
              </td>
            </tr>
          </tbody>
        </table>


        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td colSpan={2} className="border p-1 text-lg">
                Frame B: Other medical data
						</td>
            </tr>
            <tr>
              <td className="border p-1">
                Was surgery performed within the last 4 weeks?
						</td>
              <td className="border p-1">
                {optionSets ?
                  <Form.Item
                    name="Kk0hmrJPR90"
                    className="m-0"
                  >
                    {optionSet('YN01')}
                  </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                If yes please specify date of surgery
						</td>
              <td className="border p-1">
                <Form.Item
                  name="j5TIQx3gHyF"
                  className="m-0"
                  rules={[{ type: 'object', required: false, message: 'Please select date!' }]}
                >
                  <DatePicker disabledDate={notTomorrow} size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                If yes please specify reason for surgery (disease or condition)
						</td>
              <td className="border p-1">
                <Form.Item
                  name="JhHwdQ337nn"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Was an autopsy requested?
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="jY3K6Bv4o9Q"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                If yes were the findings used in the certification?
						</td>
              <td className="border p-1">
                {optionSets ?
                  <Form.Item
                    name="UfG52s4YcUt"
                    className="m-0"
                  >
                    {optionSet('YN01')}
                  </Form.Item> : null}
              </td>
            </tr>
          </tbody>
        </table>


        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td colSpan={6} className="border p-1 text-lg">
                Manner of death
						</td>
            </tr>
            <tr>
              <td className="border p-1">
                Disease
						</td>
              <td className="border p-1">
                <Form.Item
                  name="FhHPxY16vet"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Assault
						</td>
              <td className="border p-1">
                <Form.Item
                  name="KsGOxFyzIs1"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Could not be determined
						</td>
              <td className="border p-1">
                <Form.Item
                  name="b4yPk98om7e"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Accident
						</td>
              <td className="border p-1">
                <Form.Item
                  name="gNM2Yhypydx"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Legal intervention
						</td>
              <td className="border p-1">
                <Form.Item
                  name="tYH7drlbNya"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Pending investigation
						</td>
              <td className="border p-1">
                <Form.Item
                  name="fQWuywOaoN2"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Intentional self-harm
						</td>
              <td className="border p-1">
                <Form.Item
                  name="wX3i3gkTG4m"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                War
						</td>
              <td className="border p-1">
                <Form.Item
                  name="xDMX2CJ4Xw3"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Unknown						</td>
              <td className="border p-1">
                <Form.Item
                  name="o1hG9vr0peF"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                If external cause or poisoning
						</td>
              <td className="border p-1">
                <Form.Item
                  name="AZSlwlRAFig"
                  className="m-0"
                  valuePropName="checked"
                >
                  <Checkbox disabled={store.viewMode}>Yes</Checkbox>
                </Form.Item>
              </td>
              <td className="border p-1">
                Date of injury
						</td>
              <td className="border p-1" colSpan={2}>
                <Form.Item
                  name="U18Tnfz9EKd"
                  className="m-0"
                  rules={[{ type: 'object', required: false, message: 'Please select date of injury' }]}
                >
                  <DatePicker disabledDate={notTomorrow} size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={3}>
                Please describe how external cause occurred (If poisoning please specify poisoning agent)
						</td>
              <td className="border p-1" colSpan={3}>
                <Form.Item
                  name="DKlOhZJOCrX"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={3}>
                Place of occurrence of the external cause
						</td>
              <td className="border p-1" colSpan={3}>
                <Form.Item
                  name="kGIDD5xIeLC"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td colSpan={4} className="border p-1 text-lg">
                Fetal or infant death
						</td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                Multiple pregnancy
						</td>
              <td className="border p-1" colSpan={2}>
                {optionSets ? <Form.Item
                  name="V4rE1tsj5Rb"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1" colSpan={2}>
                Stillborn?
						</td>
              <td className="border p-1" colSpan={2}>
                {optionSets ? <Form.Item
                  name="ivnHp4M4hFF"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                If death within 24 hrs specify the number of hours survived
						</td>
              <td className="border p-1">
                <Form.Item
                  name="jf9TogeSZpk"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Birth weight (in grams)
						</td>
              <td className="border p-1">
                <Form.Item
                  name="xAWYJtQsg8M"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Number of completed weeks of pregnancy
						</td>
              <td className="border p-1">
                <Form.Item
                  name="lQ1Byr04JTx"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
              <td className="border p-1">
                Age of mother (years)
						</td>
              <td className="border p-1">
                <Form.Item
                  name="DdfDMFW4EJ9"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1" colSpan={2}>
                If the death was perinatal, please state conditions of mother that affected the fetus and newborn
						</td>
              <td className="border p-1" colSpan={2}>
                <Form.Item
                  name="GFVhltTCG8b"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>


        <table className="my-2 w-full border-collapse px-2">
          <tbody>
            <tr>
              <td className="border p-1 text-lg">
                For women, was the deceased pregnant?
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="zcn7acUB6x1"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                At what point?							</td>
              <td className="border p-1">
                <Form.Item
                  name="KpfvNQSsWIw"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className="border p-1">
                Did the pregnancy contribute to death?
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="AJAraEcfH63"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Referred from (level of care)
						</td>
              <td className="border p-1">
                <Form.Item
                  name="RJhbkjYrODG"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Parity
						</td>
              <td className="border p-1">
                <Form.Item
                  name="ymyLrfEcYkD"
                  className="m-0"
                >
                  <Input size="large" disabled={store.viewMode} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Mode of delivery
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="K5BDPJQk1BP"
                  className="m-0"
                >
                  {optionSet('MD')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Place of delivery
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="Z41di0TRjIu"
                  className="m-0"
                >
                  {optionSet('PD01')}
                </Form.Item> : null}
              </td>
            </tr>
            <tr>
              <td className="border p-1">
                Delivered by skilled attendant
						</td>
              <td className="border p-1">
                {optionSets ? <Form.Item
                  name="uaxjt0inPNF"
                  className="m-0"
                >
                  {optionSet('YN01')}
                </Form.Item> : null}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Form>
  );
});