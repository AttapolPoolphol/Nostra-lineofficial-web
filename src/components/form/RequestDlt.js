import React, { useEffect, useState } from 'react'
import { Select, Form, Row } from 'antd'

import CustomButton from '../utils/Button/button'
import CustomSpan from '../utils/label/Span'
import '../../style/App.css'

let timeout

const RequestDltForm = ({
  isLoadingSubmitVehicle,
  isLoadingCompany,
  isLoadingVehicle,
  onCompanyChange,
  onSearchVehicle,
  onClearVehicle,
  onSubmit,
  isAdminMode = false,
  companies = [],
  vehicles = []
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
    onSubmit({
      vehicles: vehicleList
        .filter(vehicle => values.vehicleIds.includes(vehicle.id.toString()))
        .map(vehicle => ({ id: vehicle.id, license: vehicle.license }))
    })
  }

  const handleCompanyChange = values => {
    form.setFieldsValue({ vehicleIds: undefined })
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
        name="vehicleIds"
        rules={[{ required: true, message: 'Please select your license!' }]}
      >
        <Select
          showSearch
          showArrow
          size="large"
          mode="multiple"
          defaultActiveFirstOption={false}
          filterOption={false}
          loading={isLoadingVehicle}
          disabled={ isAdminMode && !isSelectedCompany}
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

  return (
    <React.Fragment>
      <CustomSpan>ขอหนังสือรับรอง DLT</CustomSpan>

      {isAdminMode && companyForm()}

      <Form
        name="vehicle-finding-form"
        form={form}
        onFinish={onFinish}
        style={{ fontFamily: 'dbhx', marginTop: '24px' }}
      >
        {vehicleForm()}

        <Row justify="center">
          <CustomButton
            htmlType="submit"
            loading={isLoadingSubmitVehicle}
            style={{
              width: '100%',
              height: '48px',
              marginTop: '26px',
              marginBottom: '40px'
            }}
          >
            ส่งคำขอ
          </CustomButton>
        </Row>
      </Form>
    </React.Fragment>
  )
}
export default RequestDltForm
