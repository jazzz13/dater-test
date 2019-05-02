import React from 'react';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import {
  Container, Content, List, ListItem, Text, View, Button, Segment, Spinner
} from 'native-base';
import { GAME } from '../../redux/actions';
import rawStyles from './styles';
import { stateDescription } from './helpers';

const styles = StyleSheet.create(rawStyles);

class Playground extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: navigation.getParam('title'),
      headerRight: (
        navigation.getParam('showSpinner')
            && <Spinner />
      ),
    });

    componentWillReceiveProps({ title, showSpinner }) {
      if (this.props.title !== title) {
        this.props.navigation.setParams({ title });
      }

      if (this.props.showSpinner !== showSpinner) {
        this.props.navigation.setParams({ showSpinner });
      }
    }

    componentWillUnmount() {
      this.props.exitAction();
    }

    makeAction = () => {
      const {
        player, gameId, actionAction, answer
      } = this.props;

      actionAction({
        gameId,
        player,
        rivalDigit: answer.rivalDigit,
        myDigit: answer.myDigit,
      });
    };

    render() {
      const {
        disabledSegment,
        disabledTextInput,
        disabledActionButton,
        updateAction,
        answer,
        players,
        winner,
        currentPlayer,
      } = this.props;

      return (
        <Container>
          <Content contentContainerStyle={styles.content}>
            <View style={styles.rivalBlock}>
              <Text style={styles.rivalBlockText}>Число предыдущего игрока:</Text>
              <Segment style={styles.segment}>
                <Button
                  first
                  active={answer.rivalDigit === 'even'}
                  disabled={disabledSegment}
                  bordered={disabledSegment}
                  onPress={() => updateAction({ rivalDigit: 'even' })}
                >
                  <Text>четное</Text>
                </Button>
                <Button
                  last
                  active={answer.rivalDigit === 'odd'}
                  disabled={disabledSegment}
                  bordered={disabledSegment}
                  onPress={() => updateAction({ rivalDigit: 'odd' })}
                >
                  <Text>нечетное</Text>
                </Button>
              </Segment>
            </View>
            <View style={styles.yourBlock}>
              <Text style={styles.yourBlockText}>Ваша цифра:</Text>
              <TextInput
                placeholder="от 0 до 9"
                keyboardType="number-pad"
                style={disabledTextInput ? styles.textInputDisabled : styles.textInput}
                value={answer.myDigit}
                editable={!disabledTextInput}
                onChangeText={text => updateAction({ myDigit: text })}
              />
            </View>
            <View style={styles.actionButtonBlock}>
              <Button
                primary={!disabledActionButton}
                disabled={disabledActionButton}
                bordered={disabledActionButton}
                onPress={this.makeAction}
              >
                <Text>Сделать ход</Text>
              </Button>
            </View>
            {
                    players
                    && (
                    <List style={styles.list}>
                      {
                                players.map(({ name, score }) => (
                                  <ListItem key={name}>
                                    <Text style={{ fontWeight: currentPlayer === name ? 'bold' : 'normal' }}>
                                      {`Игрок: ${name}, очки: ${score}${winner === name ? ' - победитель!' : ''}`}
                                    </Text>
                                  </ListItem>
                                ))
                            }
                    </List>
                    )
                }
          </Content>
        </Container>
      );
    }
}

export default connect(
  ({ game }) => {
    const cantMakeAction = !game.myAction || game.action || game.gameData.state !== 'play';
    const answerIncomplete = !/^\d$/.test(game.answer.myDigit) || (!game.notActions && !game.answer.rivalDigit);

    return {
      player: game.player,
      gameId: game.id,
      answer: game.answer,
      currentPlayer: game.gameData.currentPlayer,
      winner: game.gameData.winner,
      title: stateDescription(game.gameData, game.player),
      showSpinner: game.action,
      players: game.gameData.players,
      disabledSegment: cantMakeAction || game.notActions,
      disabledTextInput: cantMakeAction,
      disabledActionButton: cantMakeAction || answerIncomplete,
    };
  },
  {
    updateAction: GAME.UPDATE,
    actionAction: GAME.ACTION,
    exitAction: GAME.EXIT,
  }
)(Playground);
