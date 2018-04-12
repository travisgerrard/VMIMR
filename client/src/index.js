import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


const token = localStorage.getItem('VMIMRToken');
const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

//If token, assume user is signed in
if (token) {
  store.dispatch({ type: AUTH_USER, payload: token });
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
