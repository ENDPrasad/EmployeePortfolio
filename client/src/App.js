import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])

  function searchByName(search){
    var searchedResult = []
    items.forEach((d)=>{
      console.log(d.name.toLowerCase())
      var name = d.name.toLowerCase()
      console.log(search)
      if(name.includes(search.toString().toLowerCase()))
        searchedResult.push(d)
    })
    console.log(searchedResult)
    if(searchedResult.length > 0)
      setSearchedItems(searchedResult)
    else
      setSearchedItems([{}])
  }

  function searchByID(search){
    var searchedResult = []
    items.forEach((d)=>{
      console.log(d.cognizant_ID)
      console.log(search)
      if(d.cognizant_ID.toString().includes(search))
        searchedResult.push(d)
    })
    console.log(searchedResult)
    if(searchedResult.length > 0)
      setSearchedItems(searchedResult)
    else
      setSearchedItems([{}])
  }

  function getSearchedResults(search){
    if(isNaN(search)){
      searchByName(search)
      
    }else{
      searchByID(search)   
    }
    
  }

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
      <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand">Employee Details Portal</a>
    <form className="d-flex">
    <div className="form-outline w-100">
    <input id="input1" type="text" className="form-control me-5" placeholder="Search by name or Cognizant ID" aria-label="name" aria-describedby="button-addon2" onChange={(e)=>{
    getSearchedResults(e.target.value);
  }}/>
  </div>
    </form>
  </div>
</nav>
      {/* <div className="input-group mb-3">
  
</div> */}
      <table className="table table-striped table-hover">
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
        searchedItems.length == 0 ? items.map((d)=>(
          <tr key={d.cognizant_ID}>
          <td>{d.cognizant_ID}</td>
          <td>{d.name}</td>
          <td>{d.cognizant_email}</td>
          <td>{d.NBCU_ID}</td>
          <td>{d.manager}</td>
          <td>{d.NBCU_mail}</td>
          </tr>
        )): searchedItems.map((d)=>(
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
