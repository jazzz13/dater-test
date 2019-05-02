import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Container, Content, List, ListItem, Text, Spinner, View, Button
} from 'native-base';
import { JOIN_GAME, GAMES, NEW_GAME } from '../../redux/actions';
import rawStyles from './styles';
import NewGameDialog from './NewGameDialog';
import JoinGameDialog from './JoinGameDialog';

const styles = StyleSheet.create(rawStyles);

class Games extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'Игры',
      headerRight: (
        !navigation.getParam('isEmpty')
            && (
            <Button success transparent onPress={() => navigation.getParam('createNewGameAction')()}>
              <Text>Новая</Text>
            </Button>
            )
      ),
    });

    componentDidMount() {
      const {
        requestGamesAction, createNewGameAction, navigation, isEmpty
      } = this.props;

      requestGamesAction();
      navigation.setParams({
        createNewGameAction,
        isEmpty,
      });
    }

    componentWillReceiveProps({ isEmpty, gameId }) {
      if (this.props.isEmpty !== isEmpty) {
        this.props.navigation.setParams({ isEmpty });
      }

      if (gameId && this.props.gameId !== gameId) {
        this.props.navigation.navigate('Playground');
      }
    }

    render() {
      const {
        isLoading,
        isEmpty,
        games,
        isCreatingNewGame,
        isJoiningToGame,
        // actions
        createNewGameAction,
        joinToGameAction
      } = this.props;

      return (
        <Container>
          <Content>
            <NewGameDialog visible={isCreatingNewGame} />
            <JoinGameDialog visible={isJoiningToGame} />
            {
                        isEmpty
                        && (
                        <View style={styles.emptyMessageContainer}>
                          <Text style={styles.emptyMessage}>Список игр пуст</Text>
                          <View>
                            <Button
                              success
                              style={styles.emptyMessageButton}
                              onPress={() => createNewGameAction()}
                            >
                              <Text>Создать игру</Text>
                            </Button>
                          </View>
                        </View>
                        )
                    }
            {
                        isLoading
                        && <Spinner />
                    }
            <List>
              {
                            games.map(({ id, author, state }) => (
                              <ListItem
                                key={id}
                                onPress={() => joinToGameAction({ gameId: id })}
                                disabled={state !== 'waiting'}
                              >
                                <Text>
                                  {`Автор: ${author}, ${state === 'waiting' ? 'ожидает игроков' : 'вход закрыт'}`}
                                </Text>
                              </ListItem>
                            ))
                        }
            </List>
          </Content>
        </Container>
      );
    }
}

export default connect(
  ({
    games, newGame, joinGame, game
  }) => ({

    // games list
    games: games.items,
    isLoading: games.isLoading,
    isEmpty: !games.isLoading && games.items.length === 0,

    // new game
    isCreatingNewGame: newGame.enabled,
    // join game
    isJoiningToGame: joinGame.enabled,
    // game
    gameId: game.id
  }),
  {
    // games list
    requestGamesAction: GAMES.REQUEST,
    // new game
    createNewGameAction: NEW_GAME.START,
    // join game
    joinToGameAction: JOIN_GAME.START,
  }
)(Games);
