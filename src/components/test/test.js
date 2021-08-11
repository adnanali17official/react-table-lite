import React, {useState, useEffect} from 'react';
import Table from '../../../dist/table.esm';
function TestTable (){
	const [data, _dataHandler] = useState([]);
	const [limit, _limit] = useState(10);
	const [download, _download] = useState(true);
	const [searchable, _searchable] = useState(true);
	const [style, _style] = useState(false);
	const [actions, _actions] = useState(true);
	const [filename, _filename] = useState("");
	const [multiSelect, _multiSelect] = useState(true);
	const TestDataEmployees = [
		{id:1 , name:"John Doe", age:"25", email:"JohnDoe@gmail.com"},
		{id:2 , name:"Kazuki Yashiro", age:"35", email:"Y_Kazuki@gmail.com"},
		{id:3 , name:"Eddie Memon", age:"22", email:"Eddie254@gmail.com"},
		{id:4 , name:"Barood Khan", age:"45", email:"BK5454@gmail.com"},
		{id:5 , name:"Minh Han", age:"30", email:"Minh@gmail.com"},
	  ];
	useEffect (() =>{
		const url = "https://restcountries.eu/rest/v2/all";
		fetch(url,{method:"GET"})
			.then(response => response.json())
			.then((result)=>{
				 _dataHandler(result);
				// let x = Array.from(document.getElementsByTagName("td"));
				// x.forEach((element)=>{
				// element.addEventListener("click", function(element){ console.log(element.target); })
				// });
				}
			)
  },[])
  
  function onRowSelect(e, row) {
    // console.log("e",e);
    // console.log("row", row);
    
    let newData = data;
    newData.forEach((obj, index) => {
      if (row.id === obj.id) {
        newData[index].checked = e.target.checked;
      }
    });
    _dataHandler( newData );
  }

  function onAllRowSelect(e, data) {
    // console.log("e",e);
    // console.log("data",data);
    // let newData = this.state.data;
    // newData.forEach((obj, index) => {
    //   if (!newData[index].disabled) newData[index].checked = e.target.checked;
    // });
    // this.setState({ data: newData });
  }

	return(
		<div>
			<div style={{display:"flex"}}>
				<button onClick={()=>_download(!download)}> Enable/Disable Download </button>
				<button onClick={()=>_searchable(!searchable)}> Enable/Disable search </button>
				<button onClick={()=>_style(!style)}> Enable/Disable style </button>
				<button onClick={()=>_actions(!actions)}> Enable/Disable actions </button>
				<button onClick={()=>_multiSelect(!multiSelect)}> Enable/Disable Multi Select </button>
				<input 
					type="number" 
					value={limit}
					placeholder="set limit" 
					onChange={(e)=>_limit(e.target.value)}
				/>		
				<input 
					type="text" 
					value={filename}
					placeholder="filename" 
					onChange={(e)=>_filename(e.target.value)}
				/>
			</div>	 
			<p> { " " } </p>
			<Table
				//data={data}
				//header={["name", "capital", "region", "population", "subregion"]}
				data = {data}
				header={["id", "name", "age", "email"]}
				limit={limit}		
				download={download}	
				searchable={searchable}	
				fileName={filename}
				searchBy={["name", "capital"]}	
				showActions = {actions}
				//Enable Row Operation
				actionTypes={["edit","delete","view"]}
				sortBy={["population","name", "age"]}		
				headerStyle={style?{color:"white",background:"red"}:{}}
				rowStyle={style?{color:"black",background: 'rgb(230,200,200)'}:{}}
				enableMultiSelect={multiSelect}
				defaultCheckedKey={"checked"}
				disableCheckedKey={"disabled"}
				onRowSelect={(e,row)=>onRowSelect(e,row)}
				onAllRowSelect={()=>onAllRowSelect()}		
			/>			
		</div>
	)
}
export default TestTable;