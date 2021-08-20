# React Table Lite

A lightweight easy to use and easily customizable React Component for rendering a table from JSON with minimal code.
##### <a href="https://react-azmat-components.web.app/#/react-table-lite" target="_blank">Click here for demo</a>

<img src="https://s8.gifyu.com/images/rtl-animated-1.gif" alt="react-table-lite-preview-1" />

### Features:

 - **Fully Customizable:**
    Style props and classes can be overridden easily to customize table.

 - **JSON data array:**
    Accepts data array and renders them in respective table headers.
    
 - **Sort data by header:**
    Accepts array of keys which matches with headers for displaying sorted table data.    

 - **Searchable:**
    Data can be searched by providing comma separated search strings. Specify columns to be searched using 'searchBy' props. 

 - **Data limit:**
    Limit data rows for better performance.

 - **Download Table Data:**
    Use ‘download’ prop to enable a button that exports table data as .csv, button is also customizable, default is false.

- **Row Actions:**
    Use ‘showAction’ prop to append a column in the end of the table which will enable user to use row operations (CRUD) like view, edit and delete, default is false.

- **Custom Actions:**
    If ‘showAction’ prop is enabled, use ‘actionTypes’ to provide which actions to display. If not provided, will display all actions.

- **Actions Callback:**
    If ‘showAction’ prop is enabled, use ‘onRowDelete’,‘onRowEdit’ and ‘onRowView’ to provide respective action callbacks. The last two args of callback will return event and row Object.

- **Customize no data message:**
    Use ‘noDataMessage’ prop to provide empty data message.

- **Multi Select:**
    Use ‘enableMultiSelect’ prop to enable checkboxes for each row. Provide ‘defaultCheckedKey’ for selected rows in data json object.
    Provide ‘disableCheckedKey’ for non selectable rows in data json object.

#### `New!`

- **Custom Search:**
    Create your own search elements and give the id to ‘searchInputID’ and/or ‘searchFormID’ prop for same functionality like the built-in search.

- **Custom Download:**
    Create your own Download button and give the id to ‘downloadButtonID’ prop for same functionality like the built-in download.

- **Custom Headers Labels:**
    Use ‘customHeaders’ prop to give custom text in table header.

- **Highlight Selected:**
    Checked data can now be highlighted and customized with ‘selectedClassName’ prop.

- **Custom JSX for Action buttons:**
    Action buttons are now fully customizable with ‘renderView’, ‘renderEdit’ and ‘renderDelete’ props.

- **Custom Download listener:**
    Use ‘onDownload’ props to implement custom download, built-in download is usable too if the function returns true.

- **Sort Listener:**
    Use ‘onSort’ props to receive the updated data state after sorting.

- **Pagination:**
    Use ‘showPagination’ prop to enable pagination with custom range. Can be customized by css.

### Preview:  
 
*Plain View*
<img src="https://qnae0a.dm.files.1drv.com/y4m5WNQquJC22nigTy5CKrAPRBbVhiFc3d5Re9nqhBFKeK7p9EYPJq-hKe5Z5ESDjAna6r7sbRqBHqMqCK7L03aD7Hnjhj_SdzglIlqzGYDUAe12hC1uHlrQQVtqjhx1Hs0vO7qNAHBSDwFsC3e9vtPVhCzvWrpKNs9imS3h7cN7n2kQTvA6PDWn-adtDeRrrUzqxsh4zy9FynmPjgAFx0EYQ?width=1221&height=311&cropmode=none" alt="react-table-lite-preview-2" />
*With Actions Enabled*

<img src="https://qnc5ra.dm.files.1drv.com/y4m2rcN5UDu-DHJryQ3IwphGw1THRoOvO7kwe2a3SO_pt109ANgBt1Vh89iirlj39cY2ZwtmLs848BzfaK1ohf2kkhULQyGJdvVZOzScBiKlRB5vS8L0NpaB35me9CRXFL5RCy3jEREUbzaVBRHhsxsSGXaUG8sc4SHcWjY73TWXwyuBZ3tmD8wfRk7st2LEAweQWrNAwlUYQGvzcldjnCm3w?width=1196&height=319&cropmode=none" alt="react-table-lite-preview-3" />

