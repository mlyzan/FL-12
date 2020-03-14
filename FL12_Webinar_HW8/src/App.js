import React from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header/>
          <Main/>
          <Footer/>
        </div>
      </Provider>
    </BrowserRouter>
    );
  }

export default App;
