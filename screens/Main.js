import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, AsyncStorage, TouchableOpacity, RefreshControl } from 'react-native';
import { CardItem, Container, Title, Header, Content, Card } from 'native-base';

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            eile: [],
            ats: [],
            randomName: '',
            pageNumber: 29,
            nextNumber: 29,
            refreshing: false,
            myArray : [
                "Bob",
                "Cinnamon",
                "Carrots",
                "Copper",
                "Chestnut",
                "Cheetah",
                "Cinder",
                "Citrus",
                "Coffee",
                "Celina",
                "Tigger",
                "Paprika",
                "Winnie",
                "Tiger",
                "Charlie",
                "Lioness",
                "Pumpkin",
            ]
        }
    }

    static navigationOptions = {
        title: 'All Kittens',
    }

    changeNumber30 = () => {
        this.setState({
            nextNumber: 29,
        },
        () => {this.handleRefresh()})
    }
    changeNumber50 = () => {
        this.setState({
            nextNumber: 49,
        },
        () => {this.handleRefresh()})
    }
    changeNumber100 = () => {
        this.setState({
            nextNumber: 99,
        },
        () => {this.handleRefresh()})
    }





    saveItem = () => {
        for (var f = 0; f <= this.state.pageNumber; f++) {
            var randomItem = this.state.myArray[Math.floor(Math.random() * this.state.myArray.length)];
            let object = {
                id: f.toString(),
                name: randomItem,
                uri: 'https://placekitten.com/440/300?image=' + `${Math.floor(Math.random() * 17)}`,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            }
            this.setState({
                eile: this.state.eile.push(object),
            })
        }
        AsyncStorage.setItem("array1", JSON.stringify(this.state.eile));
    }

    refresedItem = async () => {
        for (var f = 0; f <= this.state.pageNumber; f++) {

            var randomItem = this.state.myArray[Math.floor(Math.random() * this.state.myArray.length)];
            let object = {
                id: f.toString(),
                name: randomItem,
                uri: 'https://placekitten.com/440/300?image=' + `${Math.floor(Math.random() * 17)}`,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            }
            this.setState({
                eile: this.state.eile.push(object),
            })
        }

        AsyncStorage.setItem("array1", JSON.stringify(this.state.eile));
        let user = await AsyncStorage.getItem("array1");
        let next = await JSON.parse(user);
        this.setState({ ats: next, refreshing: false, })
    }

    gautiAts = async () => {
        let user = await AsyncStorage.getItem("array1");
        let next = await JSON.parse(user)
        this.setState({ ats: next, refreshing: false, })
        console.log(this.state.ats)
    }
    componentWillMount() {
        this.saveItem();
        this.gautiAts();
    }

    handleRefresh = () => {
        AsyncStorage.clear();
        this.setState({
            refreshing: true,
            pageNumber: this.state.nextNumber,
            eile: [],
            ats: [],
        },
            () => { this.refresedItem() })
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                    <TouchableOpacity style={styles.button} onPress={this.changeNumber30}>
                        <Text>30</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.button} onPress={this.changeNumber50}>
                        <Text>50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.changeNumber100}>
                        <Text>100</Text>
                    </TouchableOpacity>
                </View>
                <FlatList style={{ marginTop: 12 }}
                    data={this.state.ats}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', height: 330 }}>
                            <Content>
                                <Card>
                                    <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{item.name}</Text>
                                    </CardItem>
                                    <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => navigate("Details", { item1: item })}>
                                            <Image style={{ resizeMode: 'cover', width: 300, height: 250, borderRadius: 10 }} source={{ uri: item.uri }} />
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
                            </Content>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: "lightseagreen",
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderTopWidth: 1,
        marginTop: 10,
        marginRight: 1
    },
});