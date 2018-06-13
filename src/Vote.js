import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import * as dapp from "./dapp";
import loaderIcon from "./assets/images/loader_duo.svg";

import "./vote.css";

class Vote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const checkbox1 = document.querySelector("#optionA");
        const checkbox2 = document.querySelector("#optionB");
        checkbox1.removeAttribute("checked");
        checkbox2.removeAttribute("checked");
        this.setState({
            selectedOption: e.target.value,
        })
        e.target.setAttribute("checked", "");
        if (checkbox1.hasAttribute("checked")) {
            console.log("button 1 is checked.");
            console.log(checkbox1.parentElement);
            checkbox1.parentElement.classList.add("radio-selected-label");
            checkbox2.parentElement.classList.remove("radio-selected-label");
        } else if (checkbox2.hasAttribute("checked")) {
            console.log("button 2 is checked.");
            console.log(checkbox2.parentElement);
            checkbox1.parentElement.classList.remove("radio-selected-label");
            checkbox2.parentElement.classList.add("radio-selected-label");
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting form");
        console.log("This should show immediately.");
        const vcap_services = window._env_.REACT_APP_VCAP_SERVICES;
        if (this.state.selectedOption === "option1") {
            console.log("This should show immediately.");
            this.setState({ loading: true });
            // if vote A is selected
            // awesome was selected
            dapp.voteA(vcap_services);
            setTimeout(() => {
                this.props.history.push("/results");
            }, 2000);
            // console.log("Voting for option A");
        } else if (this.state.selectedOption === "option2"){
            console.log("This should show immediately.");
            this.setState({ loading: true });
            // if vote B is selected
            // fantastic was selected
            dapp.voteB(vcap_services);
            setTimeout(() => {
                this.props.history.push("/results");
            }, 2000);
            // console.log("Voting for option B");
        } 
    }



    render() {
        return <div className="vote__container">
            <h1 className="ibm-light">Question</h1>
            <p>
              How awesome is it that you can have the <a
                href="https://www.hyperledger.org/projects/hyperledger-burrow"
                target="_blank"
                rel="noopener noreferrer">Hyperledger Burrow</a> Ethereum VM
                smart contract engine running as chaincode inside <a
                href="https://www.hyperledger.org/projects/fabric" target="_blank"
                rel="noopener noreferrer">Hyperledger Fabric</a>?
            </p>
            <p className="ibm-label">*After submitting your vote, a transaction will be submitted using a deployed Ethereum smart contract.</p>
            <form onSubmit={this.handleSubmit} action="POST">
              <div className="radio__button--container">
                <div className="radio">
                  <label htmlFor="optionA" className="radio-label">
                    <input id="optionA" name="radio" type="radio" value="option1" onChange={this.handleChange} checked={this.state.selectedOption === "option1"} />
                    Not at all.
                  </label>
                </div>
                <div className="radio">
                  <label htmlFor="optionB" className="radio-label">
                    <input id="optionB" name="radio" type="radio" value="option2" onChange={this.handleChange} checked={this.state.selectedOption === "option2"} />
                    Some, tell me more.
                  </label>
                </div>
                <button disabled={!this.state.selectedOption} className="duo__btn submit__vote--btn" type="submit" value="Submit" name="submit">
                {
                    this.state.loading
                        ? <img src={loaderIcon} alt="Loading icon" className="loading__spinner" />
                        : "Submit"
                }
                </button>
              </div>
            </form>
          </div>;
    }
}

export default withRouter(Vote);