*Custom Styling and Actions*

<img src="https://1hunqa.dm.files.1drv.com/y4mBTaCZHenK-IEH4nut36JXKm0lZlH_IFLXC1ItJ-DnbboszwoEQRfgrRo--0qO51WaU6ulpQPQ9agbuPbhtTGEMVkQn5ngHphLYdX6bi4Hxx4QtPk377RtAu8wMpLlf_Qaa4465ZYBQ1-bihNPh9O5hWP2muTdrcwxrhzzORmPg4-CXMHY-OI7MvPJNa9w6Xm__tRyY5nlC9EJF3rh2rAVQ?width=1258&height=339&cropmode=none" alt="react-table-lite-preview-4" />

### Example:
```js  
import React from 'react';
import Table from "react-table-lite";

function UserData(props){
     let Users = [
      {
        id: 1,
        name: "John Doe",
        age: "25",
        email: "JohnDoe@gmail.com",
        selected: true,
        selectDisabled: false,
      },
      {
        id: 2,
        name: "Kazuki Yashiro",
        age: "35",
        email: "Y_Kazuki@gmail.com",
        selected: true,
        selectDisabled: false,
      },
      {
        id: 3,
        name: "Eddie Memon",
        age: "22",
        email: "Eddie254@gmail.com",
        selected: false,
        selectDisabled: false,
      },
      {
        id: 4,
        name: "Barood Khan",
        age: "45",
        email: "BK5454@gmail.com",
        selected: false,
        selectDisabled: true,
      },
    ];
      return(
        <Table
           data = {Users}		
           // Array of JSONObjects(required)
           header = {["id","name","age","email"]}  
           // Headers should be same as data JSON Object's keys (required)
           sortBy = {["name", "age"]}
           // keys for sorting should be present in header array
           customHeaders={{"name":"employee"}}
           // custom header label in JSON        
           searchable={true}
           // Enable table search field
           searchBy={["name", "email"]}
           // keys for sorting should be present in header array
           download = {true}
           // Pass true to enable download button 
           // note: If multiselect is enabled,
           // only checked rows will be downloaded
           downloadButtonID="my-download"
           // id of download button
           searchInputID={"my-search"}
           // id of input element used for search
           searchFormID={"my-form"}
           // id of form element used for search
           // with reset and search button feature
           fileName = {"Table_Data"}
           // Default name of downloaded csv file
           noDataMessage={"my custom no data"}
           // Custom no data string.            
           limit = {10}
           // No of rows to display at a time
           containerStyle = {}
           // Customize table container style           
           headerStyle = {}
           // Customize table header style
           rowStyle = {}
           // Customize table row style
           dataStyle = {}
           // Customize table data cell style
           selectedClassName={"my-selected-class"}
           // Assign className to checked row
           showActions = {true}
           // Enable Row Operation
           showPagination={true}
           // Enable Pagination
           totalPages={10} 
           // Total Pages of data
           currentPage={1}
           // Current Page number
           range={5}
           // range for show page number 
           actionTypes={["edit","delete","view"]} 
           // Type of Row Operation (case insensitive)
           enableMultiSelect  = {true}
           // Enable Multi-select
           defaultCheckedKey={"selected"}
           // Key present in data to mark row checked
           disableCheckedKey={"selectDisabled"}
           // Key present in data to make row checkbox disabled
           renderView={{
             "render":
               <button 
                 style={{"background": "red", "color": "white"}} 
                 className={"my-view"}
               >
                 view
               </button>
             ,
             "className": "my-view" 
           }}
           // Custom JSX and className in JSON Object
           // to render custom 'view' action button
           // className required for onClick event binding  
           renderEdit={{
             "render":
               <button 
                 style={{"background": "red", "color": "white"}} 
                 className={"my-edit"}
               >
                 edit
               </button>
             ,
             "className": "my-edit" 
           }}
           // Custom JSX and className in JSON Object
           // to render custom 'edit' action button
           // className required for onClick event binding 
           renderDelete={{
             "render":
               <button 
                 style={{"background": "red", "color": "white"}} 
                 className={"my-delete"}
               >
                 delete
               </button>
             ,
             "className": "my-delete" 
           }}
           // Custom JSX and className in JSON Object
           // to render custom 'delete' action button
           // className required for onClick event binding 
           onRowSelect={(args, event, row)=>{
            // 'row' returns row object 
            // any arguments passed will be before 'event' and 'row'
           }}
           onAllRowSelect={(args, event, allrows)=>{
            // 'allrows' returns JSON objects of all rows of table
            // any arguments passed will be before 'event' and 'allrows'
           }}
           onRowDelete={(args, event, row)=>{
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowEdit={(args, event, row)=>{
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowView={(args, event, row)=>{
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
          onDownload={()=>{
            // return true to use built-in download functionality
            return true;
          }}
          onSort={(data)=>{
            // 'data' returns new sorted data
          }}
          onPaginate={(currentPage)=>{
           // 'currentPage' returns updated current page;
          }}
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
customHeaders | JSON | key  is from header props, value is string that to be replaced |
searchable  | Boolean | Pass ‘true’ to enable search field |
searchBy    | Array | Array of string which matches the headers for searching data in table body |
download    | Boolean | Pass ‘true’ to enable download csv button <br/> *note: If multiselect is enabled, <br/> only checked rows will be downloaded* |
fileName    | String | String used as default filename for csv files when downloading 
downloadButtonID    | String | id of button element 
searchInputID    | String | id of input element for search 
searchFormID    | String | id of form element used for search with reset and search button feature
noDataMessage   | String | String used for 'No data' message
limit       | Integer | Limit number of rows to display at a time
containerStyle | Style  | Style object for parent container
headerStyle | Style  | Style object for table header
rowStyle    | Style  | Style object for table rows
dataStyle   | Style  | Style object for table cells
selectedClassName   | String  | className for checked rows
showActions | Boolean | Enable to show actions column
showPagination | Boolean | Enable to show pagination
totalPages | Number | Total Pages of data
currentPage | Number | Current Page number
range | Number |range for show page number 
actionTypes | Array | Name of action to enable and show array of string
enableMultiSelect | Boolean | Enable to show multi select
defaultCheckedKey | String | Key in JSON data object to 'check' the row.
disableCheckedKey | String | Key in JSON data object to disable selection of that row.
renderView | JSON | Custom JSX and className in JSON Object to render custom 'view' action button className required for onClick event binding.
renderEdit | JSON | Custom JSX and className in JSON Object to render custom 'edit' action button className required for onClick event binding.
renderDelete | JSON | Custom JSX and className in JSON Object to render custom 'delete' action button className required for onClick event binding.
onRowDelete | callback | Callback function on row delete
onRowEdit   | callback | Callback function on row edit
onRowView   | callback | Callback function on row view
onRowSelect    | callback | Callback function on row select
onAllRowSelect | callback | Callback function on all row select
onDownload | callback | Callback function for download, return true for built-in download functionality.
onSort | callback | Callback function after sort.
onPaginate | callback | Callback function for pagination

### CSS Classes:

Default CSS classes for easy css customization.

ClassName | Description
---- | ----
react-table-lite-container | For parent container. 
react-table-lite-header    | For table header. 
rtl-table-search-form      | For search field. 
rtl-table-download-btn-css | For CSV download button. 
rtl-action-btn-container   | For action button container.
rtl-action-btn-delete-btn  | For delete action button. 
rtl-action-btn-edit-btn    | For edit action button.
rtl-action-btn-view-btn    | For view action button.
rtl-pagination-container   | For pagination container.
 

### Support:  
For support contact: adnanali17official@gmail.com, daniyal_09.2005@hotmail.com
