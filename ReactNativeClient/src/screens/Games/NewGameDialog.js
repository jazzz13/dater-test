import React from 'react';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { NEW_GAME } from '../../redux/actions';

const BUTTON_COLOR = '#007ff9';
const DISABLED_BUTTON_COLOR = 'silver';

class NewGameDialog extends React.Component {
    registrationHandler = () => {
      const { nickNameValue, playersCountValue, registerAction } = this.props;

      registerAction({
        nickName: nickNameValue,
        playersCount: playersCountValue,
      });
    };


    render() {
      const {
        visible,
        nickNameValue,
        playersCountValue,
        createButtonActive,
        registration,
        // actions
        cancelAction,
        updateAction
      } = this.props;

      return (
        <Dialog.Container visible={visible}>
          <Dialog.Title>Новая игра</Dialog.Title>
          <Dialog.Description>
            {registration ? 'Создание...' : 'Выберите никнейм и количество игроков'}
          </Dialog.Description>
          {
                    !registration
                    && (
                    <React.Fragment>
                      <Dialog.Input
                        placeholder="Никнейм"
                        value={nickNameValue}
                        onChangeText={value => updateAction({ nickName: value })}
                      />
                      <Dialog.Input
                        placeholder="Количество игроков"
                        value={playersCountValue}
                        onChangeText={value => updateAction({ playersCount: value })}
                      />
                    </React.Fragment>
                    )
                }
          <Dialog.Button
            label="Отмена"
            onPress={() => cancelAction()}
          />
          <Dialog.Button
            label="Создать"
            bold
            disabled={!createButtonActive}
            color={createButtonActive ? BUTTON_COLOR : DISABLED_BUTTON_COLOR}
            onPress={this.registrationHandler}
          />
        </Dialog.Container>
      );
    }
}

export default connect(
  ({ newGame }) => ({
    nickNameValue: newGame.nickName,
    playersCountValue: newGame.playersCount,
    createButtonActive: newGame.isValid && !newGame.registration,
    registration: newGame.registration
  }),
  {
    cancelAction: NEW_GAME.CANCEL,
    updateAction: NEW_GAME.UPDATE,
    registerAction: NEW_GAME.REGISTER,
  }
)(NewGameDialog);
