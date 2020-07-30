import React from "react";
import "./Table.css";

export default class Table extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
  }


  TableHeader = () =>{
    let {
        header , 
        headerStyle
    } = this.props;    
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
    let { 
      data, 
      header,
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
                        header.map((header_key,index)=>(
                          <td 
                            key={index} 
                            style={dataStyle}
                          >
                              {data_row[header_key]}
                          </td>
                        ))                    
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
  render() {
    return (
      <div className="react-table-lite-container" style={this.props.containerStyle}>
        <table cellspacing={0} className="react-table-lite-main" style={this.props.tableStyle}>
          {this.TableHeader()}
          {this.TableData()}
        </table>
      </div>  
    );
  }
}
