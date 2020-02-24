import React from "react";
import ReactDOM from "react-dom";
import Client from "./Client";
import ClientForm from "./ClientForm";

import "./styles.css";

class App extends React.Component {
  clientInput = React.createRef();

  state = {
    clients: [
      { id: 1, nom: "Marina Luxin" },
      { id: 2, nom: "Baptiste Salvi" },
      { id: 3, nom: "Lior Chamla" }
    ]
    // compteur: 0
  };

  handleDelete = id => {
    const clients = this.state.clients.slice();
    const index = clients.findIndex(function(client) {
      return client.id === id;
    });

    clients.splice(index, 1);

    this.setState({ clients });
    // pareil que clients: clients
    //tableau initial : variable const (tableau modifié)*/}
  };

  handleAdd = client => {
    const clients = this.state.clients.slice();
    clients.push(client);

    this.setState({ clients });
  }

  // handleClick() {
  //  const clients = this.state.clients.slice();
  //  clients.push({id: 4, nom: "Nathalie Bucchi"});

  //  this.setState({ clients: clients})
  // }

  render() {
    const title = "Liste des clients";

    return (
      <div>
        <h1> {title} </h1>
        {/* {this.state.compteur}
        <button onClick={this.handleClick.bind(this)}>click me</button> */}
        <ul>
          {this.state.clients.map(client => (
            <Client details={client} onDelete={this.handleDelete} />
          ))}
        </ul>
        <ClientForm onClientAdd={this.handleAdd}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
