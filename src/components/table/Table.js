import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import "./Table.css";

import { export_table_to_csv } from './../../script/download_csv';


class Table extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      data:[],
      sortParameters : [],
      sortKeys : [],
      searchKeys: [],
      customHeaders:{},
      fileName: "table",
      searchString: "",
      appliedSearch: false,
      enableMultiSelect:false
	  };
  }

  componentDidMount = () => {
    this.getSortParameters();
    this.getSearchParameters();
    this.getDownloadableFileName();
    this.getTableData();    
    this.checkRequiredProps();
    this.getMultiSelectProps();
    this.getCustomHeadersProps();
  }
  
  componentDidUpdate = (prevProps,prevState) => {
    if(prevProps !== this.props){
      this.getSortParameters();
      this.getSearchParameters();
      this.getDownloadableFileName();
      this.getTableData();
      this.checkRequiredProps(); 
      this.getMultiSelectProps();  
      this.getCustomHeadersProps(); 
      this._initCustomDownloadListener(prevProps.downloadButtonID);
      this._initCustomSearchListener(prevProps); 
      this._initActionButtonListener(); 
    }
  }

  checkRequiredProps = () => {
    if(this.props.header === undefined)
     console.warn("'header' is a required prop. For more details \n https://www.npmjs.com/package/react-table-lite");
    
    if(this.props.data === undefined)
     console.warn("'data' is a required prop. For more details \n https://www.npmjs.com/package/react-table-lite");

  }

  _downloadData = () => {
    let onDownload = this.props.onDownload === undefined ? ()=>{ return true; } : this.props.onDownload;
    if(onDownload()){
      let downloadbleData = document.createElement('table');    
      downloadbleData.innerHTML = ReactDOMServer.renderToStaticMarkup(this.TableHeader());
      downloadbleData.innerHTML += ReactDOMServer.renderToStaticMarkup(this.TableData());      
      export_table_to_csv(downloadbleData, this.state.fileName+".csv", this.state.enableMultiSelect);
    }
  }

  _initCustomDownloadListener = (prevID) => {
    if(Boolean(this.props.downloadButtonID)){
      let customDownloadButton = document.getElementById(this.props.downloadButtonID);
      if(customDownloadButton){
        if(prevID !== this.props.downloadButtonID){
          let prevCustomDownloadButton = document.getElementById(prevID);
          if(prevCustomDownloadButton){
            prevCustomDownloadButton.removeEventListener("click",this._downloadData);
          }
        }
        customDownloadButton.addEventListener("click",this._downloadData);
      }
    }
  } 
  
  _initCustomSearchListener = (prevProps) => {
    let { prevSearchInputID, prevSearchFormID } = prevProps;
    if(Boolean(this.props.searchInputID)){
      let customSearchInput = document.getElementById(this.props.searchInputID);
      if(customSearchInput){
        if(prevSearchInputID !== this.props.searchInputID){
          let prevCustomSearchInput = document.getElementById(prevSearchInputID);
          if(prevCustomSearchInput){
            prevCustomSearchInput.removeEventListener("input",this._handleSearchString);
          }
        }
        customSearchInput.addEventListener("input",this._handleSearchString);
      }
    }
    if(Boolean(this.props.searchFormID)){
      let customSearchInputForm = document.getElementById(this.props.searchFormID);
      if(customSearchInputForm){
        if(prevSearchFormID !== this.props.searchFormID){
          let prevCustomSearchInputForm = document.getElementById(prevSearchFormID);
          if(prevCustomSearchInputForm){
            prevCustomSearchInputForm.removeEventListener("submit",this._searchCallback);
          }
        }
        customSearchInputForm.addEventListener("submit",this._searchCallback);
      }
    }
  }
  
  _initActionButtonListener = () => {
    let { renderView, renderEdit, renderDelete } = this.props;
    let data_row = this.state.data;
    if(renderView){
      if(renderView.render){
        if(renderView.render.$$typeof === Symbol.for('react.element')){
            let onRowView = this.props.onRowView === undefined ? ()=>{ return; } : this.props.onRowView;    
            let table_rows = ReactDOM.findDOMNode(this).getElementsByClassName(renderView.className)
            Array.from(table_rows)
            .forEach((element, index)=>{
              element.onclick = (e,...args) => onRowView(...args,e,data_row[index]);
            })
        }
      }
    }
    if(renderDelete){
      if(renderDelete.render){
        if(renderDelete.render.$$typeof === Symbol.for('react.element')){
            let onRowDelete = this.props.onRowDelete === undefined ? ()=>{ return; } : this.props.onRowDelete;    
            let table_rows = ReactDOM.findDOMNode(this).getElementsByClassName(renderDelete.className)
            Array.from(table_rows)
            .forEach((element, index)=>{
              element.onclick = (e,...args) => onRowDelete(...args,e,data_row[index]);
            })
        }
      }
    }
    if(renderEdit){
      if(renderEdit.render){
        if(renderEdit.render.$$typeof === Symbol.for('react.element')){
            let onRowEdit = this.props.onRowEdit === undefined ? ()=>{ return; } : this.props.onRowEdit;    
            let table_rows = ReactDOM.findDOMNode(this).getElementsByClassName(renderEdit.className)
            Array.from(table_rows)
            .forEach((element, index)=>{
              element.onclick = (e,...args) => onRowEdit(...args,e,data_row[index]);
            })
        }
      }
    }
  }

  _onSort = (sortKey, direction) => {
    let data = [...this.state.data];
    let sortKeyIndex = this.state.sortKeys.indexOf(sortKey);
    let sortParameters = this.state.sortParameters;
    sortParameters.forEach((parameter) => {
      parameter = false;
    });
    sortParameters[sortKeyIndex] = true;
    direction === 'dsc'?
      data.sort((a, b) => { return isNaN(a[sortKey]) ? a[sortKey].localeCompare(b[sortKey]) : Number(a[sortKey]) - Number(b[sortKey]) })
      :
      data.sort((a, b) => { return isNaN(a[sortKey]) ? b[sortKey].localeCompare(a[sortKey]) : Number(b[sortKey]) - Number(a[sortKey]) })
    this.setState({ sortParameters });
    if(typeof this.props.onSort === "function"){
      this.props.onSort(data);
    } else {
      this.setState({ data });
    }
  }  
  
  _handleSearchString = (evt) => {
    let searchString = evt.target.value;
    this.setState({ searchString });
  }

  _handleSearch(){    
    this.getTableData();
  }

  _searchCallback = (evt) => {
    evt.preventDefault();
    if(document.activeElement.classList.contains("rtl-search-clear")){
      document.getElementById(this.props.searchInputID).value = "";
      this._clearSearch(evt);
    }

    if(this.state.searchString.trim().length)
      this.setState({appliedSearch:true});    
    else
      this.setState({appliedSearch:false});
    
    if (this.props.onSearch === undefined) {
      this._handleSearch();      
    }
    else {
      this.props.onSearch();      
    }
  }

  _applySearch = () => {    
    let searchedData = [];
    let data = this.state.data;    
    let searchStringArray = this.state.searchString.trim().split(",");
    let searchKeys = this.state.searchKeys;        
    data.forEach((row) => {
      for (const key in row) {      
        let search_condition =
            searchKeys.indexOf(key) !== -1  &&
            row.hasOwnProperty(key)         &&
            !searchedData.includes(row)     &&
            this.matchCaseInsensitive(row[key], searchStringArray);
        if (search_condition) {
          searchedData.push(row);
        }
      }
    })
    this.setState({
      data: searchedData,      
    });    
  }

  _clearSearch = (evt) => {
    evt.preventDefault();
    if (this.props.onSearch === undefined) {
      this.setState(
        { searchString: "", appliedSearch: false }, this.getTableData()
      );
    }
    else {
      this.setState(
        { searchString: "", appliedSearch: false }, this.props.onSearch()
      );
    }
  }

  _handleCheckboxes = (e) => {
    if(!this.state.appliedSearch){
      let parentTable = e.target.parentNode.closest("table")
      let row_checkBoxes = parentTable.querySelector(("tbody"))
      let header_checkBox = parentTable.querySelector((".rtl-super-checkbox"))
      row_checkBoxes = Array.from(row_checkBoxes.getElementsByClassName("rtl-row-checkbox"));            
      header_checkBox.checked = true;
      row_checkBoxes.forEach((row) => {
        if (!row.checked){
          header_checkBox.checked = false;
        }
      })
      if (!e.target.checked) {
        header_checkBox.checked = false;
      }
    }
  }

  _handleHeaderCheckbox = (e) => {    
    let row_checkBoxes = Array.from(document.getElementsByClassName("rtl-row-checkbox"));
    row_checkBoxes.forEach(input => {
      if (!input.disabled)
        input.checked = e.target.checked;
    })    
  }

  matchCaseInsensitive = (parentString, substringArray) => {
      let flag = false;         
      for( let i=0 ; i<= substringArray.length; i++){   
        let substr = String(substringArray[i]).toUpperCase().trim();
        parentString = String(parentString).toUpperCase().trim();  
        if (parentString.indexOf(substr)>-1 && substr!==""){
          flag = true;
          break;
        }
      }
      return flag;        
  }

  getMultiSelectProps = () => {
    let enableMultiSelect = this.props.enableMultiSelect === undefined ? false : this.props.enableMultiSelect;
    this.setState({ enableMultiSelect : enableMultiSelect});
  }

  getSearchParameters = () => {
    let searchKeys = [];
    let searchBy = this.props.searchBy === undefined ? [] : this.props.searchBy;
    let header = this.props.header === undefined ? [] : this.props.header;
    searchBy.forEach(function (searchKey) {
      if (header.indexOf(searchKey) !== -1)
        searchKeys.push(searchKey);
    });
    this.setState({ searchKeys });
  }

  getSortParameters = () => {
	  let sortKeys = [];
	  let sortParameters = [];	  
	  let sortBy = this.props.sortBy===undefined?[]:this.props.sortBy;
	  let header = this.props.header===undefined?[]:this.props.header;
	  sortBy.forEach(function(sortKey){
		  if(header.indexOf(sortKey)!==-1)
			  sortParameters.push(false);
	  });
	  this.setState({ sortParameters, sortKeys });
	}
  
  getTableData = () => {    
    let data = this.props.data === undefined ? [] : this.props.data;    
    let limit = this.props.limit === undefined ? null : Number(this.props.limit);
    let tempData = [];
    limit !== null ?
      data.forEach((row, index) => {
        if (index < limit) {
          tempData.push(row);
        }
      })
      :
      data.forEach((row) => {
        tempData.push(row);
      })      
    this.setState({ data: tempData }, 
      ()=> {              
        if(this.state.searchString.trim().length){
          this._applySearch();        
        }
    });
  }

  getDownloadableFileName = () =>{
    let fileName = this.props.fileName===undefined?"table":this.props.fileName;
    fileName = fileName.trim()===""?"table":fileName;
    this.setState({ fileName });
  }
  
  getCustomHeadersProps = () => {
    let customHeaders = this.props.customHeaders===undefined?{}:this.props.customHeaders;    
    this.setState({ customHeaders });
  }

  generateTableRows = () => {
    let { rowStyle, dataStyle } = this.props;
    let header = this.props.header === undefined ? [] : this.props.header;
    let defaultCheckedKey = this.props.defaultCheckedKey;
    let disableCheckedKey = this.props.disableCheckedKey;
    let selectedClassName = this.props.selectedClassName === undefined ? "rtl-highlighted-row" : this.props.selectedClassName;
    let onRowSelect = this.props.onRowSelect === undefined ? ()=>{ return; } : this.props.onRowSelect;
    let data = this.state.data;
    let tablebody = [];
    data.forEach((data_row, index) => {
      tablebody.push(
        <tr
          key={index}
          style={rowStyle}
          className={
            data_row[defaultCheckedKey] === undefined ||
            data_row[defaultCheckedKey] === false
              ? 
              "react-table-lite-row":
              "react-table-lite-row " + selectedClassName
          }              
        >
          {this.state.enableMultiSelect?
            <td colSpan={1}>
              <input 
                type="checkbox" 
                checked={data_row[defaultCheckedKey] === undefined? false: data_row[defaultCheckedKey]}
                disabled={data_row[disableCheckedKey] === undefined? false: data_row[disableCheckedKey]}
                className="rtl-row-checkbox"
                onChange={(e,...args)=>{     
                  this._handleCheckboxes(e);
                  onRowSelect(...args,e,data_row)}
                }
              />
            </td> 
            :
            <></>
          }
          {
            header.length ?
              header.map((header_key, index) => (
                 <React.Fragment key={index}>                               
                  <td
                    style={dataStyle}
                  >
                    {data_row[header_key]}
                  </td>
                  {this.TableActionButtons(index, header.length,data_row)}
                </React.Fragment>
              ))
              :
              <td style={dataStyle}> </td>
          }
        </tr>
      )
    });
    return tablebody;    
  }

  TableHeader = () => {
    let header = this.props.header === undefined ? [] : this.props.header;
    let sortBy = this.props.sortBy === undefined ? [] : this.props.sortBy;
    let onAllRowSelect = this.props.onAllRowSelect === undefined ? ()=>{ return; } : this.props.onAllRowSelect;
    let customHeaders = this.state.customHeaders;
    let headerStyle = this.props.headerStyle;    
    return (
      <thead className="react-table-lite-header" style={headerStyle}>
        <tr>
          {this.state.enableMultiSelect?
            <th
              style={{ width: '21px' }}
              colSpan={1}>
              {!this.state.appliedSearch?
                <input
                  className="rtl-super-checkbox"
                  type="checkbox"
                  onChange={(e, ...args) => {                  
                    onAllRowSelect(...args, e, this.state.data)
                  }}
                />
              :""}
            </th>
            :
            <></>
          }
          {header.length ?
            header.map((heading, index) => (
              <React.Fragment key={index}>
                <th>
                  {sortBy.indexOf(heading) !== -1 ?
                    <span className="rtl-table-sortable-header">
                      {
                        customHeaders[heading]===undefined?
                          heading
                        :
                        customHeaders[heading]
                      }
                      <span onClick={this._onSort.bind(this, heading, 'dsc')} > ▲ </span>
                      <span onClick={this._onSort.bind(this, heading, 'asc')}>  ▼ </span>
                    </span>
                    :
                    customHeaders[heading]===undefined?
                      heading
                      :
                      customHeaders[heading]
                  }
                </th>
                {this.TableActionHeader(index, header.length)}
              </React.Fragment>
            ))
            :
            <th></th>
          }
        </tr>
      </thead>
    )
  }

  TableData = () => {
    let header = this.props.header===undefined?[]:this.props.header;
    let colSpan = this.props.showActions===undefined? header.length : header.length + 1;
    let noDataMessage = this.props.noDataMessage===undefined? "No data found" :this.props.noDataMessage;
    let { rowStyle, dataStyle } = this.props;
    let data = this.state.data;     
    return(
      <tbody>
        {data.length ?
          this.generateTableRows()
          :
          <tr style={rowStyle}>            
            <td style={dataStyle} colSpan={colSpan}>
              {noDataMessage}
            </td>
          </tr>
        }
      </tbody>
    )
  }

  TableOperations = () =>{
    let download = this.props.download === undefined? false : Boolean(this.props.download);
    let searchable = this.props.searchable === undefined? false : Boolean(this.props.searchable);
    let downloadButtonID =  this.props.downloadButtonID;
    let searchInputID =  this.props.searchInputID;
    return(
      <div>
        {
          searchable && !Boolean(searchInputID)?
            <form className="rtl-table-search-form" onSubmit={ this._searchCallback.bind(this) }>
              <input 
                onChange = {this._handleSearchString.bind(this)}
                value={this.state.searchString}
                placeholder = "Search"
                type="text" 
                name="rtl-table-search" 
              />              
              {!this.state.appliedSearch ?
                <button type="submit">
                  <svg width="14" height="13" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" display="inline-block" viewBox="2 2 21 21" style={{ verticalAlign: "middle" }}> <circle cx="11" cy="11" r="8"></circle> <path d="M21 21L16.65 16.65"></path> </svg>
                </button>
                :
                <button type="button" onClick={this._clearSearch.bind(this)}>
                  <svg width="14" height="13" fill="currentColor" viewBox="12 13 40 40" style={{ verticalAlign: "middle" }} display="inline-block" > <g> <g> <path d="M36.243 32l11.879-11.879a3 3 0 00-4.243-4.242L32 27.757 20.121 15.879a3 3 0 10-4.242 4.242L27.757 32 15.879 43.879a3 3 0 104.242 4.242L32 36.243l11.879 11.879a3 3 0 004.242-4.243L36.243 32z"></path> </g> </g> </svg>
                </button>
              }
            </form>           
          :
          ""
        }
        {
          download && !Boolean(downloadButtonID)?
            <button className="rtl-table-download-btn-css" onClick={this._downloadData.bind(this)}> 
             <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 512 512" > <path fill="#61729b" d="M481 68.699V512h-60l-128.699-63.6L256 459.8 91 512H31V0h90l101.4 129.899 33.6-31.5L361 0h51.301z" ></path> <path fill="#47568c" d="M481 68.699V512h-60l-128.699-63.6L256 459.8V98.399L361 0h51.301z" ></path> <path fill="#e0f4ff" d="M91 242v270h330V242z"></path> <path fill="#bbdcff" d="M256 242h165v270H256z"></path> <path fill="#979fef" d="M151 332h210v30H151zM151 392h210v30H151z"></path> <path fill="#e0f4ff" d="M361 0v180H121V0h150l17.401 22.5L301 0z"></path> <path fill="#bbdcff" d="M361 0v180H256V0h15l17.401 22.5L301 0z"></path> <path fill="#737ee6" d="M256 332h105v30H256zM256 392h105v30H256z"></path> <path fill="#47568c" d="M271 0h30v120h-30z"></path> </svg>
             </i>
            </button>            
          :
          ""
        }        
      </div>
    )
  }

  TableActionButtons = (index , columns_length, data_row, e) => {
    let dataStyle = this.props.dataStyle === undefined ? {} : this.props.dataStyle;
    let showActions = this.props.showActions === undefined ? false : this.props.showActions;
    let actionTypes = this.props.actionTypes === undefined ? [] : this.props.actionTypes;
    let onRowDelete = this.props.onRowDelete === undefined ? ()=>{ return; } : this.props.onRowDelete;
    let onRowEdit = this.props.onRowEdit === undefined ? ()=>{ return; } : this.props.onRowEdit;
    let onRowView = this.props.onRowView === undefined ? ()=>{ return; } : this.props.onRowView;    
    let showDeleteBtn = false;
    let showEditBtn = false;
    let showViewBtn = false;
    
    let customViewAction, customEditAction, customDeleteAction;
    let { renderView, renderEdit, renderDelete } = this.props;
    if(renderView){
      if(renderView.render){
        if(renderView.render.$$typeof === Symbol.for('react.element')){
          customViewAction = renderView.render;
        }
      }
    }
    if(renderEdit){
      if(renderEdit.render){
        if(renderEdit.render.$$typeof === Symbol.for('react.element')){
          customEditAction = renderEdit.render;
        }
      }
    }
    if(renderDelete){
      if(renderDelete.render){
        if(renderDelete.render.$$typeof === Symbol.for('react.element')){
          customDeleteAction = renderDelete.render;
        }
      }
    }


    actionTypes.length > 0 ?
      actionTypes.forEach((action)=>{
        if(action.toUpperCase() === "VIEW")
        showViewBtn = true;
        if(action.toUpperCase() === "DELETE")
          showDeleteBtn = true;
        if(action.toUpperCase() === "EDIT")
          showEditBtn = true;               
      })
    : 
    showDeleteBtn = showEditBtn = showViewBtn = true;

    if(index === columns_length - 1 && showActions){
      return (
        <td 
          className="rtl-table-actions"
          style={dataStyle}
        > 
          <div className="rtl-action-btn-container">
          {showViewBtn?
            customViewAction?
              customViewAction
              :
              <button 
                className="rtl-action-btn-view-btn"
                onClick={(e,...args)=>{onRowView(...args,e,data_row)}}
              >
                <i>
                  <svg fill="currentColor" style={{verticalAlign: "middle"}} width="25" height="25" display="inline-block" viewBox="0 0 20 20" > <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307 0-2.379 1.99-4.309 4.445-4.309s4.444 1.93 4.444 4.309c0 2.379-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z"></path> </svg>
                </i>
              </button>                         
          :""}
            
          {showEditBtn?
            customEditAction?
              customEditAction
              :
              <button 
                className="rtl-action-btn-edit-btn"
                onClick={(e,...args)=>{onRowEdit(...args,e,data_row)}}
              >
                <i>
                  <svg fill="currentColor" style={{ verticalAlign: "middle" }} width="25" height="25" display="inline-block" viewBox="0 0 24 24" > <path d="M21.561 5.318l-2.879-2.879A1.495 1.495 0 0017.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 00-1 1v13a1 1 0 001 1h13a1 1 0 001-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06zM11.5 14.672L9.328 12.5l6.293-6.293 2.172 2.172-6.293 6.293zm-2.561-1.339l1.756 1.728L9 15l-.061-1.667zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29.464-.19.896-.347 1.188-.64L16 13v6zm2.5-11.328L16.328 5.5l1.293-1.293 2.171 2.172L18.5 7.672z"></path> </svg>
                </i>
              </button>
          :""}
            
          {showDeleteBtn?
            customDeleteAction?
              customDeleteAction
              : 
              <button 
                className="rtl-action-btn-delete-btn"
                onClick={(e,...args)=>{onRowDelete(...args,e,data_row)}}
              >
                <i>
                  <svg fill="currentColor" style={{ verticalAlign: "middle" }} width="19" height="19" display="inline-block" viewBox="0 0 8 8" > <path d="M3 0c-.55 0-1 .45-1 1H1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1H5c0-.55-.45-1-1-1H3zM1 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19V3h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V3h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V3h-1z"></path> </svg>
                </i>
              </button>                       
          :""}
          
          
          </div>
        </td>
      );
    }
  }

  TableActionHeader = (index , columns_length) => {
    let showActions = this.props.showActions === undefined ? false : this.props.showActions;
    if(index === columns_length - 1 && showActions){
      return (
        <th className="rtl-table-actions-header"> 
          Actions
        </th>
      );
    }
  }

  render() {
    return (
      <div 
        className="react-table-lite-container" 
        // style={{display: "none"}}
        style={this.props.containerStyle}
      >              
        <>{this.TableOperations()}</>      
        <table cellSpacing={0} className="react-table-lite-main" style={this.props.tableStyle}>
          {this.TableHeader()}
          {this.TableData()}
        </table>
      </div>  
    );
  }
}

export default Table;