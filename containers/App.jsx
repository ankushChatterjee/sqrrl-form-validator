import React from 'react';
import InputForm from '../components/InputForm';
import Header from '../components/Header';
export default class App extends React.Component{
    render(){
        return(<div>
            <Header />
            <div><InputForm /></div></div>
        );
    }
}