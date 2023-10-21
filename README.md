<!-- # React Table Lite -->
<p align="center">
   <img style="width:350px;" src="https://s9.gifyu.com/images/rtl-logo.png" alt="logo"/>
</p>



A lightweight easy to use and easily customizable React Component for rendering a table from JSON with minimal code.
##### <a href="https://react-azmat-components.web.app/#/react-table-lite" target="_blank">Click here for demo</a>

<!-- <img src="https://s8.gifyu.com/images/rtl-animated-1.gif" alt="react-table-lite-preview-1" /> -->
<img src="https://s6.gifyu.com/images/S6YdC.gif" alt="react-table-lite-preview-1" />

### Features:

 - **Fully Customizable:**
    Style props and CSS classes can be added to easily customize the table.

 - **JSON data array:**
    Accepts data array and renders them in respective table headers.
    
 - **Sort data by header:**
    Accepts array of keys which is a subset of headers for displaying sorted table data.    

 - **Searchable:**
    Data can be searched by enabling ‘searchable’ prop and providing comma separated search strings. Specify columns to be searched using 'searchBy' props. 

 - **Download Table Data:**
    Use ‘downloadable’ prop to enable a button that exports table data as .csv, button is also customizable, default is false.

- **Row Actions:**
    Use ‘showAction’ prop to append a column in the end of the table which will enable user to use row operations (CRUD) like view, edit and delete, default is false.

- **Custom Actions:**
    If ‘showAction’ prop is enabled, use ‘actionTypes’ to provide which actions to display. If not provided, will display all actions.

- **Actions Callback:**
    If ‘showAction’ prop is enabled, use ‘onRowDelete’,‘onRowEdit’ and ‘onRowView’ to provide respective action callbacks. The last two args of callback will return event and row Object.

- **Customize no data message:**
    Use ‘noDataMessage’ prop to provide empty data message.

- **Multi Select:**
    Use ‘enableMultiSelect’ prop to enable checkboxes for each row. Provide ‘checkedKey’ for selected rows in data json object.
    Provide ‘disableCheckedKey’ for non selectable rows in data json object.

- **Custom Render Cell:**
    Render custom element in cells for any header by passing a render function wrapped in a JSON object and passed using ‘customRenderCell’ prop. 

- **Custom Render Action Buttons:**
    Render custom element for action buttons by passing a render function wrapped in a JSON object with keys edit, view, delete and passed using ‘customRenderActions’ prop. 

- **Custom Search:**
    Create your own search form and pass it's ref using ‘searchFormRef’ prop for a same functionality like the built-in search.

- **Custom Download:**
    Create your own download button and pass it's ref using ‘downloadCsvButtonRef’ prop for a same functionality like the built-in download.

- **Custom Headers Labels:**
    Use ‘customHeaders’ prop to give custom text in table header.

- **Custom Download listener:**
    Use ‘onDownload’ props to attach a callback function on built-in csv download.

- **Sort Listener:**
    Use ‘onSort’ props to receive the updated data state after sorting.

- **Pagination:**
    Use ‘showPagination’ prop to enable pagination with custom range using ‘showNumberofPages’ prop. Pagination also requires ‘totalPages’, ‘currentPage’ and ‘onPaginate’ props.

- **Per Page:**
    Use ‘showPerpageLimitOptions’ prop to enable per page drop down. Pass callback function in ‘onPerPageLimitSelect’ prop and current per page limit in ‘currentPerPageLimit’.

### Preview:  
 
*Plain View*
<img src="https://s6.gifyu.com/images/S6Ydi.png" alt="react-table-lite-preview-2" />

*With Actions Enabled*
<img src="https://s6.gifyu.com/images/S6Yd0.png" alt="react-table-lite-preview-3" />

*Custom Styling and Actions*
<img src="https://s6.gifyu.com/images/S6Ydj.png" alt="react-table-lite-preview-4" />

*Custom Render Cell and Actions*
<img src="https://s6.gifyu.com/images/S6AKs.png" alt="react-table-lite-preview-5" />

