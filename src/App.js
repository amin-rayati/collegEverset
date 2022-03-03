import { ReactChild, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useLocation,
} from 'react-router-dom'
import Home from './Page/Home/Home'
import Dore from './Page/Dore/Dore'
import ContactUs from './Page/ContactUs/ContactUs'
import About from './Page/About/About'
import Customers from './Page/Customers/Customers'
import Certificate from './Page/Certificate/Certificate'
import Service from './Page/Service/Service'
import AskDore from './Page/Dore/AskDore'
import TeacherForm from './Page/TeacherForm/TeacherForm'
import AskConsult from './Page/Consult/AskConsult'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { useProjectContext } from './context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/askcourse'>
            <AskDore />
          </Route>
          <Route exact path='/contact'>
            <ContactUs />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/teacherregister'>
            <TeacherForm />
          </Route>
          <Route exact path='/consult'>
            <AskConsult />
          </Route>

          <Route exact path='/customers'>
            <Customers />
          </Route>
          <Route exact path='/certificate'>
            <Certificate />
          </Route>
          <Route exact path='/service'>
            <Service />
          </Route>

          <Route exact path='/courses/:id'>
            <Dore />
          </Route>
          <Route exact path='/courses/:id/:id'>
            <Dore />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
