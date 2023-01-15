import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import '../../style/App.css'

const WaitTicket = ({ title, createDate, remark, ticket, license }) => (
  <div
    style={{
      display: 'block',
      background: '#EDEDED',
      paddingBottom: '20px'
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
          หัวข้อปัญหา {title}
        </Row>
        <div style={{ fontSize: '20px' }}>
          <Row>
            <Col span={2}></Col>
            <Col span={10}>วันที่สร้าง Ticket</Col>
            <Col span={10}>{createDate}</Col>
          </Row>
          <Row>
            <Col span={2}></Col>
            <Col span={10}>หมายเลข Ticket</Col>
            <Col span={10} style={{ color: '#21B081' }}>
              {ticket}
            </Col>
          </Row>
          <Row style={{ color: '#21B081' }}>
            <Col span={2}></Col>
            <Col span={10}>ทะเบียนรถ</Col>
            <Col span={10}>{license}</Col>
          </Row>
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'block',
        background: '#FFFFFF',
        marginTop: '10px',
        paddingBottom: '20px'
      }}
    >
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
            {remark}
          </Col>
        </Row>
      </div>
      <Row
        style={{
          marginTop: '50px',
          fontSize: '20px',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            border: 'solid #21B081',
            padding: '11px',
            display: 'block',
            borderRadius: '16px'
          }}
        >
          ทางเราจะตอบกลับคุณลูกค้าภายใน 30 นาทีนะคะ
        </div>
      </Row>
    </div>
  </div>
)

export default WaitTicket