### Example:
```js  
import React from 'react';
import Table from "react-table-lite";

function UserData(props){
     let Users = [
      {
        id: 1,
        name: "John Doe",
        department: "Finance",        
        selected: true,
        email: "john_doe@somedomain.com",
      },
      {
        id: 2,
        name: "Kazuki Yashiro",
        department: "Finance",        
        email: "y_kazuki@somedomain.com"
      },
      {
        id: 3,
        name: "Eddie Memon",
        department: "Customer Support",        
        email: "eddie254@somedomain.com"
      },
      {
        id: 4,
        name: "Ashiq Nuri",
        department: "Human Resource",
        email: "an452@somedomain.com"
      }
    ];
      return(
        <Table
           data = {Users}		
           // Array of JSONObjects(required)
           headers = {["id","name","department","email"]}  
           // Headers should be same as data JSON Object's keys (required)
           sortBy = {["name", "department"]}
           // keys for sorting should be present in headers array
           customHeaders={{"name":"employee"}}
           // custom header label in JSON        
           searchable={true}
           // Enable table search field
           searchBy={["name", "email"]}
           // keys for sorting should be present in headers array
           downloadable = {true}
           // Pass true to enable download button
           csvKeys={["name","department","email"]} 
           // The CSV file will include these fields only
           downloadCsvButtonRef={customDownloadButtonRef}
           // Here customDownloadButtonRef is a ref of custom button element
           searchFormRef={customSearchFormRef}
           // Here customSearchFormRef is a ref of custom form element
           fileName = {"Table_Data"}
           // Default name of downloaded csv file
           noDataMessage={"my custom no data"}
           // Custom no data string.            
           showActions = {true}
           // Enable Row Operation
           showPagination={true}
           // Enable Pagination
           totalPages={10} 
           // Total Pages of data
           currentPage={1}
           // Current Page number
           showNumberofPages={5}
           // Range for show page number 
           showPerpageLimitOptions={true}
           // Show selection to change per page item limit
           currentPerPageLimit={10}
           // Set current per page item limit
           actionTypes={["edit","delete","view"]} 
           // Type of Row Operation (case insensitive)
           showMultiSelect  = {true}
           // Enable Multi-select
           checkedKey={"selected"}
           // Key present in data to mark row checked
           disableCheckedKey={"selectDisabled"}
           // Key present in data to make row checkbox disabled
           perPageLimitOptions={[10, 30, 50, 100 ]}
           // Array of numbers for options in per page limit selection
           containerStyle = {{}}
           // Customize table container style           
           tableStyle = {{}}
           // Customize table style
           headerStyle = {{}}
           // Customize table header style
           rowStyle = {{}}
           // Customize table row style
           cellStyle = {{}}
           // Customize table data cell style
           customRenderCell={{
              name: (row) => (
                <a href={'/employee-profile/' + row.id} className='custom-class'> {row.name} </a>
              ),
              department: (row) => (
                <span className='custom-class'> {row.department} </span>
              )
           }}
           // Custom render function in JSON Object for table cells
           // it will render any custom element in place of default value of cell under specified column
           // in this case an <a> element will be rendered at each row in name column
           // and a <span> element will be rendered at each row in department column 
           customRenderActions = {{
              view: (row) => (
                <button onClick={event => customViewRow(event, row)}> view </button>
              ),
              edit: (row) => (
                <button onClick={event => customEditRow(event, row)}> Edit </button>
              ),
              delete: (row) => (
                <button onClick={event => customDeleteRow(event, row)}> Delete </button>
              ),
           }}
           // Custom render function in JSON Object for action buttons
           // it will render any custom element in place of view, edit and delete action button
           onSort={(data)=>{
            console.log(data);  
             // 'data' returns new sorted data
           }}
           onRowSelect={(args, event, row)=>{
            console.log(args, event, row);
            // 'row' returns row object 
            // any arguments passed will be before 'event' and 'row'
           }}
           onAllRowSelect={(args, event, allrows)=>{
            // 'allrows' returns JSON objects of all rows of table
            // any arguments passed will be before 'event' and 'allrows'
           }}
           onRowDelete={(args, event, row)=>{
            console.log(args, event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowEdit={(args, event, row)=>{
            console.log(args, event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowView={(args, event, row)=>{
            console.log(args, event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onDownload={()=>{
             // Callback run after download csv button is clicked
           }}
           onPaginate={(args, event, currentPage)=>{
            // 'currentPage' returns updated current page;
            // any arguments passed will be before 'event' and 'currentPage'
           }}
           onPerPageLimitSelect={(args, event, limit) => {
            console.log(args, event, limit);
            // 'limit' returns the selected item limit from the menu;
            // any arguments passed will be before 'event' and 'limit'
           }}
        />
      );
  }
```
### Props:
Prop | Type | Description
---- | ---- | ----
headers      | Array | Array of string will be rendered as table headers (required)|
data        | Array | Array of JSON objects to be rendered in table, keys should match with table headers (required)|
actionTypes | Array | Array of string containing action name (view, edit, delete) to enable and show action button
sortBy      | Array | Array of string which matches the headers for sorting data in table body |
searchBy    | Array | Array of string which matches the headers for searching data in table body |
csvKeys   | Array | Array of string which matches the headers for including in csv file for download |
perPageLimitOptions | Array | Array of numbers for options in per page limit selection |
customHeaders | JSON | Key is from headers props, value is string that to be replaced |
customRenderCell | JSON | Key is from headers prop, value is a render function which will be rendered under the header in each row |
customRenderActions | JSON | Key is either 'view', 'edit' or 'delete', value is a render function which will be rendered under the actions column in each row |
searchFormRef | Ref | Ref of a custom form element to attach table's default search functionality |
downloadCsvButtonRef | Ref | Ref of a custom button element to attach table's default dwonload csv functionality |
noDataMessage   | String | String used for 'No data' message
fileName    | String | String used as default filename for csv files when downloading 
checkedKey | String | Key in JSON data object to 'check' the row
disableCheckedKey | String | Key in JSON data object to disable selection of that row
totalPages | Number | Total Pages of data
currentPage | Number | Current Page number
currentPerPageLimit | Number | Current value of per page limit
showNumberofPages | Number |Range for show page number 
showActions | Boolean | Enable to show actions column
searchable  | Boolean | Pass ‘true’ to enable search field |
downloadable    | Boolean | Pass ‘true’ to enable download csv button
showMultiSelect | Boolean | Enable to show multi select
showPagination | Boolean | Enable to show pagination
showPerpageLimitOptions | Boolean | Enable to show per page limit selection
onSort | Callback | Callback function on sort
onRowSelect    | Callback | Callback function on row select
onAllRowSelect | Callback | Callback function on all row select
onRowView   | Callback | Callback function on row view
onRowEdit   | Callback | Callback function on row edit
onRowDelete | Callback | Callback function on row delete
onPaginate | Callback | Callback function for pagination
onDownload | Callback | Callback function for download
onPerPageLimitSelect | Callback | Callback function for per page limit select
containerClass | String | CSS class for table's container
tableClass | String | CSS class for table
headerClass | String | CSS class for table's th
rowClass  | String | CSS class for table's tr
cellClass | String | CSS class for table's td
checkboxClass | String | CSS class for multiselect checkbox
perpageLimitOptionClass | String | CSS class for per page limit selection
actionButtonContainerClass | String | CSS class for action button container
actionButtonClass | String | CSS class for view, edit and delete action buttons
actionButtonIconClass | String | CSS class for action button icons
searchFormClass | String | CSS class for default search form
searchFormInputClass | String | CSS class for default search form input
searchFormButtonClass | String | CSS class for default search form button
searchFormButtonIconClass | String | CSS class for default search form button icon
downloadCsvButtonClass | String | CSS class for default csv download button
downloadCsvButtonIconClass | String | CSS class for default csv download button icon
paginationContainerClass | String | CSS class for pagination container
paginationIconClass | String | CSS class for pagination left and right arrow icon
paginationItemClass | String | CSS class for pagination numbers
paginationActiveItemClass | String | CSS class for active page number
containerStyle | Style  | Style object for parent container
tableStyle | Style  | Style object for table
headerStyle | Style  | Style object for table header
rowStyle    | Style  | Style object for table rows
cellStyle   | Style  | Style object for table cells


### Support:  
For support contact: daniyal_09.2005@hotmail.com, adnanali17official@gmail.com
