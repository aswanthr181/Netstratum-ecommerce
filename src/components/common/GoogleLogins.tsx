import { GoogleLogin } from "@react-oauth/google"
import { decodeJwt } from "jose"
import { useDispatch } from "react-redux"
// import { GetUserData } from "../../redux/userAuth"
import { useNavigate } from "react-router-dom"
import { GetAdminData } from "../../redux/adminAuth"
import { generateError } from "../../constants/Alerts"

function GoogleLogins() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('credenttttttttioal', credentialResponse)
          const { credential } = credentialResponse
          const payload = credential ? decodeJwt(credential) : undefined
          console.log(payload)
          if (payload) {
            if (payload.email === 'aswanthr18tech@gmail.com') {
              console.log('successss payload', payload);
              dispatch(GetAdminData({ adminData: payload }))
              navigate('/portal')
            } else {
              generateError('YOU ARE NOT AUTHORIZED ADMIN')
            }
          }
        }}
        onError={() => {
          console.log('An error occurred');
        }}
      />
    </div>
  )
}

export default GoogleLogins