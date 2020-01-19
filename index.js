web3 = new Web3("http://127.0.0.1:7545");

abi = JSON.parse('[{"inputs": [],"name": "add","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "get","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "subtract","outputs": [],"stateMutability": "nonpayable","type": "function"}]');

//Get all account addresses
web3.eth.getAccounts().then(accounts => {
    accounts.forEach(account => {
        addAccount(account);
    });
});

var contractDeployed = new web3.eth.Contract(abi,'0x2C9Af7Ac6c7af4129B33D231092d337457fEBFF0');
console.log('Contract address: ' + contractDeployed.options.address);

function addAccount(account) { 
    $('#select').append(`<option> 
                               ${account} 
                          </option>`); 
}

function Add(){
    sender = $("#select").val();

    if(sender == "") return;

    contractDeployed.methods.add().send({from: sender}, (err) => {
        if (err) {
            console.log(`error: ${err}`);
            return;
        }

        Get();
    });
}

function Subtract(){
    sender = $("#select").val();

    if(sender == "") return;

    contractDeployed.methods.subtract().send({from: sender}, (err) => {
        if (err) {
            console.log(`error: ${err}`);
            return;
        }

        Get();
    });
}

function Get(){
    sender = $("#select").val();

    contractDeployed.methods.get().call({ from: sender }, (err, data) => {
        if (err) {
            console.log(`error: ${err}`);
            return;
        }

        $("#value").text(data);
    });
}

$( "#select" ).change(function() {
    Get();
  });  