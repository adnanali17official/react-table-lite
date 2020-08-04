# React Table Lite

A lightweight easy to use and easily customizable React Component for rendering a Table.

### Features:

 - **Fully Customizable:**
    Style props and classes can be overridden easily to customize table.

 - **JSON data array:**
    Accepts data array and renders them in respective table headers.
    
 - **Sort data by header:**
    Accepts array of keys which matches with headers for displaying sorted table data.    

 - **Download Table Data:**
    Use ‘download’ prop to enable a button that exports table data as .csv, button is also customizable, default is false.

### Preview:  

 <img src="https://1hvwng.dm.files.1drv.com/y4mKkLste69u9HLEPbqBxtQiSohJoLUeaOFHSqACla5g2p89YcZ1iRhIuO2Rtxcg1G27Cjg9xk3trgYpNwHvPul3683kDwtSFFb-rxEChStH-Q97DmH5KaJXEP-CWFkbnVzKNAzbXWPX8OzZ18Y4YBRmmRjxXtA_ggQHnh1jMXBfNZZLUsIcwIr06YnIveG_GOHN3bmvPm8N16eJFxhC_VICw?width=1439&height=429&cropmode=none" alt="react-table-lite-preview-1"/>

 <img src="https://1hvd5q.dm.files.1drv.com/y4mhsGw04CX8hM6U-ycjujPo-ynxHPAbYkKXVGPigUJB2p1pjEjsndkwa1_CTk1xWBNUQosSVmTRBusy-D4rkkqOtAmi-hlkB42E5pD7reDyAdS_xK2tSMh779zbNxAXy2ItG1pWA-2LiON-89-f4DdyhwfbdS3tW0biIO9f_xXu_iYacUy3gvhr8MA72aLiclqxUP6DQ7H65AvSYylUGzfDA?width=1439&height=344&cropmode=none" alt="react-table-lite-preview-2" />

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
           searchable={true}
           //Enable table search field
           searchBy={["name", "email"]}
           // keys for sorting should be present in header array
           download = {true}
           //Downloadable data 
           fileName = {"Table_Data"}
           //Default name of downloaded csv file            
           limit = {10}
           //No of rows to display at a time
           containerStyle = {}
           //Customize table container style           
           headerStyle = {}
           //Customize table header style
           rowStyle = {}
           //Customize table row style
           dataStyle = {}
           //Customize table data cell style
        />
      )
  }
```
### Props:
Prop | Type | Description
---- | ---- | ----
header      | Array | Array of string will be rendered as table headers (required)|
data        | Array | Array of JSON objects to be rendered in table, keys should match with table headers (required)|
sortBy      | Array | Array of string which matches the headers for sorting data in table body |
searchable  | Boolean | Pass ‘true’ to enable search field |
searchBy    | Array | Array of string which matches the headers for searching data in table body |
download    | Boolean | Pass ‘true’ to enable download csv button |
fileName    | String | String used as default filename for csv files when downloading 
limit       | Integer | Limit number of rows to display at a time
containerStyle | Style  | Style object for parent container
headerStyle | Style  | Style object for table header
rowStyle    | Style  | Style object for table rows
dataStyle   | Style  | Style object for table cells
 

### Support:  
For support contact: adnanali17official@gmail.com, daniyal_09.2005@hotmail.com
