import React from 'react';
import ShowData from '../components/ShowData';
import JokeDisplay from './JokeDisplay';
import '../style/inputform.scss';
export default class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:"",age:'',email:"",password:"",confpassword:"",validated:false,sendProps:null,jokeData:null,nameError:'',ageError:'',emailError:'',passwordError:'',confError:''};
    }
    render(){
       // console.log(this.state);
        return(<div>
            <form onSubmit={this.handleSubmit.bind(this)}>
               <h2 className="toptext"> Please Enter your details </h2>
                <div className="inputholder">
                    <input placeholder="Name" onBlur={this.validateName.bind(this)} onChange={this.nameChange.bind(this)} id="name" value={this.state.name} />
                    <i className="material-icons">account_circle</i>
                </div>
                <div className="error">{this.state.nameError}</div>
                <div onSubmit={this.nameChange.bind(this)} className="inputholder">
                    <input placeholder="Age" onBlur={this.validateAge.bind(this)} onChange={this.ageChange.bind(this)} type="number" id="age" value={this.state.age} />
                    <i className="material-icons">face</i>
                </div>
                <div className="error">{this.state.ageError}</div>
                <div className="inputholder">
                    <input placeholder="E Mail" onBlur={this.validateEmail.bind(this)} onChange={this.emailChange.bind(this)} id="email" value={this.state.email} />
                    <i className="material-icons">email</i>
                </div>
                <div className="error">{this.state.emailError}</div>
                <div className="inputholder">
                    <input type="password" placeholder="Password" onBlur={this.validatePass.bind(this)} onChange={this.passwordChange.bind(this)} id="password" value={this.state.password} />
                    <i className="material-icons">vpn_key</i>

                </div>
                <div className="error">{this.state.passwordError}</div>
                <div className="inputholder">
                    <input type="password" placeholder="Password again" onBlur={this.validateConf.bind(this)}  onChange={this.confPassChange.bind(this)} id="confpassword" value={this.state.confpassword} />
                    <i className="material-icons">vpn_key</i>
                </div>
                <div className="error">{this.state.confError}</div>
                <input type="submit" id="formsubmit" value="Submit" />
            </form>
            <ShowData data={this.state.sendProps} />
            <JokeDisplay data={this.state.jokeData} />
            </div>
        );
    }
    handleSubmit(evt){
        evt.preventDefault();
        if(this.state.validated){
            let sp = {name:this.state.name,age:this.state.age,email:this.state.email,password:this.state.password};
            this.setState({sendProps:sp});
            let name = this.state.name;
            let first = this.state.name.split(' ')[0];
            let last = this.state.name.split(' ')[1];
            const url = `http://api.icndb.com/jokes/random?exclude=[explicit]&firstName=${first}&lastName=${last}`;
            console.log(url);
            fetch(url).then(res=>{
                return res.json();
            }).then(data=>{
                console.log(data);
                this.setState({jokeData:data.value});
            });

        }
    }
    nameChange(evt){
        evt.preventDefault();
        this.setState({name:evt.target.value});
    }
    ageChange(evt){
        evt.preventDefault();
        this.setState({age:evt.target.value});

    }
    emailChange(evt){
        evt.preventDefault();
        this.setState({email:evt.target.value});

    }
    passwordChange(evt){
        evt.preventDefault();
        this.setState({password:evt.target.value});
    }
    confPassChange(evt){
        evt.preventDefault();
        this.setState({confpassword:evt.target.value});
    }

    validateName(evt){
        evt.preventDefault();
        console.log(evt.target.parent);
        if(this.state.name === '' ){
            evt.target.className = 'error';
            this.setState({validated:false,nameError:'enter valid name'});
        }else{
            evt.target.className = 'okay';
            this.setState({validated:true,nameError:''});
        }
    }
    validateAge(evt){
        evt.preventDefault();
        const age = parseInt(this.state.age);
        if(age<0 && this.state.age===''){
            evt.target.className = 'error';
            this.setState({validated:false,ageError:'enter valid name'});
        }else{
            evt.target.className = 'okay';
            this.setState({validated:true,ageError:''});
        }

    }

    isEmailOkay(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            return (true)
        return (false)
    }

    validateEmail(evt){
        evt.preventDefault();
        if(this.isEmailOkay(this.state.email)){
            evt.target.className = 'okay';
            this.setState({validated:true,emailError:''});
        }else{
            evt.target.className = 'error';
            this.setState({validated:false,emailError:'enter valid email'});
        }

    }

    checkPasswordComplexity(pwd) {
        let letter = /[a-zA-Z]/; 
        let number = /[0-9]/;
        let valid = number.test(pwd) && letter.test(pwd);
        return valid;
    }

    validatePass(evt){
        evt.preventDefault();
        if(this.checkPasswordComplexity(this.state.password)){
            evt.target.className = 'okay';
            this.setState({validated:true,passwordError:''});
        }else{
            evt.target.className = 'error';
            this.setState({validated:false,passwordError:'password should be alphanumeric'});
        }
    }
    validateConf(evt){
        evt.preventDefault();
        if(this.checkPasswordComplexity(this.state.password) && evt.target.value === this.state.password){
            evt.target.className = 'okay';
            this.setState({validated:true,confError:''});
        }else{
            evt.target.className = 'error';
            this.setState({validated:false,confError:'passwords do not match'});
        }
    }
}