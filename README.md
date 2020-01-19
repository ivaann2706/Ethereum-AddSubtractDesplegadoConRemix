# Ethereum-AddSubtractDesplegadoConRemix
En este proyecto se desarrollará un contrato inteligente llamado AddSubtract usando Remix. El contrato se desplegará mediante Remix en una red de pruebas proporcionada por Ganache.

## Desarrollo del contrato inteligente
Para el desarrollo del contrato inteligente se ha usado Remix por su facilidad para probar su funcionalidad. El contrato se escribe en el lenguaje Solidity. 

```Solidity
pragma solidity ^0.6.1;

contract AddSubtract {

    mapping (address => uint) private accountValues;

    function add() public {
        accountValues[msg.sender]++;
    }
    
    function subtract() public {
        if(accountValues[msg.sender]>0) {
            accountValues[msg.sender]--;    
        }
    }

    function get() public view returns (uint) {
        return accountValues[msg.sender];
    }
}
```
En este contrato cada cuenta tendrá un valor unsigned asignado. Con el uso de las funciones add() y subtract() se podrá modificar el valor que tiene asignado cada cuenta. Además con una función de consulta llamada get() se podrá obtener el valor actual almacenado de dicha.

## Despliegue del contrato inteligente
El contrato se desplegará mediante Remix en una red de pruebas proporcionada por Ganache.
Lo primero que haremos es abrir Ganache y pulsar en QuickStart para crear una red de pruebas con 10 cuentas con 100 ethers cada una. Desde Ganache recuperamos ip y puerto que tendremos que usar en Remix y en javascript.
```
RPC SERVER
HTTP://127.0.0.1:7545
```

Una vez creada la red desde Remix desplegaremos el contrato. Para ello, desde la pestaña Run seleccionamos en el Environment la opción Web3 Provider. Nos pedirá que introduzcamos una ip y puerto. Ponemos la dirección que Ganache nos ha proporcionado: HTTP://127.0.0.1:7545. Tras esto, pulsamos el botón Deploy para desplegar el contrato en la red.


## Desarrollo de una interfaz web

Se va a crear una pequeña interfaz web haciendo uso de jQuery y Web3.js. Para usar la librería web3 la instalamos de la siguiente forma.
```
sudo npm install web3
```

El html es el siguiente:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AddSubtract</title>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
    </head>
<body>
    <div class="container" >
        <h1>Add & Subtract</h1>
        <br>
        <select id="select">
            <option value=''>Select acount</option>
        </select>
        <button onclick="Add()">Add</button>
        <button onclick="Subtract()">Subtract</button>
        <p>Value: <span id="value"></span> </p>
    </div>
    <script src="node_modules/web3/dist/web3.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="./index.js"></script>
</body>
</html>
```

El javascript es el siguiente:
```javascript
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
```
El ABI del contrato lo podemos conseguir desde Remix en la pestaña Compile.

En el script tan solo es necesario modificar los siguientes campos con la información concreta para que todo funcione correctamente:
- ip y puerto
- abi del contrato
- dirección del contrato



