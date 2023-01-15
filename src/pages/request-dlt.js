import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Skeleton } from 'antd'

import Layout from '../components/layout'
import RequestDlt from '../components/form/RequestDlt'
import authActions from '../state/auth/actions'
import issueActions from '../state/issue/actions'

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    companies: state.issue.companies,
    vehicles: state.issue.vehicles,
    isLoadingVehicleRequest: state.issue.isLoadingVehicleRequest,
    isLoadingCompany: state.issue.isLoadingCompany,
    isLoadingVehicle: state.issue.isLoadingVehicle
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUid: authActions.setUid,
      setRedirectPath: authActions.setRedirectPath,
      getCompany: issueActions.getCompany,
      clearVehicles: issueActions.clearVehicles,
      getVehicles: issueActions.getVehicles,
      createDLT: issueActions.createDLT
    },
    dispatch
  )
}

const RequestDltPage = props => {
  const [businessUnitId, setBusinessUnitId] = useState(null)

  useEffect(() => {
    const liff = window.liff
    liff.init({ liffId: process.env.LIFF_DLT }, lineInit, err =>
      console.error(err.code, err.message)
    )
  }, [])

  const lineInit = () => {
    const liff = window.liff
    if (liff.isLoggedIn()) {
      window.liff.getProfile().then(({ userId }) => {
        props.setUid(userId)
        props.setRedirectPath('/request-dlt')
        props.getCompany()
      })
    } else {
      liff.login()
    }
  }

  const handleOnSubmit = ({ vehicles }) => {
    if (vehicles && vehicles.length > 0) {
      props.createDLT(businessUnitId, vehicles)
    }
  }

  const handleCompanyChange = values => {
    props.clearVehicles()
    if (values && values.length > 0) {
      setBusinessUnitId(parseInt(values))
    }
  }

  const handleSearchVehicle = text => {
    props.getVehicles(businessUnitId, text)
  }

  return (
    <Layout title="ขอหนังสือรับรอง DLT" pageName="DLT">
      <Skeleton active loading={Object.keys(props.companies).length === 0}>
        <RequestDlt
          isAdminMode={props.profile.companyId === null}
          isLoadingSubmitVehicle={props.isLoadingVehicleRequest}
          isLoadingCompany={props.isLoadingCompany}
          isLoadingVehicle={props.isLoadingVehicle}
          companies={props.companies}
          vehicles={props.vehicles}
          onCompanyChange={handleCompanyChange}
          onSearchVehicle={handleSearchVehicle}
          onClearVehicle={props.clearVehicles}
          onSubmit={handleOnSubmit}
        />
      </Skeleton>
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDltPage)
