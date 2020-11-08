import Contacts from './components/contacts/Contacts'
import Header from './components/layout/Header'
import AddContact from './components/contacts/AddContact'
import EditContact from './components/contacts/EditContact'
import About from './components/pages/About'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './components/pages/NotFound'
import {Provider} from './context'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Provider>
      <Router>
    <div className="App">
      <Header branding="Dynamic contact manager"/>
          <div className="container">
             <Switch>
                <Route path="/" exact component={Contacts}/>
                <Route path="/about" exact component={About}/>
                <Route path="/contacts/add" exact component={AddContact}/> 
                <Route path="/contacts/edit/:id" exact component={EditContact}/> 
                <Route component={NotFound}/>                
             </Switch>
      </div>     
    </div>
    </Router>
    </Provider>
  ); 
}

export default App;
