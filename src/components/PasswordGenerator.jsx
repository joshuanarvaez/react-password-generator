import React, { useState, } from 'react';
import { PasswordService } from '../services/PasswordService';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PasswordGenerator = () => {

    // create states for our inputs
    let [state, setState] = useState({
        generatedPassword: '',
        passwordLength: 8,
        symbol: false,
        number: false,
        lower: false,
        upper: false
    });

    // update state of generated password and password length
    const updateInput = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };

    // update state of checkboxes
    const updateCheck = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        })
    };

    // when generate button is clicked, pull appropriate characters from PasswordService based off state of passwordObj
    const submit = (event) => {
        event.preventDefault();
        let passwordObj = PasswordService.getPasswordObj(state);
        // call generatePassword and store it in password based off user inputs and state.
        let password = PasswordService.generatePassword(passwordObj, state.passwordLength);
        // now display the generated password in the appropriate textbox
        setState({ ...state, generatedPassword: password });
    };

    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary p-3">
                                <p className="h4">Password Generator</p>
                            </div>
                            <div className="card-body bg-primary">
                                <form onSubmit={submit}>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <span className="input-group-text">Password</span>
                                            <input
                                                value={state.generatedPassword}
                                                onChange={updateInput}
                                                name="generatedPassword"
                                                type="text" className="form-control" placeholder="Generated Password" />
                                            <CopyToClipboard
                                                text={state.generatedPassword} // here we target generated password to copy
                                                onCopy={() => alert("Copied generated password to your clipboard")}>
                                                <span className="input-group-text"><i
                                                    type="submit"
                                                    className='fa fa-clipboard'></i></span>
                                            </CopyToClipboard>

                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <input
                                                required={true} // only require password length
                                                value={state.passwordLength}
                                                onChange={updateInput}
                                                name="passwordLength"
                                                type="number" className="form-control" placeholder="Password Length" />
                                            <span className="input-group-text">Password Length</span>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <input
                                                    onChange={updateCheck}
                                                    name="lower"
                                                    type="checkbox" className="form-check-input" />
                                            </span>
                                            <input type="text" disabled={true} className="form-control-group bg-white" placeholder="Lowercase Letters"></input>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <input
                                                    onChange={updateCheck}
                                                    name="upper"
                                                    type="checkbox" className="form-check-input" />
                                            </span>
                                            <input type="text" disabled={true} className="form-control-group bg-white" placeholder="Uppercase Letters"></input>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <input
                                                    onChange={updateCheck}
                                                    name="number"
                                                    type="checkbox" className="form-check-input" />
                                            </span>
                                            <input type="text" disabled={true} className="form-control-group bg-white" placeholder="Numbers"></input>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">
                                                <input
                                                    onChange={updateCheck}
                                                    name="symbol"
                                                    type="checkbox" className="form-check-input" />
                                            </span>
                                            <input type="text" disabled={true} className="form-control-group bg-white" placeholder="Symbols"></input>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <input type="submit" value="Generate" className="btn btn-outline-dark" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

};

export default PasswordGenerator;