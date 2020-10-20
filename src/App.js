import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/TelaLogin';
import TelaInicial from './Pages/TelaPrincipal';
import DetalhesComidas from './Pages/TelaDetalhesComida';
import DetalhesBebidas from './Pages/TelaDetalhesBebida';
import ProcessoReceitas from './Pages/TelaReceitaProcesso';
import Explorar from './Pages/TelaExplorar';
import ExplorarBebidaComida from './Pages/TelaExplorarBebidaComida';
import ExplorarIngredientes from './Pages/TelaExplorarIngredientes';
import ExplorarComidasAreas from './Pages/TelaExplorarLocal';
import Perfil from './Pages/TelaPerfil';
import ReceitasFeitas from './Pages/TelaReceitaFeitas';
import ReceitasFavoritas from './Pages/TelaReceitasFavoritas';

function App() {
  return (
    <Switch>
      <Route path="/comidas/:id_da_receita/in-progress" component={ProcessoReceitas} />
      <Route path="/bebidas/:id_da_receita/in-progress" component={ProcessoReceitas} />
      <Route path="/comidas/:id_da_receita" component={DetalhesComidas} />
      <Route path="/bebidas/:id_da_receita" component={DetalhesBebidas} />
      <Route exact path="/comidas" component={TelaInicial} />
      <Route exact path="/bebidas" component={TelaInicial} />
      <Route path="/explorar/comidas/ingredientes" component={ExplorarIngredientes} />
      <Route path="/explorar/bebidas/ingredientes" component={ExplorarIngredientes} />
      <Route path="/explorar/comidas/area" component={ExplorarComidasAreas} />
      <Route path="/explorar/comidas" component={ExplorarBebidaComida} />
      <Route exact path="/explorar/bebidas" component={ExplorarBebidaComida} />
      <Route exact path="/explorar" component={Explorar} />
      <Route path="/receitas-feitas" component={ReceitasFeitas} />
      <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
      <Route path="/perfil" component={Perfil} />
      <Route exact path="/" component={Login} />
      <Route render={() => <h1 className="naoEncontrada">Not Found</h1>} />
    </Switch>
  );
}

export default App;
