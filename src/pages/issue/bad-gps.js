import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Skeleton } from 'antd'

import Layout from '../../components/layout'
import Issue from '../../components/form/Issue'
import authActions from '../../state/auth/actions'
import issueActions from '../../state/issue/actions'

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    isLoadingIssueCreation: state.issue.isLoadingIssueCreation,
    isLoadingCompany: state.issue.isLoadingCompany,
    isLoadingVehicle: state.issue.isLoadingVehicle,
    companies: state.issue.companies,
    vehicles: state.issue.vehicles
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUid: authActions.setUid,
      setRedirectPath: authActions.setRedirectPath,
      createIssue: issueActions.createIssue,
      getCompany: issueActions.getCompany,
      getVehicles: issueActions.getVehicles,
      clearVehicles: issueActions.clearVehicles
    },
    dispatch
  )
}

const problems = [
  'รถวิ่งงานปกติ แต่ GPS หยุดอัปเดต',
  'ซ่อมเสร็จแล้ว แต่ GPS ยังไม่กลับมาอัปเดต',
  'GPS หยุดอัปเดตในช่วง เวลา ที่ดึงรายงาน',
  'รถติดฟิล์มและปรอทหนาเกินไป',
  'รถไม่ได้ใช้งานนาน',
  'นำแบตเตอรี่มาใส่ หรือ เปลี่ยนแบตเตอรี่แล้ว GPS ยังไม่อัปเดต',
  'GPS หยุดอัปเดตทั้งระบบไม่สามารถติดตามตำแหน่งล่าสุดของรถได้',
  'อื่นๆ'
]

const IssueBadGPSPage = props => {
  const [businessUnitId, setBusinessUnitId] = useState(null)

  useEffect(() => {
    const liff = window.liff
    liff.init({ liffId: process.env.LIFF_ISSUE_GPS }, lineInit, err =>
      console.error(err.code, err.message)
    )
  }, [])

  const lineInit = () => {
    const liff = window.liff
    if (liff.isLoggedIn()) {
      window.liff.getProfile().then(({ userId }) => {
        props.setUid(userId)
        props.setRedirectPath('/issue/bad-gps')
        props.getCompany()
      })
    } else {
      liff.login()
    }
  }

  const handleOnSubmit = ({ vehicleId, license, remark }) => {
    props.createIssue(
      'GPS หยุดอัปเดต',
      businessUnitId,
      vehicleId,
      license,
      remark
    )
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
    <Layout title="แจ้งปัญหา" pageName="GPS">
      <Skeleton active loading={props.companies.length === 0}>
        <Issue
          title="GPS หยุดอัปเดต"
          faqUrl="https://nostralogistics.com/product-faqgps-หยุดอัพเดท"
          prefixRemark="GPS problem"
          isAdminMode={props.profile.companyId === null}
          isLoadingIssueCreation={props.isLoadingIssueCreation}
          isLoadingCompany={props.isLoadingCompany}
          isLoadingVehicle={props.isLoadingVehicle}
          companies={props.companies}
          vehicles={props.vehicles}
          problems={problems}
          onCompanyChange={handleCompanyChange}
          onSearchVehicle={handleSearchVehicle}
          onClearVehicle={props.clearVehicles}
          onSubmit={handleOnSubmit}
        />
      </Skeleton>
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueBadGPSPage)
