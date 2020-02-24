Interpolation JSX

<h1> {title} </h1>

.map
= Creer un tableau contenant les éléments transformés d'un autre tableau

AVEC FONCTION FLECHEE :

const elements = this.state.clients.map(client => (

<li> {client.nom}<button>X</button></li>
));

SANS FONCTION FLECHEE:

const elements = this.state.clients.map(function(client) {
return <li>{client.nom}<button>X</button></li>
});

.bind
= on lie la fonction à quelque chose
= on dit à handleClick que lorsqu'on l'appel et qu'à l'interieur d'elle-même on fait référence à la variable (this) alors c'est bien le (this) de .bind donton parle, celui de App !

Autre solution pour ne pas perdre le this :
<button onClick={() => this.handleClick()}>
--> faire une fonction flechée

Autre solution pour conserver le (this) :
handleClick est une fonction fléchée
handleClick = () => {
console.log(this.state);
}
--> handleClick est alors aussi une propriéte de App qui contient une fonction, comme state est une propriété de App qui contient un objet

ATTENTION, il faut des plugins de babel pour que ça marche parfairement (pour les fonctions fléchées)

setState()
--> permet de modifier l'état du composant et d'en informer React
= on lui passe en param un objet, qui va reprendre uniquement les parties du state qu'on veut update

