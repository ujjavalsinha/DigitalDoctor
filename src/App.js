import React from 'react';
import styles from './App.module.css'
// import Auxiliary from './hoc/Auxiliary'
import Toolbar from './components/Toolbar/Toolbar';
import Home from './components/Home/Home';
import UserForm from './components/UserForm/UserForm';
import {Route,Switch} from 'react-router-dom';
import ReadingsForm from './components/ReadingsForm/ReadingsForm'
// import Footer from './components/Footer/Footer'
import VoiceForm from './components/VoiceForm/VoiceForm'
import Guidelines from './components/guidelines/guidelines'
import Prereport from './components/Prereport/Prereport'
import About from './components/About/About'
import FinalReport from './components/FinalReport/FinalReport'
const App = () => {
  return (
    <div className={styles.App}>
      <header>
        <Toolbar/>
      </header>
      <div>
        <Switch>
          {/* <Route path="/" exact component={Home}/> */}
          <Route path='/' exact render={()=><Home/>}/>
          <Route path='/about' render={()=><About/>}/>
          <Route path='/guidelines' exact render={() => <Guidelines/>}/>
          <Route path="/userform" exact component={UserForm}/>
          <Route path="/readingsform" exact component={ReadingsForm}/>
          <Route path="/voiceform" component={VoiceForm}/>
          <Route path="/prereport" component={Prereport}/>
          <Route path="/finalreport/" component={FinalReport}/>
          
          {/* <Route path="/#guidelines" component={Guidelines}/> */}
        </Switch>
        
      </div>
      {/* <Footer/> */}
        
    </div>
    
  )
}
 
export default App;
