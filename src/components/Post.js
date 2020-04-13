import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
    };
  }

  exibeLegenda(foto) {
    if (foto.comentario === '') {
      return;
    }
    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  adicionaComentario = (valorComentario, inputComentario) => {
    if (valorComentario === '') {
      return;
    }

    const novaLista = [
      ...this.state.foto.comentarios,
      {
        id: valorComentario,
        login: 'meuUsuario',
        texto: valorComentario,
      },
    ];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista,
    };

    this.setState({foto: fotoAtualizada});
    inputComentario.clear();
  };

  render() {
    const {foto, likeCallback} = this.props;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{uri: foto.urlFoto}} style={styles.foto} />

        <View style={styles.rodape}>
          <Likes likeCallback={likeCallback} foto={foto} />
          {this.exibeLegenda(foto)}
          {foto.comentarios.map(comentario => (
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          ))}
          <InputComentario comentarioCallback={this.adicionaComentario} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  foto: {
    width: width,
    height: width,
  },
  rodape: {
    margin: 10,
  },
  botaoDeLike: {
    height: 40,
    width: 40,
  },
  likes: {
    fontWeight: 'bold',
  },
  comentario: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icone: {
    height: 30,
    width: 30,
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
