import React from 'react';
export default class JokeDisplay extends React.Component{
    render(){
        if(this.props.data==null){
            return(
                <div className="jokeDisplay">
                    No Joke Now! 
                </div>
            )
        }
        return (
            <div className="jokeDisplay">
                {this.props.data.joke}
            </div>
        );
    }
}