import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../../components/layout'
import SubmitDetail from '../../components/form/WaitTicket'

function mapStateToProps(state) {
  return {
    viewIssue: state.issue.viewIssue
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

const IssueDetailPage = props => (
  <Layout title="แจ้งปัญหา" pageName="Detail">
    <SubmitDetail
      title={props.viewIssue.title}
      ticket={props.viewIssue.ticket}
      license={props.viewIssue.license}
      remark={props.viewIssue.remark}
      createDate={moment().format('DD/MM/YYYY HH:mm')}
    />
  </Layout>
)

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailPage)
