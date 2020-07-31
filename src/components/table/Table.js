import React from "react";
import "./Table.css";

import { export_table_to_csv } from './../../script/download_csv';

export default class Table extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
  }

  _downloadData = () => {
    var html = document.getElementById("rtl-table-table-lite").outerHTML;
    export_table_to_csv(html, "table.csv");
  }

  TableHeader = () =>{
    let header = this.props.header===undefined?[]:this.props.header;
    let {headerStyle} = this.props;    
    return(
      <thead className="react-table-lite-header" style={headerStyle}>
        <tr>
          {header.length?
            header.map((heading,index)=>(
              <th key={index}>
                  {heading}
              </th>
            ))
            :
          ""
          }
        </tr>
      </thead>
    )
  }

  TableData = () =>{
    let header = this.props.header===undefined?[]:this.props.header;
    let { 
      data, 
      limit,
      rowStyle,
      dataStyle
     } = this.props;  

    return(
      <tbody>
        {data.length?
            data.map((data_row,index)=>
              {
                if(index!==limit){
                  return(
                  <tr 
                    key={index} 
                    style={rowStyle}
                    className="react-table-lite-row"
                  >  
                      {
                        header.length?
                          header.map((header_key,index)=>(
                            <td 
                              key={index} 
                              style={dataStyle}
                            >
                                {data_row[header_key]}
                            </td>
                          ))     
                          :
                          <td></td>               
                      }                      
                  </tr>     
                  )      
                }        
              })
            :
          ""
        }        
      </tbody>
    )
  }

  DownloadTableButton = () =>{
    let download = this.props.download === undefined? false : this.props.download
    return(
      <div>
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
        <>{this.DownloadTableButton()}</>      
        <table id="rtl-table-table-lite" cellspacing={0} className="react-table-lite-main" style={this.props.tableStyle}>
          {this.TableHeader()}
          {this.TableData()}
        </table>
      </div>  
    );
  }
}
