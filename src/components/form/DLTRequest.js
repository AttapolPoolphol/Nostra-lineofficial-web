import React from 'react'
import { Row, Col, Layout } from 'antd'
import '../../style/App.css'

const DLTRequest = ({ createDate, license = '' }) => {
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
              <Row
                style={{
                  fontSize: '25px',
                  fontWeight: 'bolder'
                }}
              >
                ขอหนังสือรับรอง DLT
              </Row>
              <div style={{ fontSize: '20px' }}>
                <Row>
                  <Col span={2}></Col>
                  <Col className="dltRequest" span={10}>
                    วันที่ขอหนังสือรับรอง
                  </Col>
                  <Col span={12}>{createDate}</Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col span={10} style={{ color: '#21B081', fontSize: '25px' }}>
                    ทะเบียนรถ
                  </Col>
                  <Col span={12} style={{ color: '#21B081', fontSize: '25px' }}>
                    {license.join(', ')}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
      <Layout.Content style={{ display: 'block', width: '100%' }}>
        <div
          style={{ display: 'block', background: '#EDEDED', marginTop: '5px' }}
        >
          <div style={{ display: 'block', background: '#FFFFFF' }}>
            <div
              style={{
                marginLeft: '30px',
                marginRight: '30px',
                display: 'grid'
              }}
            >
              <div
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '20px'
                }}
              >
                <Row justify="center">
                  <div
                    style={{
                      border: 'solid #21B081',
                      padding: '12px',
                      display: 'block',
                      borderRadius: '16px'
                    }}
                  >
                    <Row style={{ textAlign: 'center' }}>
                      ทางเราจะส่ง Link สำหรับดาวน์โหลด หนังสือรับรองทาง LINE
                      ให้คุณลูกค้าภายใน 30 นาทีนะคะ
                    </Row>

                    <Row style={{ justifyContent: 'center' }}>
                      *ไฟล์ จะถูกลบภายใน 7 วัน*
                    </Row>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default DLTRequest
