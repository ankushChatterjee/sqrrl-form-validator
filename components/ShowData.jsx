import React from 'react';
export default class ShowData extends React.Component{
    render(){
        if(!this.props.data){
            return(
                <div className="showdata"> Enter Value </div>
            );
        }

        return(
            <div className="showdata">
                <div>Name:-{this.props.data.name}</div>
                <div>Age:-{this.props.data.age}</div>
                <div>Email:-{this.props.data.email}</div>
                <div>Password:-{this.props.data.password}</div>
            </div>
        );
    }
}