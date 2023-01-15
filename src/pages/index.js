import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginPage from '../components/form/Login'
import authActions from '../state/auth/actions'
import { message } from 'antd'
import 'antd/dist/antd.css'
import '../style/index.css'

function mapStateToProps(state) {
  return {
    uid: state.auth.uid,
    isLoadingLoginForm: state.auth.isLoadingLoginForm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login: authActions.login
    },
    dispatch
  )
}

const IndexPage = props => {
  const [errorText, setErrorText] = useState('')
  // const [userId, setUserId] = useState('')

  // useEffect(() => {
  //   const liff = window.liff
  //   liff.init({ liffId: process.env.LIFF_BAD_GPS }, lineInit, err =>
  //     console.error(err.code, err.message)
  //   )
  // }, [])

  // const lineInit = () => {
  //   const liff = window.liff
  //   if (liff.isLoggedIn()) {
  //     window.liff.getProfile().then(({ userId }) => {
  //       setUserId(userId)
  //     })
  //   } else {
  //     liff.login()
  //   }
  // }
  const loginNostra = values => {
    props.login(props.uid, values.username, values.password, error => {
      if (!error) {
        window.liff.closeWindow()
      } else {
        setErrorText(error)
      }
    })
  }

  return (
    <LoginPage
      onSubmit={loginNostra}
      loading={props.isLoadingLoginForm}
      error={errorText}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
