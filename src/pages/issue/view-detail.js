import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Skeleton } from 'antd'
import queryString from 'query-string'

import Layout from '../../components/layout'
import authActions from '../../state/auth/actions'
import issueActions from '../../state/issue/actions'
import DisplayTicket from '../../components/form/Ticket'

function mapStateToProps(state) {
  return {
    isLoadingTicketDetail: state.issue.isLoadingTicketDetail,
    ticketDetail: state.issue.ticketDetail
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUid: authActions.setUid,
      setRedirectPath: authActions.setRedirectPath,
      getTicketDetail: issueActions.getTicketDetail
    },
    dispatch
  )
}

const ViewDetailPage = props => {
  useEffect(() => {
    const liff = window.liff
    liff.init({ liffId: process.env.LIFF_TICKET_DETAIL }, lineInit, err =>
      console.error(err.code, err.message)
    )
  }, [])

  const lineInit = () => {
    const liff = window.liff
    if (liff.isLoggedIn()) {
      window.liff.getProfile().then(({ userId }) => {
        props.setUid(userId)
        props.setRedirectPath('/vehicle-finding')

        const params = queryString.parse(props.location.search)
        props.getTicketDetail(params.id)
      })
    } else {
      liff.login()
    }
  }

  return (
    <Layout title="Ticket" pageName="Ticket">
      <Skeleton active loading={Object.keys(props.ticketDetail).length === 0}>
        <DisplayTicket
          createDate={props.ticketDetail.formatTicketDate}
          numberTicket={props.ticketDetail.id}
          status={props.ticketDetail.statusDisplayName}
          ticketOpener={props.ticketDetail.owner}
          company={props.ticketDetail.companyName}
          department={props.ticketDetail.businessUnitName}
          detail={props.ticketDetail.customerRemark}
          license={props.ticketDetail.license}
          createDate={props.ticketDetail.formatTicketDate}
          createDate={props.ticketDetail.formatTicketDate}
        />
      </Skeleton>
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailPage)
