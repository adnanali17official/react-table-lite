import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import "./Pagination.css";

class Pagination extends React.Component{		
  constructor(props){
    super(props)
    this.state={ 
      totalPages: 1, 
      currentPage: 1,
      range: 1,
      currentPagination:[],
    }
  }
  
  componentDidMount(){
    this.getPropsData();
    this.generatePaginationArray()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props){
      this.getPropsData();
      this.generatePaginationArray()
    }
  }

  getPropsData(){
    let totalPages = typeof this.props.totalPages !== "number"  ? 1 : this.props.totalPages;
    let currentPage = typeof this.props.currentPage !== "number" ? 1 : this.props.currentPage;
    let range = typeof this.props.range !== "number" ? 5 : this.props.range;

    if(range > totalPages){
      range = totalPages;
    }
    if(range === 0){
      console.error("'range' prop must be a positive integer !")
    }

    this.setState({ 
      totalPages: totalPages, 
      currentPage: currentPage,
      range: range,
    });
  }			
  
  
  _handlePage(pageNo){			
    if(pageNo>0 && pageNo <= this.state.totalPages){
      // console.log( pageNo );
      if(typeof this.props.onPaginate === "function"){
        this.props.onPaginate(pageNo);
      } 
    }
  }
  
  generatePaginationArray(){
    let tempArray = [];
    let range = this.state.range;
    let newPaginationArray = [];
    let total = this.state.totalPages;			
    let paginationSections = Math.ceil(total/range)
    let paginationArray = Array(total).fill(0).map((element,index)=>{return index + 1});

    paginationArray.forEach((element)=>{
      tempArray.push(element);
      if( element % range === 0 ){
        newPaginationArray.push(tempArray)
        tempArray = []
      }				
    })					
    let missingElements = range - tempArray.length;		
    Array(missingElements).fill(0).forEach((element,index)=>{
      tempArray.unshift(tempArray[0]-1);	
    })														
    newPaginationArray.push(tempArray)
    // console.log(newPaginationArray)
    this.setState({ currentPagination:newPaginationArray });
  }
  
  render(){
    let Found = false;
    return(
      <div className="rtl-pagination-container">
        <ul className="rtl-paginate-ul">
          <li 
            className="rtl-pagination-next" 							
            onClick={this._handlePage.bind(this,1)}
            style={this.state.currentPage === 1 ? {display:'none'}:{}}
          > 
            <span>◀</span><span className="rtl-pagination-first">◀</span>
          </li>
          <li 
            className="rtl-pagination-back" 
            onClick={this._handlePage.bind(this,this.state.currentPage-1)}
            style={this.state.currentPage === 1 ? {display:'none'}:{}}
          > 	
            ◀ 
          </li>							
             {Number(this.state.totalPages)?
              <React.Fragment>
                {
                  this.state.currentPagination.map((elemental)=>{
                    if(!Found)
                    return(
                    elemental.map((element, key)=>{
                      if(elemental.indexOf(this.state.currentPage)>-1){
                        Found = true;													
                        return(
                          <li
                            key={key} 													
                            className={this.state.currentPage === element?
                                "rtl-pagination-item rtl-pagination-active" : "rtl-pagination-item"
                            }
                            onClick={this._handlePage.bind(this,(element))}
                          > 
                            {element} 
                          </li>
                        )
                      }
                    })
                    )
                  })
                  
                }
              </React.Fragment>
            :
            ""
            }							
          <li 
            className="rtl-pagination-next" 
            style={this.state.totalPages === this.state.currentPage? {display:'none'}:{}}
            onClick={this._handlePage.bind(this,this.state.currentPage+1)}
          > 
            ▶ 
          </li>
          <li 
            className="rtl-pagination-next" 
            style={this.state.totalPages === this.state.currentPage? {display:'none'}:{}}
            onClick={this._handlePage.bind(this,this.state.totalPages)}
          > 
            <span>▶</span><span className="rtl-pagination-last">▶</span>
          </li>
        </ul>	
      </div>
    )
  }
}

export default Pagination;