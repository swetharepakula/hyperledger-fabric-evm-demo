import Web3 from "web3";

var myContract;

export function getContract(services) {
    console.log("Getting the Contract")
        console.log("inside getContract: vcap_services are : " + services)
    var web3;
    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        web3 = new Web3();
    }

    var vcap_services = JSON.parse(services)
    var host = vcap_services["eth"][0]["credentials"]["host"]
    var port = vcap_services["eth"][0]["credentials"]["ports"]["8545/tcp"]
    var abi = vcap_services["eth"][0]["credentials"]["eth_node"]["abi"]
    var contractAddr = vcap_services["eth"][0]["credentials"]["eth_node"]["contract_address"]
    var addr = vcap_services["eth"][0]["credentials"]["eth_node"]["address"]

    web3.setProvider(new web3.providers.HttpProvider(host + ":" + port));
    web3.eth.defaultAccount = addr;

    var VotingContract = web3.eth.contract(abi);
    myContract = VotingContract.at(contractAddr);
    return myContract;
}

export function voteA(vcap_services, func) {
        console.log("voted for option A");
        console.log("vcap_services are : " + vcap_services)
        console.log("func is : " + func)
        var myContract = getContract(vcap_services);
        myContract.vote(0);
    // window.location.href = 'results.html';
}

export function voteB(vcap_services, func) {
    console.log("voted for option B");
        console.log("vcap_services are : " + vcap_services)
        console.log("func is : " + func)
    var myContract = getContract(vcap_services);
    myContract.vote(1);
    // window.location.href = 'results.html';
}

export function getResults() {
    var myContract = getContract();
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

    var results = {
        valA: valA,
        valB: valB,
        percentA: perA,
        percentB: perB,
    }

    return results;
}
