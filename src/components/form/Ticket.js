import React, { useEffect, useState } from 'react'
import { Row, Col, Layout } from 'antd'
import '../../style/App.css'

const Ticket = ({
  createDate = '21/10/2020 09:20',
  numberTicket = '510',
  status = 'New',
  ticketOpener = 'sysadmin',
  company = 'Siam Cuty Cement',
  department = 'AGG > วงศ์ทวีทรัพย์ ขนส่ง จำกัด',
  detail = '  Not Update - GPS ไม่อัพเดต',
  Ticket = '',
  license = 'กท01-0014'
}) => {
  return (
    <Layout style={{ fontFamily: 'dbhx' }}>
      <Layout.Content style={{ display: 'block', width: '100%' }}>
        <div
          style={{
            display: 'block',
            background: '#EDEDED'
          }}
        >
          <div style={{ display: 'block', background: '#FFFFFF' }}>
            <div style={{ marginLeft: '40px', display: 'grid' }}>
              <div
                style={{
                  paddingTop: '5px',
                  fontSize: '20px'
                }}
              >
                <Row>
                  <Col span={2}></Col>
                  <Col span={10}>วันที่สร้าง Ticket</Col>
                  <Col span={12}>{createDate}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col span={10}>หมายเลข Ticket</Col>
                  <Col span={12}>{numberTicket}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col
                    span={10}
                    style={{
                      color: '#21B081',
                      fontSize: '25px',
                      fontWeight: 'bold'
                    }}
                  >
                    สถานะ
                  </Col>
                  <Col
                    span={12}
                    style={{
                      color: '#21B081',
                      fontSize: '25px',
                      fontWeight: 'bold'
                    }}
                  >
                    {status}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
      <Layout.Content style={{ display: 'block', width: '100%' }}>
        <div
          style={{
            display: 'block',
            background: '#EDEDED',
            marginTop: '5px'
          }}
        >
          <div style={{ display: 'block', background: '#FFFFFF' }}>
            <div style={{ marginLeft: '40px', display: 'grid' }}>
              <div
                style={{
                  paddingTop: '5px',
                  fontSize: '20px'
                }}
              >
                <Row>
                  <Col span={2}></Col>
                  <Col span={10}>ผู้เปิด Ticket</Col>
                  <Col span={12}>{ticketOpener}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col span={10}>บริษัท</Col>
                  <Col span={12}>{company}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col span={10}>แผนก</Col>
                  <Col span={12}>{department}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col
                    span={10}
                    style={{
                      color: '#21B081',
                      fontSize: '25px',
                      fontWeight: 'bold'
                    }}
                  >
                    ทะเบียนรถ
                  </Col>
                  <Col
                    span={12}
                    style={{
                      color: '#21B081',
                      fontSize: '25px',
                      fontWeight: 'bold'
                    }}
                  >
                    {license}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
      <Layout.Content style={{ display: 'block', width: '100%' }}>
        <div
          style={{
            display: 'block',
            background: '#EDEDED',
            marginTop: '5px'
          }}
        >
          <div style={{ display: 'block', background: '#FFFFFF' }}>
            <div style={{ marginLeft: '40px', display: 'grid' }}>
              <Row
                style={{
                  fontSize: '25px',
                  fontWeight: 'bolder'
                }}
              >
                รายละเอียดปัญหา
              </Row>
              <Row style={{ fontSize: '20px' }}>
                <Col span={2}></Col>
                <Col span={18} style={{ overflowWrap: 'anywhere' }}>
                  {detail}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default Ticket
