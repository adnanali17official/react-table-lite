import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/table/Table";
// import TestTable from "./components/test/test";
class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoGeneratedData:[],
      currentPage: 1,
      data: [
        {
          id: 1,
          name: "John Doe",
          age: 25,
          phone: "(+23)1265463",
          email: "JohnDoe@gmail.com",
          checked: true,
        },
        {
          id: 2,
          name: "Kazuki Yashiro",
          age: 35,
          phone: "(+23)0000463",
          email: "Y_Kazuki@gmail.com",
          checked: true,
          disabled: true,
        },
        {
          id: 3,
          name: "Eddie Memon",
          age: 22,
          phone: "(+23)3350500",
          email: "Eddie254@gmail.com",
          disabled: false,
        },
        {
          id: 4,
          name: "Barood Khan",
          age: 45,
          phone: "(+23)4025030",
          email: "BK5454@gmail.com",
        },
      ],
    };
  }

  componentDidMount() {
    // this.getLiveApiData();
    
    let data=[]
    for(let i=0;i<50;i++){
      // data[i] =  Object.create(this.state.data[parseInt((Math.random() * 100) % 3)])
      data[i] = {...this.state.data[parseInt((Math.random() * 100) % 3)]}
      data[i].id = i;
      data[i].name += " "+i;
    }
    this.setState({autoGeneratedData: data})    
  }

  getLiveApiData() {
    const url = "http://api.tvmaze.com/shows";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        let custom = [];
        result.forEach((element, index) => {
          let limit = 49;
          if (index > limit) {
            return;
          } else {
            custom.push(element);
          }
        });
        this.setState({
          data: custom,
        });
      });
  }

  onRowView(e, row) {
    // console.log("e", e);
    // console.log("row", row);
    alert("Hi " + row.name + " !");
  }

  onRowEdit(e, row) {
    // console.log("e", e);
    // console.log("row", row);
    alert("Edit : " + row.name);
  }

  onRowDelete(e, row) {
    // console.log("e", e);
    // console.log("row", row);
    let newData = this.state.data;
    newData = newData.filter((obj) => obj.id !== row.id);
    this.setState({ data: newData });
  }

  onRowSelect(e, row) {
    // console.log("e",e);
    // console.log("row", row);
    
    let newData = this.state.data;
    newData.forEach((obj, index) => {
      if (row.id === obj.id) {
        newData[index].checked = e.target.checked;
      }
    });
    this.setState({ data: newData });
  }

  onRowSelect2(e, row) {
    let newData = this.state.autoGeneratedData;
    newData.forEach((obj, index) => {
      if (row.id === obj.id) {
        newData[index].checked = e.target.checked;
      }
    });
    this.setState({ autoGeneratedData: newData });
  }

  onAllRowSelect(e, data) {   
    let newData = this.state.data;
    newData.forEach((obj, index) => {
      if (!newData[index].disabled) newData[index].checked = e.target.checked;
    });
    this.setState({ data: newData });
  }

  onAllRowSelect2(e, data) {   
    let newData = this.state.autoGeneratedData;
    newData.forEach((obj, index) => {
      if (!newData[index].disabled) newData[index].checked = e.target.checked;
    });
    this.setState({ autoGeneratedData: newData });
  }

  onDownload(){
    console.log("you get download")
    return true;
  } 
  
  onSort(data){
    this.setState({ data });
  }
  
  onPaginate(currentPage){
    this.setState({ currentPage });
  }

  RenderSingleTable(id = 1) {
    return (
      <>
        {/* <form id={"my-form"+id} onSubmit={(e)=>e.preventDefault()}>
          <input id={"my-search"+id}></input>
          <button type="submit">search</button>
          <button
            className="rtl-search-clear"
          >
            clear
          </button>
        </form> */}
        {/* <button className="my-download-1"> download</button> */}
        <Table
          // limit={3}
          download={true}
          // downloadButtonID="my-download-1"
          // searchInputID={"my-search"+id}
          // searchFormID={"my-form"+id}
          fileName="my customers"
          header={["name", "age", "phone", "email"]}
          sortBy={["age", "phone", "name", "email"]}
          // customHeaders={{"name":"employee"}}        
          searchBy={["email","phone"]}
          searchable={true}
          showActions={true}
          // showPagination={true}
          // totalPages={10} 
          // currentPage={this.state.currentPage}
          // range={5}
          // onPaginate={this.onPaginate.bind(this)}
          enableMultiSelect={true}
          defaultCheckedKey={"checked"}
          disableCheckedKey={"disabled"}
          data={this.state.data}
          actionTypes={["edit", "delete", "view"]}
          // selectedClassName={"my-selected-class"}
          // renderView={{
          //   render:
          //     <button 
          //       style={{background: "red", color: "white"}} 
          //       className={"my-view-"+id+ " other"}
          //     >
          //       view
          //     </button>
          //   ,
          //   className: "my-view-" + id
          // }}
           // renderEdit={{
          //   render:
          //     <button 
          //       style={{background: "red", color: "white"}} 
          //       className={"my-edit-"+id+ " other"}
          //     >
          //       edit
          //     </button>
          //   ,
          //   className: "my-edit-" + id
          // }}
          // renderDelete={{
          //   render:
          //     <button 
          //       style={{background: "red", color: "white"}} 
          //       className={"my-delete-"+id+ " other"}
          //     >
          //       delete
          //     </button>
          //   ,
          //   className: "my-delete-" + id
          // }}
          onRowView={this.onRowView.bind(this)}
          onRowEdit={this.onRowEdit.bind(this)}
          onRowDelete={this.onRowDelete.bind(this)}
          // onDownload={this.onDownload.bind(this)}
          // onSort={this.onSort.bind(this)}
          noDataMessage={"my custom no no"}
          onRowSelect={this.onRowSelect.bind(this)}
          onAllRowSelect={this.onAllRowSelect.bind(this)}
        />
      </>
    );
  }

  RenderMultipleTable() {
    const STYLE = {
      CONTAINER: {
        // background: "red",
        width: "97.5%",
        height: "96vh",
        padding:"10px",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "50% 50%",
        justifyItems: "center"
      },
      ITEM: {
        // background: "blue",
        width: "100%",
      }
    }
    
    return (
      <>
        <div 
          style={STYLE.CONTAINER}
        >
          <div style={STYLE.ITEM}>
            {this.RenderSingleTable(1)}
          </div> 
          <div style={STYLE.ITEM}>
            {this.RenderSingleTable(2)}
          </div> 
          <div style={STYLE.ITEM}>
            {this.RenderSingleTable(3)}
          </div>
          <div style={STYLE.ITEM}>
            {this.RenderSingleTable(4)}
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        {this.RenderSingleTable()}
        {/* {this.RenderMultipleTable()} */}
      </>
    );
  }
}

ReactDOM.render(<MyTable />, document.getElementById("root"));
// ReactDOM.render(<TestTable />, document.getElementById("root"));
