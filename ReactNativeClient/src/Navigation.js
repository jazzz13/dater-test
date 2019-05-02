import { createStackNavigator, createAppContainer } from 'react-navigation';
import Games from './screens/Games/Games';
import Playground from './screens/Playground';

const MainStack = createStackNavigator(
  {
    Games,
    Playground,
  },
  {
    initialRouteName: 'Games',
  }
);

export default createAppContainer(MainStack);
