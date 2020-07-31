React Table Lite:

A lightweight easy to use and easily customizable React Component for rendering a Table.

Features:

1) Fully Customizable:
    Style props and classes can be overridden easily.

2) JSON data array:
    Accepts data array and renders them in respective headers.

3) Download Table Data:
    use 'download = {true}' prop to get a button that exports data as .csv, button is also customizable, default is false.

support:
    adnanali17official@gmail.com



Example:


import Table from "react-table-lite";

let Users = 
    [
        {id:1 , name:"John Doe", age:"25" email:"JohnDoe@gmail.com"},
        {id:2 , name:"Suzumura Kenichi", age:"35" email:"Kenichi_S@gmail.com"},
        {id:3 , name:"Eddie Memon", age:"22" email:"Eddie254@gmail.com"},
        {id:4 , name:"Barood Khan", age:"45" email:"BK5454@gmail.com"},
	];
	
	render(){
		return(
			<Table
				data = {Users}							//Array of JSON Objects (required)
				header = {["id","name","age","email"]}  //Headers should be same as data JSON(required)
				download = {true}						//Downloadable data 
				limit = {10}                          	//No of rows to display at a time
				headerStyle = {}						//Customize table header style
				containerStyle = {}						//Customize table container style
				rowStyle = {}							//Customize table row style
				dataStyle = {}							//Customize table data cell style
			/>
		)
	}
