import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/table/Table";
ReactDOM.render(
    <Table
        limit={3}
        download={true}
        fileName="my customers"
        header={["name", "age", "phone", "email"]}
        sortBy={["age", "phone", "name"]}
        searchBy={["age"]}
        searchable={1}
        data={[
            { id: 1, name: "John Doe", age: 25, phone: "(+23)1265463", email: "JohnDoe@gmail.com" },
            { id: 2, name: "Kazuki Yashiro", age: 35, phone: "(+23)0000463", email: "Y_Kazuki@gmail.com" },
            { id: 3, name: "Eddie Memon", age: 22, phone: "(+23)3350500", email: "Eddie254@gmail.com" },
            { id: 4, name: "Barood Khan", age: 45, phone: "(+23)4025030", email: "BK5454@gmail.com" },
        ]}
    />, document.getElementById("root"));
