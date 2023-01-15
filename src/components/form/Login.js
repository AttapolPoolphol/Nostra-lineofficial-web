import React from 'react'
import styled from 'styled-components'
import { Form, Button, Input, Row, Col } from 'antd'

import SEO from '../seo'
import Logo from '../images/logo-white'
import UsernameIcon from '../images/icon-username'
import PasswordIcon from '../images/icon-password'
import '../../style/App.css'

const container = {
  font: 'normal normal bold 20px/25px dbhx',
  background:
    'radial-gradient(circle, rgba(41, 180, 115, 1) 0%, rgba(49, 63, 60, 1) 70%, rgba(50, 59, 58, 1) 100%)',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const itemAlign = {
  justifyContent: 'center'
}

const logo = {
  marginBottom: '60px'
}

const CustomBtn = styled(props => <Button {...props} />)`
  background-color: #ffd900;
  border-color: transparent;
  .ant-btn,
  span {
    margin-top: -7px;
  }
  &:hover,
  &:active,
  &:focus {
    background-color: #f5dd42;
    border-color: transparent;
    color: #25af7e;
  }
`

const LoginForm = ({ onSubmit, loading, error }) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.setFieldsValue({
      username: '',
      password: '',
      remember: false
    })
  })
  const onFinish = values => {
    values.callback = true
    onSubmit(values)
  }

  const onFinishFailed = errorInfo => {
    errorInfo.cookie = false
  }
  const InsertError = () => {
    return error != '' ? <span>{error}</span> : <></>
  }
  return (
    <div style={container}>
      <SEO title="Sign In" />
      <div style={{ display: 'block' }}>
        <Row justify="center" style={logo}>
          <Logo />
        </Row>
        <Row className="font-login" style={itemAlign}>
          Sign In
        </Row>

        <Form
          name="normal_login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col>
              <Row className="login">
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your Username!' }
                  ]}
                >
                  <Input prefix={<UsernameIcon />} placeholder="Username" />
                </Form.Item>
              </Row>
              <Row className="login">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your Password!' }
                  ]}
                >
                  <Input
                    prefix={<PasswordIcon />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Row>
              <Row
                className="login"
                style={{
                  color: '#ff4d4f',
                  fontSize: '17px',
                  placeContent: 'center'
                }}
              >
                <InsertError />
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <CustomBtn htmlType="submit" loading={loading}>
              Login
            </CustomBtn>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
