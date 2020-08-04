import React from "react";
import "./Table.css";

import { export_table_to_csv } from './../../script/download_csv';

export default class Table extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      data:[],
      sortParameters : [],
      sortKeys : [],
      searchKeys: [],
      fileName: "table",
      searchString: "",
      appliedSearch: false
	  };
  }

  componentDidMount = () => {
    this.getSortParameters();
    this.getSearchParameters();
    this.getDownloadableFileName();
    this.getTableData();    
  }

  _downloadData = () => {
    var html = document.getElementById("rtl-table-table-lite").outerHTML;
    export_table_to_csv(html, this.state.fileName+".csv");
  }

  _onSort = (sortKey, direction) => {
    let data = this.state.data;
    let sortKeyIndex = this.state.sortKeys.indexOf(sortKey);
    let sortParameters = this.state.sortParameters;
    sortParameters.forEach((parameter) => {
      parameter = false;
    });
    sortParameters[sortKeyIndex] = true;
    direction === 'dsc'?
      data.sort((a, b) => String(a[sortKey]).localeCompare(String(b[sortKey])))
    :
    data.sort((a, b) => String(b[sortKey]).localeCompare(String(a[sortKey])))
    this.setState({ sortParameters });
  }  
  
  _handleSearchString = (evt) => {
    let searchString = evt.target.value;
    this.setState({ searchString });
  }

  _handleSearch(evt){
    evt.preventDefault();
    this.getTableData();
  }

  _applySearch = () => {         
    let searchedData = [];
    let data = this.state.data;   
    let searchStringArray = this.state.searchString.trim().split(",");
    let searchKeys = this.state.searchKeys;
    if (!this.state.searchString.trim().length) {
      this.setState({ appliedSearch: false });
      this.getTableData();
    }
    else {
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
        appliedSearch: true
      });
    }
  }

  _clearSearch = (evt) => {
    evt.preventDefault();
    this.setState(
      { searchString: "", appliedSearch: false }, this.getTableData()
    );
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
    console.log("ok");
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
        if(this.state.searchString.trim().length)
          this._applySearch();
    });
  }

  getDownloadableFileName = () =>{
    let fileName = this.props.fileName===undefined?"table":this.props.fileName;
    fileName = fileName.trim()===""?"table":fileName;
    this.setState({ fileName });
  }
  
  generateTableRows = () => {
    let { rowStyle, dataStyle } = this.props;
    let header = this.props.header === undefined ? [] : this.props.header;
    let data = this.state.data;
    let tablebody = [];
    data.forEach((data_row, index) => (      
      tablebody.push(
        <tr
          key={index}
          style={rowStyle}
          className="react-table-lite-row"
        >
          {
            header.length ?
              header.map((header_key, index) => (
                <td
                  key={index}
                  style={dataStyle}
                >
                  {data_row[header_key]}
                </td>
              ))
              :
              <td> </td>
          }
        </tr>
      )
    ));
    return tablebody;    
  }

  TableHeader = () => {
    let header = this.props.header === undefined ? [] : this.props.header;
    let sortBy = this.props.sortBy === undefined ? [] : this.props.sortBy;
    let { headerStyle } = this.props;
    return (
      <thead className="react-table-lite-header" style={headerStyle}>
        <tr>
          {header.length ?
            header.map((heading, index) => (
              <th key={index}>
                {sortBy.indexOf(heading) !== -1 ?
                  <span className="rtl-table-sortable-header">
                    {heading}
                    <span onClick={this._onSort.bind(this, heading, 'asc')} > ▲ </span>
                    <span onClick={this._onSort.bind(this, heading, 'dsc')}>  ▼ </span>
                  </span>
                  :
                  heading
                }
              </th>
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
    let data = this.state.data;     
    return(
      <tbody>
        {data.length ?
          this.generateTableRows()
          :
          <tr>
            <td colSpan={header.length}>
              No data found
            </td>
          </tr>
        }
      </tbody>
    )
  }

  TableOperations = () =>{
    let download = this.props.download === undefined? false : Boolean(this.props.download);
    let searchable = this.props.searchable === undefined? false : Boolean(this.props.searchable);
    return(
      <div>
        {
          searchable?
            <form className="rtl-table-search-form" onSubmit={this.applySearch.bind(this)}>
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
          download?
            <button id="rtl-table-download-btn" className="rtl-table-download-btn-css" onClick={this._downloadData.bind(this)}> 
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


  render() {
    return (
      <div className="react-table-lite-container" style={this.props.containerStyle}>              
        <>{this.TableOperations()}</>      
        <table id="rtl-table-table-lite" cellSpacing={0} className="react-table-lite-main" style={this.props.tableStyle}>
          {this.TableHeader()}
          {this.TableData()}
        </table>
      </div>  
    );
  }
}
