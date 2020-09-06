import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Linking} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleTitle: "",
            articleInfo: "",
            articleURL: ""
        };
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.handleClick()
    }
    handleClick(event) {
        fetch('http://172.16.3.77:8081/random')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({articleTitle: responseJson.title, articleInfo: responseJson.info, articleURL: responseJson.url})
            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {
        return (
          <View>
              <Text style={styles.title}>Your article for the day:</Text>
              <Text style={styles.thought}>{this.state.articleTitle}</Text>
              <Text style={styles.title}>Read More Here:</Text>
              <Text style={styles.url} onPress={() => Linking.openURL(this.state.articleURL)}>{this.state.articleURL}</Text>
              <TouchableHighlight onPress={this.handleClick} underlayColor="white">
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Get a random article!</Text>
                  </View>
              </TouchableHighlight>
              <ScrollView>
                  <Text style={styles.info}>
                      {this.state.articleInfo}
                  </Text>

              </ScrollView>

          </View>
        );
      }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 25,
        color: "dodgerblue",
        fontWeight: "bold",
        fontSize: 30
    },
    thought: {
        color: "crimson",
        fontSize: 25
    },
    info: {
        color: "black",
        marginTop: 10,
        fontSize: 16
    },
    url: {
        color: "blue",
        fontSize: 18
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});
