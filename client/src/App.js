import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const promise = new Promise(async (resolve, reject) => {
        
        const response = await fetch('http://127.0.0.1:3002/')
        const data = response.json()
          resolve(data);
        });
  
      promise.then((d) => {
        setItems(d);
      });
  }
  fetchData()
}, [])


  return (
    <div className="App">
      <table className="table table-success table-striped">
  <thead>
    <tr>
      <th scope="col">Cognizant ID</th>
      <th scope="col">Name</th>
      <th scope="col">Cognizant mail</th>
      <th scope="col">NBCU ID</th>
      <th scope="col">Manager</th>
      <th scope="col">NBCU mail</th>
    </tr>
  </thead>
  <tbody>
    {
        items.map((d)=>(
          <tr key={d.cognizant_ID}>
          <td>{d.cognizant_ID}</td>
          <td>{d.name}</td>
          <td>{d.cognizant_email}</td>
          <td>{d.NBCU_ID}</td>
          <td>{d.manager}</td>
          <td>{d.NBCU_mail}</td>
          </tr>
        ))
    }
    
  </tbody>
</table>
    </div>
  );
}

export default App;
