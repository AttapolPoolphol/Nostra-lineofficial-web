import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Skeleton, Form, notification } from 'antd'

import Layout from '../components/layout'
import authActions from '../state/auth/actions'
import issueActions from '../state/issue/actions'
import vehicleActions from '../state/vehicle-finding/actions'
import VehicleFinding from '../components/form/VehicleFinding'

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    isLoadingCompany: state.issue.isLoadingCompany,
    isLoadingVehicle: state.issue.isLoadingVehicle,
    companies: state.issue.companies,
    vehicles: state.issue.vehicles,
    isLoadingSubmitVehicle: state.vehicle.isLoadingSubmitVehicle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUid: authActions.setUid,
      setRedirectPath: authActions.setRedirectPath,
      getCompany: issueActions.getCompany,
      getVehicles: issueActions.getVehicles,
      clearVehicles: issueActions.clearVehicles,
      getVehicleLocation: vehicleActions.getVehicleLocation
    },
    dispatch
  )
}

const VehicleFindingPage = props => {
  const [businessUnitId, setBusinessUnitId] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const liff = window.liff
    liff.init({ liffId: process.env.LIFF_VEHICLE_FINDING }, lineInit, err =>
      console.error(err.code, err.message)
    )
  }, [])

  const lineInit = () => {
    const liff = window.liff
    if (liff.isLoggedIn()) {
      window.liff.getProfile().then(({ userId }) => {
        props.setUid(userId)
        props.setRedirectPath('/vehicle-finding')
        props.getCompany()
      })
    } else {
      liff.login()
    }
  }

  const handleOnSubmit = values => {
    props.getVehicleLocation(
      businessUnitId,
      parseInt(values.vehicleId),
      response => {
        if (response) {
          const data = response.items[0]
          const param = []
          param.push('map=streetmap')
          param.push('level=15')
          param.push('w=360')
          param.push('h=230')
          param.push(getDirectionUrl(data))
          param.push('lat=' + data.latitude)
          param.push('lon=' + data.longitude)
          param.push('title=Location')
          param.push('content=' + encodeURIComponent(data.location))

          window.location.replace(
            process.env.GATSBY_NOSTRA_MAP_ENDPOINT + '?' + param.join('&')
          )
        } else {
          notification.error({ message: 'ไม่พบข้อมูล' })
        }
      }
    )
  }

  const getDirectionUrl = data => {
    let url = 'pinurl=' + process.env.GATSBY_NOSTRA_MAP_ENDPOINT_ICON
    url = url + '/' + data.movement
    switch (data.directionType) {
      case 1:
        url = url + '/N.png'
        break
      case 2:
        url = url + '/NE.png'
        break
      case 3:
        url = url + '/E.png'
        break
      case 4:
        url = url + '/SE.png'
        break
      case 5:
        url = url + '/S.png'
        break
      case 6:
        url = url + '/SW.png'
        break
      case 7:
        url = url + '/W.png'
        break
      case 8:
        url = url + '/NW.png'
        break

      default:
        url = url + '/N.png'
        break
    }
    return url
  }

  const handleCompanyChange = values => {
    form.setFieldsValue({ vehicleId: undefined })

    props.clearVehicles()
    if (values && values.length > 0) {
      setBusinessUnitId(parseInt(values))
    }
  }

  const handleSearchVehicle = text => {
    props.getVehicles(businessUnitId, text)
  }

  return (
    <Layout title="ค้นหาตำแหน่งรถ" pageName="Location">
      <Skeleton active loading={props.companies.length === 0}>
        <VehicleFinding
          isAdminMode={props.profile.companyId === null}
          isLoadingSubmitVehicle={props.isLoadingSubmitVehicle}
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleFindingPage)
