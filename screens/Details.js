import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { CardItem, Container, Title, Header, Content, Card } from 'native-base'

export default class Details extends React.Component {
    static navigationOptions = {
        title: 'Details',
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card style={{flex:1, flexDirection:'column', alignItems:'center', }}>
                        <CardItem>
                            <Text>{this.props.navigation.state.params.item1.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Image style={{ resizeMode: 'cover', width: 300, height: 350 }} source={{ uri: this.props.navigation.state.params.item1.uri }} />
                        </CardItem>
                        <CardItem>
                            <Text> {this.props.navigation.state.params.item1.description}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        flexDirection: 'column',
    },
});