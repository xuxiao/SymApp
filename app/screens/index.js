import React from 'react';
import {
    Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListScreen from './list';
import DetailScreen from './detail';


const IndexScreen = StackNavigator({
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen },
});

IndexScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('../images/article.png')}
            style={[{tintColor: tintColor}]}
        />
    )
}

export default IndexScreen;