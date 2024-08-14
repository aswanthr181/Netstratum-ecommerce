import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-56h02s6mq0yegdqz.us.auth0.com"
const auth0clientId = "1bXreGSAUibtBfUZFgNjmbIVCCEp9Nrq"
// const domain="dev-vyjc0kly7c71ipza.us.auth0.com"
// const auth0clientId= "8O4YgynwC0WAo6OBkcsD3hne5zjeMbYl"
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={auth0clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <GoogleOAuthProvider
        clientId='76252509575-d70u475q6dliihkakfll1mdse5qgcekc.apps.googleusercontent.com' >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </Auth0Provider>

  // </React.StrictMode>,
)
