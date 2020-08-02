# React Table Lite

A lightweight easy to use and easily customizable React Component for rendering a Table..

### Features

 - **Fully Customizable:**
    Style props and classes can be overridden easily to customize table.

 - **JSON data array:**
    Accepts data array and renders them in respective table headers.
    
 - **Sort data by header:**
    Accepts array of keys which matches with headers for displaying sorted table data.    

 - **Download Table Data:**
    Use ‘download’ prop to enable a button that exports table data as .csv, button is also customizable, default is false.

  ### Preview:  
 <img src="https://github.com/adnanali17official/react-table-lite/blob/master/preview.png" alt="react-table-lite-preview" />

 ### Example:
```js  
    import React from 'react';
    import Table from "react-table-lite";
    
    function UserData(props){
    	let Users = 
			[
				{id:1 , name:"John Doe", age:"25", email:"JohnDoe@gmail.com"},
				{id:2 , name:"Kazuki Yashiro", age:"35", email:"Y_Kazuki@gmail.com"},
				{id:3 , name:"Eddie Memon", age:"22", email:"Eddie254@gmail.com"},
				{id:4 , name:"Barood Khan", age:"45", email:"BK5454@gmail.com"},
			];
	
		return(
			<Table
				data = {Users}		
				//Array of JSONObjects(required)
				header = {["id","name","age","email"]}  
				// Headers should be same as data JSON(required)
				sortBy = {["name", "age"]}
				// keys for sorting should be present in header array
				download = {true}
				//Downloadable data 
				limit = {10}
				//No of rows to display at a time
				headerStyle = {}
				//Customize table header style
				containerStyle = {}
				//Customize table container style
				rowStyle = {}
				//Customize table row style
				dataStyle = {}
				//Customize table data cell style
			/>
		)
	}
```
**Support**:  adnanali17official@gmail.com, daniyal_09.2005@hotmail.com