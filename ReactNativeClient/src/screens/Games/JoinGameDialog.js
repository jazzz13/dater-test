import React from 'react';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { JOIN_GAME } from '../../redux/actions';

const BUTTON_COLOR = '#007ff9';
const DISABLED_BUTTON_COLOR = 'silver';

class JoinGameDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      nickNameValue: ''
    };
  }

    connectHandler = () => {
      this.props.connectAction({
        nickName: this.state.nickNameValue,
        gameId: this.props.gameId
      });
    };

    updateNickName = (nickNameValue) => {
      this.setState({ nickNameValue });
    };

    render() {
      const {
        visible,
        connection,
        // actions
        cancelAction
      } = this.props;

      const { nickNameValue } = this.state;

      const createButtonActive = !connection && nickNameValue.trim().length > 0;

      return (
        <Dialog.Container visible={visible}>
          <Dialog.Title>Вход</Dialog.Title>
          <Dialog.Description>
            {
                        connection ? 'Подключение...' : 'Выберите никнейм'
                    }
          </Dialog.Description>
          {
                    !connection
                    && (
                    <Dialog.Input
                      placeholder="Никнейм"
                      value={nickNameValue}
                      onChangeText={this.updateNickName}
                    />
                    )
                }
          <Dialog.Button
            label="Отмена"
            onPress={() => cancelAction()}
          />
          <Dialog.Button
            label="Войти"
            bold
            disabled={!createButtonActive}
            color={createButtonActive ? BUTTON_COLOR : DISABLED_BUTTON_COLOR}
            onPress={this.connectHandler}
          />
        </Dialog.Container>
      );
    }
}

export default connect(
  ({ joinGame }) => ({
    gameId: joinGame.gameId,
    connection: joinGame.connection
  }),
  {
    cancelAction: JOIN_GAME.CANCEL,
    connectAction: JOIN_GAME.CONNECT,
  }
)(JoinGameDialog);
