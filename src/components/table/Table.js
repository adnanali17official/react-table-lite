import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Job</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Dev</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Tester</td>
          </tr>
        </table>
      </div>
    );
  }
}
