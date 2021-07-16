import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/table/Table";
// import TestTable from "./components/test/test";
class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          disabled: true,
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
    this.setState({data})    
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

  onAllRowSelect(e, data) {
    // console.log("e",e);
    // console.log("data",data);
    let newData = this.state.data;
    newData.forEach((obj, index) => {
      if (!newData[index].disabled) newData[index].checked = e.target.checked;
    });
    this.setState({ data: newData });
  }

  render() {
    return (
      <>
        <Table
          // limit={3}
          download={true}
          fileName="my customers"
          header={["name", "age", "phone", "email"]}
          sortBy={["age", "phone", "name"]}
          customHeaders={[]}
          // header={["name", "runtime", "status", "officialSite"]}
          // sortBy={["status"]}
          // searchBy={["email"]}
          searchBy={["email"]}
          searchable={true}
          showActions={true}
          enableMultiSelect={false}
          defaultCheckedKey={"checked"}
          disableCheckedKey={"disabled"}
          data={this.state.data}
          actionTypes={["edit", "delete", "view"]}
          onRowDelete={this.onRowDelete.bind(this)}
          onRowEdit={this.onRowEdit.bind(this)}
          onRowView={this.onRowView.bind(this)}
          noDataMessage={"my custom no no"}
          onRowSelect={this.onRowSelect.bind(this)}
          onAllRowSelect={this.onAllRowSelect.bind(this)}
        />

          <Table
          // limit={3}
          download={true}
          fileName="my customers"
          header={["phone", "email"]}
          sortBy={["age", "phone", "name"]}
          customHeaders={[]}
          // header={["name", "runtime", "status", "officialSite"]}
          // sortBy={["status"]}
          searchBy={["email"]}
          searchable={true}
          showActions={true}
          enableMultiSelect={false}
          defaultCheckedKey={"checked"}
          disableCheckedKey={"disabled"}
          data={this.state.data}
          actionTypes={["edit", "delete", "view"]}
          onRowDelete={this.onRowDelete.bind(this)}
          onRowEdit={this.onRowEdit.bind(this)}
          onRowView={this.onRowView.bind(this)}
          noDataMessage={"my custom no no"}
          onRowSelect={this.onRowSelect.bind(this)}
          onAllRowSelect={this.onAllRowSelect.bind(this)}
        />
      </>
    );
  }
}

ReactDOM.render(<MyTable />, document.getElementById("root"));
// ReactDOM.render(<TestTable />, document.getElementById("root"));
