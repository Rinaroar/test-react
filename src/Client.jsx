import React, {Component} from "react";

function Client(props) {
    const { details, onDelete } = props;

    return (
      <li> 
      {details.nom}
      <button onClick={() => onDelete(details.id)}>X</button>
    </li>
  );
}


// class Client extends Component {
//   render(){
//     // const details = this.props.details;
//     // const onDelete = this.props.onDelete;

//     const { details, onDelete } = this.props;

//     return <li>
//       {details.nom}
//       <button onClick={() => onDelete(details.id)}>X</button>
//     </li>
//   }
// }

export default Client;