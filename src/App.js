import React from 'react';
import Header from './Components/header'

import { Container, Row } from 'reactstrap'
import LiveVisitors from './Components/LiveVisitors'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import publicChat from './Components/publicChat'
import roomChat from './Components/roomChat'

const App = () => {



  return (

    <BrowserRouter>
    <React.Fragment>



      <Header />

     <Container>

      <Row> 

    <Switch>


   
       <Route exact path="/" component={LiveVisitors}/>
       <Route path="/public" component={publicChat} />
       <Route path="/room"    component={roomChat} />
       </Switch>
        </Row>

     </Container>

    </React.Fragment>

    </BrowserRouter>
  );
}

export default App;
