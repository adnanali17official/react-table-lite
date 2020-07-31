import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/table/Table";
//export default Table;
ReactDOM.render(
    <Table 
        limit={10}  
        download={true}  
        // containerStyle={{backgroundColor:"purple",color:"white"}}        
        header={["name","age","phone","email"]}
        data={
            [
                {id:"232", name:"ABC", age:"22", phone:"+232-1230110", email:"abc@hotmail.com"},
                {name:"XYZ", age:"25", email:"abc@hotmail.com", phone:"+230-1230110" },
                {email:"rew@hotmail.com", name:"REW", age:"21", phone:"+250-1230110", role:"developer" },
            ]
        }
    />, 
    document.getElementById("root")
);