Pour le compteur :
state = {
compteur : 0
};
handleClick() {
this.setState({ compteur: this.state.compteur + 1});

Méthode .slice() : permet de créer une copie d'un tableau !

Méthode .findIndex() : permet de trouver la position d'un élément particulier dans un tableau
--> handleDelete = (id) => {
const clients = this.state.client.slice();
const index = clients.findIndex(function(client){
return client.id === id
})
}
= est ce que l'identifiant sur lequel je boucle, c'est le même que celui cliqué ?

Méthode .splice() : permet de retirer des éléments à partir d'un index donné dans un tableau
--> clients.splice(index, 1) = supprime en partant de l'index, et pendant un élément.

React.createRef()
Création d'une référence (généralememt stockée dans une variable) à un élément du DOM
--> et le faire apparaitre en attribut sur l'élément souhaité avec ref={this.clientInput} par ex

handleSubmit = (event) => {
event.preventDefault(); //pour pas que la page se recharge
console.log(this.clientInput.current.value);
}
--> .current.value = c'est la valeur actuelle du champ

Ajouter un client avec le State :

- on ajoute "newClient" dans le state à vide car pas de valeur
- puis relier la valeur de l'input avec la nouvelle donnée (newClient) avec l'attribut "value"

WARNING : si on met une valeur à newClient, elle apparaitra dans l'input directement et ne peut pas être modifiée.
--> il faut que le STATE evolue pour qu'on voit la valeur changée dans le champs

Alors on crée la méthode handleChange (fléchée pour pas perdre le this) :

- reçoit un event
- Et on ajoute sur l'inpt un event "onChange" que l'on va lier à la méthode {this.handleChange}
  = cad, à chaque fois qu'on touche à ce champ, ça va appeler la méthode handleChange
  --> quand on relie une fonction à un event, la fonction va recevoir les données de l'event
  --> console.log(event)

Utilisation de currentTarget = où on a l'input sur leque a eu lieu l'event
--> console.log(event.currentTarget) = on voit l'input dans la console.
--> console.log(event.currentTarget.value) = on a la valeur (peut ajouter dans lettres mais les voit pas dans l'input, seulement dans la console)

Donc à chaque fois que je tape une lettre, on modifie la valeur de newClient :

- const value = event.currentTarget.value; = c'est la valeur que je tape
- this.setState({newClient: value }); = dans le state il y a la propriété newClient que je veux remplacer par la value que je tape.
  = le state change, donc le rendu change aussi avec la bonne valeur.

Comme utilise le state, plus besoin d'une ref à l'input,
Quand on soumettra le formulaire --> ira voir dans mon state ce que vaut la valeur newClient

Dans le handleSubmit :

- const id = new Date().getTime(); = sûr d'avoir un id unique, car c'est au moment où j'ai click
- const nom = this.state.newClient;
- const client = {id: id, nom:nom}; = objet qui a pour identifiant l'id et nom qu'on vient de creer
- const clients = this.state.clients.slice(); = copie du tableau des clients
- clients.push(client); = dans la copie du tableau je veux ajouter le "client"
- this.setState({clients: clients, newClient: ''}); = maj du state, ce qui s'appel clients dans mon state est remplacé par ma variable "clients" + remet l'input vide

const clients = this.state.clients.slice(); = copie du tableau des clients
--> peut aussi faire : const clients = [...this.state.clients];
--> je fais un nouveau tableau qui va contenir les elements du tableau
--> utilisation du spread operator : je prend le tableau du state, je vais l'exploser en plusieurs éléments et remet ces élements dans un new tableau.

Découper les composants : car gros composants App


Notion de PROPS

- Découper le composant de creation de client dans un fichier à part
- faire toutes les imports et exports nécessaire des deux côtés pour que ça fonctionne
- l'ajouter le composant client dans le render d'index.js

--> sauf que ça fonctionne pas, car au sein même du composant Client il y a une variable client qui n'existe pas dans le fichier / la variable client existe dans index.js uniquement.
== il faut arriver à faire passer le client qui existe dans index.js (liste de client) au petit composant

DONC utilise les props = propriétés du composant, utilisés comme des attributs HTML
Dans <Client /> on lui passe un attribut details={} et dedans on lui passe client
--> <Client details={client}/>
== on a la variable client qui represente l'objet qu'on passe au composant <Client> dans une props "details"

Pour acceder aux props = on passe par "this.props" = les propriétés du composant
Donc pour y acceder dans Client.jsx : au lieu de {client.nom} --> {this.props.details.nom}
== "details" = client, donc il a une proprité nom et id
== ça marche à l'affichage mais bloc avec le handleDelete

- Donc passe au <Client /> une autre propriété onDelete
- et passe en référence la fonction handleDelete
- et donc modifie dans le composant Client et dire quand les props il y a handleDelete
  --> <button onClick={() => this.props.onDelete(this.props.details.id)}>X</button>


Faire appel au DESTRUCTURING

Au lieu de :
const details = this.props.details;
const onDelete = this.props.onDelete;

Peut faire :
const { details, onDelete } = this.props; = on veut destructurer details et onDelete à partir de this.props
== on extrait de this.props ces deux informations


Pour le ClientForm

- on import/export comme on a besoin
- copie/colle ce dont on a besoin
  = ca ne fonctionne pas encore car on a pas pas de handleSubmit, ni de state etc

- Donc déjà créer le STATE newClient dans ClientForm et l'enlever de l'index.js (state de App, qui du coup est géré ailleurs)
- Puis besoin de 2 fonction : handleSubmit et handleChange, sinon ne marche pas
  --> donc prend le handleChange et le handleSubmit de App et ke place dans ClientForm

Mais pb handleSubmit = gère la liste des clients qui doit être géré dans App (le composant principal)
--> DONC faut faire quelque chose au niveau du composant principal 
Peut appeler une fonction dans ClientForm que va passer App, en lui passant le nouveau client à ajouter
Et dans App : fonction handleAdd qui reçoit un objet "clients = this.state.clients.slice();" etc

Dans handleAdd :
- pas objet avec id et nom, mais nouveau "client" qu'on a ajouter à la fonction
- et pas besoin de la propriété newClient, car désormais géré dans le composant du formulaire
= maintenant il faut l'appeler dans le formulaire en lui passant la méthode onClientAdd dans App
--> en faisant la référence à {this.handleAdd} = dans les propriétés du ClientForm il y a une méthode qui s'appel onClientAdd, qui represente la méthode handleAdd (qui rçoit un client et gère son ajout)

DONC dans ClientForm dans handleSubmit faut appeler = this.props.onClientAdd({id, nom}); 
--> lui passe l'objet directement
et : this.setState({newClient: ""}); pour que le redevienne vide dans le state de ClientForm


COMPOSANT FONCTIONNEL 
- le composant Client n'a pas besoin de state: il se suffit des info qu'on leur donne en propriétés 
- Quand on appel le composant dans App, on lui donne les détails du client + la reference d'une methode à appeler quand on veut supp un client
= n'a pas de données propre à lui-même, que les données qu'on lui donne. 

Si pas gestion de state, pas besoin de class --> mais une function ! 
  function Client () {
    qui ne render pas du coup
  }
--> Mais du coup pas un objet et n'a pas de this.props 
= dons les props passent en param de la function 

Peut refacto :
  function Client(props) {
    const { details, onDelete } = props;


En faisant : 
  function Client({details, onDelete}) 
= Client est une function qui va recevoir un objet props, mais ça m'interesse pas, je veux ce qu'il y a dedans (detail et onDelete)


Peut aussi faire une fonction fléchée : 

  co nst Client = ({details, onDelete}) => (
    <li>
      {details.nom}
      <button onClick={() => onDelete(details.id)}>X</button>
    </li>
  );