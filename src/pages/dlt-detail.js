import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Skeleton } from 'antd'
import moment from 'moment'

import Layout from '../components/layout'
import issueActions from '../state/issue/actions'
import DltRequest from '../components/form/DLTRequest'

function mapStateToProps(state) {
  return {
    viewDLT: state.issue.viewDLT
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTicketDetail: issueActions.getTicketDetail
    },
    dispatch
  )
}

const DLTDetailPage = props => (
  <Layout title="DLT Request" pageName="DLT Request">
    <Skeleton active loading={props.viewDLT.length === 0}>
      <DltRequest
        createDate={moment().format('DD/MM/YYYY HH:mm')}
        license={props.viewDLT}
      />
    </Skeleton>
  </Layout>
)

export default connect(mapStateToProps, mapDispatchToProps)(DLTDetailPage)
