import React, { useState } from 'react';
// import Web3 from 'web3';
import "./App.css";
import { useAlert } from 'react-alert';



const TokenBalance = () => {
  const [chain, setChain] = useState('Mantle');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [balance2, setBalance2] = useState('');
  const [percentchange, setPercentchange] = useState('');
  const [change,setChange] = useState('change');
  const alert = useAlert();
  
  
  const chains = {
    "choose one of the following": "mantle",
    mantle: 'mantle',
    linea: 'linea',
  };



const fetchBalance =  () => {
    let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQY3kTGRY7pwfPRvVQ7XgwKrYpQg");
    fetch(`https://api.covalenthq.com/v1/${chain}-mainnet/address/${address}/balances_v2/?`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then(
        (data) =>{
            try{
                setBalance(data.data.items[0].pretty_quote);
                setBalance2(data.data.items[0].balance);
                console.log(data)
            }
            catch(e){
                console.log(`didnt receive data`);
            }
        } 
        )
    
    
}
const fetchBalance2 = () => {
    let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQY3kTGRY7pwfPRvVQ7XgwKrYpQg");
    fetch(`https://api.covalenthq.com/v1/${chain}-mainnet/address/${address}/portfolio_v2/?`, { method: 'GET', headers: headers })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let changeinprice = data.data.items[0].holdings[0].close.quote - data.data.items[0].holdings[1].close.quote;
        let percentinc_or_dec = ((changeinprice / data.data.items[0].holdings[1].close.quote) * 100);
  
        if (changeinprice > 0) {
          setChange("increament");
          setPercentchange(percentinc_or_dec);
        
          alert.success(`Congrats: Account balance up by ${percentinc_or_dec.toFixed(2)}% in the last 24 hours!!`);
        } else if (changeinprice < 0) {
          setChange("decreament");
          percentinc_or_dec = percentinc_or_dec * -1;
          setPercentchange(percentinc_or_dec);
            if (percentinc_or_dec > 0) {
                
                alert.error(`Alert: Account balance down by ${percentinc_or_dec.toFixed(2)}% in the last 24 hours!!`);
            }
            else {
                // playNotificationSound();
                
                alert.info("No change in price");
              }
        }
      });
  }
  

  return (
    <div className='background' style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <div className='card'>
        <div className='card2'>

        <h1 className='heading'>Token Balance Checker</h1>
      
      <div className='fragment' >

       <p className='label'>Chain:</p> 
        <select className='input'  value={chain} onChange={(e) => setChain(e.target.value)}>
          {Object.keys(chains).map((chainName) => (
              <option key={chainName} value={chainName}>
              {chainName}
            </option>
          ))}
        </select>
        </div>
      
      <br />

      <div className='fragment' >

        <p className='label'>Address:</p>
        
        <input className='input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      <br />
      </div>
      <div style={{display:"flex" , width:"450px",marginLeft:"20px",justifyContent:"space-around"}}>

      <button className='button' onClick={fetchBalance} >Fetch Balance</button>
      <button className='button' onClick={fetchBalance2} >Fetch % change</button>
      </div>
      <p>Native Token Balance: {balance} or {balance2} </p>
      
      <p> percent {change} in last 24 hours is: {percentchange} % </p>
        </div>

      
          </div>
    </div>
  );
};

export default TokenBalance;
