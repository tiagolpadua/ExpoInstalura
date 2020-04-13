/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import Post from './Post';

// https://instalura-api.herokuapp.com/';

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fotos: [],
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}));
  }

  like = idFoto => {
    const foto = this.state.fotos.find(f => f.id === idFoto);
    if (foto === undefined) {
      throw new Error('Foto não foi encontrada com o id: ' + idFoto);
    }
    let novaLista = [];
    if (!foto.likeada) {
      novaLista = [...foto.likers, {login: 'meuUsuario'}];
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario';
      });
    }
    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista,
    };
    const fotos = this.state.fotos.map(f =>
      f.id === fotoAtualizada.id ? fotoAtualizada : f,
    );
    this.setState({fotos});
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id + ''}
        data={this.state.fotos}
        renderItem={({item}) => <Post foto={item} likeCallback={this.like} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
