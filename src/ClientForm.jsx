import React, { Component } from "react";

class ClientForm extends Component {
  state = {
    newClient: ''
  }

  handleChange = event => {
    const value = event.currentTarget.value;
    this.setState({ newClient: value });
    // pourrait passer directement event dans le setState et enlever la variable value
  };

  handleSubmit = event => {
    event.preventDefault(); //pour pas que la page se recharge

    const id = new Date().getTime();
    const nom = this.state.newClient;

    this.props.onClientAdd({id, nom});

    this.setState({newClient: ""});
  };

  render(){
    return <section>
      <h2>Méthode des Refs pour le form</h2>
      <form onSubmit={this.handleSubmit}>
        <input ref={this.clientInput} type="text" placeholder="Ajouter un client" />
        <button>Valider</button>
      </form>

      <h2>Méthode du State pour le form</h2>
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.newClient} onChange={this.handleChange} type="text" placeholder="Ajouter un client" />
        <button>Valider</button>
      </form>
      </section>
  }
}

export default ClientForm; 