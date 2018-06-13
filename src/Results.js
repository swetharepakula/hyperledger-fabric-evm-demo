import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as dapp from "./dapp";
import "./results.css";

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        console.log("hello");
        this.getResults();
    }

    getResults = () => {
        console.log("FETCHING RESULTS");
        var myContract = dapp.getContract();
        var optionA = myContract.proposals(0).toString();
        var valA = parseInt(optionA.substring(optionA.indexOf(',') + 1), 10);
        var optionB = myContract.proposals(1).toString();
        var valB = parseInt(optionB.substring(optionB.indexOf(',') + 1), 10);

        var tot = valA + valB;
        var perA = (valA / tot) * 100;
        var perB = (valB / tot) * 100;

        console.log(valA);
        console.log(valB);
        console.log(perA);
        console.log(perB);

        this.setState({
            valA: valA,
            valB: valB,
            perA: perA,
            perB: perB,
            loading: false
        });
    }


    render() {
        return <div className="results__container">
            <div>
              <h1>Results</h1>
              <p>
                How interested are you in having a robust permissioned blockchain
                  platform such as <a href="https://www.hyperledger.org/projects/fabric" target="_blank"
                  rel="noopener noreferrer">Hyperledger Fabric</a> that runs Ethereum contracts?
              </p>
              {!this.state.loading ? <div className="results__percentage--container">
                  <div className="results__item--container">
                    <p className="resultCategory">Not at all.</p>
                    <div id="opta" className="votebar" style={{ width: `${this.state.perA}%` }}>
                      <p className="resultValue" id="resultA">
                        {this.state.valA !== 0 && this.state.valA}
                      </p>
                    </div>
                  </div>
                  <div className="results__item--container">
                    <p className="resultCategory">Some, tell me more.</p>
                    <div id="optb" className="votebar" style={{ width: `${this.state.perB}%` }}>
                      <p className="resultValue" id="resultB">
                        {this.state.valB !== 0 && this.state.valB}
                      </p>
                    </div>
                  </div>
                  <Link to="/" className="duo__btn finish__link">
                    Restart
                  </Link>
                </div> : "Loading"}
            </div>
          </div>;
    }
}

export default Results;
