import React, { useEffect, useState } from 'react'
import { Select, Form, Radio, Row } from 'antd'
import { QuestionCircleFilled } from '@ant-design/icons'

import CustomButton from '../utils/Button/button'
import CustomTextArea from '../utils/Input/TextArea'
import CustomSpan from '../utils/label/Span'
import '../../style/App.css'

let timeout

const radioStyle = {
  display: 'grid',
  justifyContent: 'flex-start',
  gridAutoFlow: 'column',
  height: 'auto',
  paddingBottom: '12px',
  minHeight: '25px',
  lineHeight: '18px',
  fontSize: '20px',
  whiteSpace: 'pre-line'
}

const IssueForm = ({
  title,
  isLoadingIssueCreation,
  isLoadingCompany,
  isLoadingVehicle,
  onCompanyChange,
  onSearchVehicle,
  onClearVehicle,
  onSubmit,
  isAdminMode = false,
  companies = [],
  vehicles = [],
  problems = [],
  prefixRemark = '',
  faqUrl
}) => {
  const [isSelectedCompany, setSelectedCompany] = useState(false)
  const [searchCompany, setSearchCompany] = useState('')
  const [companyList, setCompanyList] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    setCompanyList(companies)
  }, [companies])

  useEffect(() => {
    const ids = vehicleList.map(vehicle => vehicle.id)
    const newVehicle = vehicles.filter(vehicle => !ids.includes(vehicle.id))

    setVehicleList([...vehicleList, ...newVehicle])
  }, [vehicles])

  const onFinish = values => {
    const { vehicleId, remark, detail } = values

    const remarkList = []
    remarkList.push(prefixRemark)
    remarkList.push(remark)
    if (detail) {
      remarkList.push(detail)
    }

    values.remark = remarkList.join(' - ')
    values.license = vehicleList.find(
      vehicle => vehicle.id === parseInt(vehicleId)
    ).license

    onSubmit(values)
  }

  const handleCompanyChange = values => {
    form.setFieldsValue({ vehicleId: undefined })
    onCompanyChange(values)
    setSelectedCompany(true)
    clearSearchCompany()
  }

  const clearSearchCompany = () => setSearchCompany('')

  const companyForm = () => (
    <React.Fragment>
      <CustomSpan>บริษัท</CustomSpan>
      <Select
        allowClear
        showSearch
        size="large"
        defaultActiveFirstOption={false}
        loading={isLoadingCompany}
        placeholder="กรุณาเลือก"
        onChange={handleCompanyChange}
        onSearch={setSearchCompany}
        onBlur={clearSearchCompany}
        style={{ width: '100%', fontSize: '25px' }}
      >
        {companyList
          .filter(item =>
            item.name.toLowerCase().includes(searchCompany.toLowerCase())
          )
          .map(item => (
            <Select.Option key={item.id}>{item.name}</Select.Option>
          ))}
      </Select>
    </React.Fragment>
  )

  const handleSearchVehicle = value => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      if (value && value.length >= 3) {
        onSearchVehicle(value)
      } else {
        onClearVehicle()
      }
    }, 1000)
  }

  const vehicleForm = () => (
    <React.Fragment>
      <CustomSpan>ทะเบียนรถ</CustomSpan>
      <Form.Item
        name="vehicleId"
        rules={[{ required: true, message: 'Please select your license!' }]}
      >
        <Select
          showSearch
          size="large"
          defaultActiveFirstOption={false}
          filterOption={false}
          loading={isLoadingVehicle}
          disabled={isAdminMode && !isSelectedCompany}
          onSearch={handleSearchVehicle}
          onBlur={onClearVehicle}
          style={{ width: '100%', fontSize: '25px' }}
        >
          {vehicles.map(vehicle => (
            <Select.Option key={vehicle.id}>{vehicle.license}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </React.Fragment>
  )

  const problemForm = () => (
    <Form.Item
      name="remark"
      initialValue={problems[0]}
      rules={[{ required: true, message: 'Please select a problem!' }]}
    >
      <Radio.Group>
        {problems.map((item, idx) => (
          <Radio key={idx} value={item} style={radioStyle}>
            {item}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  )

  const remarkForm = () => (
    <Row style={{ display: 'block' }}>
      <Form.Item name="detail">
        <CustomSpan>รายละเอียดเพิ่มเติม</CustomSpan>
        <CustomTextArea allowClear rows={3} maxLength={255} />
      </Form.Item>
    </Row>
  )

  return (
    <React.Fragment>
      <CustomSpan>หัวข้อปัญหา {title}</CustomSpan>
      <Row>
        <a href={faqUrl} style={{ color: '#20af80' }}>
          วิธีแก้ไขปัญหาเบื้องต้น{' '}
          <QuestionCircleFilled style={{ fontSize: '18px' }} />
        </a>
      </Row>

      {isAdminMode && companyForm()}

      <Form
        name="report-form"
        form={form}
        onFinish={onFinish}
        style={{ fontFamily: 'dbhx', marginTop: '24px' }}
      >
        {vehicleForm()}
        {problemForm()}
        {remarkForm()}

        <Row justify="center">
          <CustomButton
            htmlType="submit"
            loading={isLoadingIssueCreation}
            style={{
              width: '100%',
              height: '48px',
              marginTop: '26px',
              marginBottom: '40px'
            }}
          >
            ส่งปัญหา
          </CustomButton>
        </Row>
      </Form>
    </React.Fragment>
  )
}
export default IssueForm
