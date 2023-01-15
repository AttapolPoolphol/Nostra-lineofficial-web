import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout as ALayout, Row } from 'antd'

import SEO from '../seo'
import Logo from '../images/logo-black'
import 'antd/dist/antd.css'

const headerStyle = {
  background: 'white',
  height: '65px',
  WebkitBoxShadow: '0 8px 6px -6px #bdbdbd',
  boxShadow: '0 8px 6px -6px #bdbdbd'
}
const contentStyle = {
  marginTop: '22px',
  paddingLeft: '40px',
  paddingRight: '40px',
  height: 'calc(100vh - 90px)'
}
const titleStyle = {
  fontFamily: 'dbhx',
  color: '#20AF80',
  fontWeight: 'bold',
  fontSize: '25px'
}

const Layout = ({ children, title, pageName }) => (
  <ALayout>
    <SEO title={pageName} />
    <ALayout.Header style={headerStyle}>
      <Row justify="center">
        <Logo />
      </Row>
      <Row justify="center" style={titleStyle}>
        {title}
      </Row>
    </ALayout.Header>
    <ALayout.Content style={contentStyle}>{children}</ALayout.Content>
  </ALayout>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired
}

export default connect(state => ({}), null)(Layout)
