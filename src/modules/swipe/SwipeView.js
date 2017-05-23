import React, { PropTypes, Component } from 'react';
import {
  Platform,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import Icona from 'react-native-vector-icons/FontAwesome';
import SwipeCards from 'react-native-swipe-cards';
import Player from '../../components/Player/Player';
import {
  AdMobBanner,
} from 'react-native-admob';

const Cards = [{
  id: 1,
  title: 'WTF with Maron',
  likes: 21,
  friends: 9,
  interests: 38,
  image: 'http://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
  song: {
    title: 'Episode 801 - Anne Hathaway / Aimee Mann',
    poster: 'http://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
    uri: 'http://traffic.libsyn.com/wtfpod/WTF_-_EPISODE_801_ANNE_HATHAWAY.mp3?dest-id=14434',
  }
}, {
  id: 2,
  title: "Episode 800 - Jeff Ross",
  likes: 27,
  friends: 16,
  interests: 49,
  image: 'http://images.junostatic.com/full/CS2032801-02A-BIG.jpg',
  song: {
    title: 'You Should Know (feat. Ruckazoid)',
    poster: 'http://images.junostatic.com/full/CS2032801-02A-BIG.jpg',
    uri: 'https://api.soundcloud.com/tracks/254196631/stream?client_id=8a754483a114344c70ab15f20a5035ab',
  }
}, {
  id: 3,
  title: 'Episode 800 - Jeff Ross',
  likes: 29,
  friends: 2,
  interests: 39,
  image: 'http://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
  song: {
    title: 'Bedtime Stories Mix',
    poster: 'ttp://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
    uri: 'https://api.soundcloud.com/tracks/99516198/stream?client_id=8a754483a114344c70ab15f20a5035ab',
  }
}, {
  id: 4,
  title: '256 - The Boston Police Strike - Live',
  likes: 20,
  friends: 18,
  interests: 50,
  image: 'http://static.libsyn.com/p/assets/1/9/f/e/19fe30636b5553b5/Screen_Shot_2017-04-10_at_1.29.57_AM.pngg',
  song: {
    title: 'Nightcall',
    poster: 'http://static.libsyn.com/p/assets/1/9/f/e/19fe30636b5553b5/Screen_Shot_2017-04-10_at_1.29.57_AM.png',
    uri: 'http://traffic.libsyn.com/thedollop/FinnAds.mp3?dest-id=139738',
  }
}, {
  id: 5,
  title: 'Julie',
  likes: 28,
  friends: 2,
  interests: 13,
  image: 'http://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
  song: {
    title: 'Baby',
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/48/Pnau_alternate_cover.jpg',
    uri: 'https://api.soundcloud.com/tracks/9737435/stream?client_id=8a754483a114344c70ab15f20a5035ab',
  }
}, {
  id: 6,
  title: 'Anna',
  likes: 24,
  friends: 12,
  interests: 44,
  image: 'http://static.libsyn.com/p/assets/d/e/2/3/de23e19d9c4388c2/WTF_-_new_larger_cover.jpg',
  song: {
    title: 'Baby',
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/48/Pnau_alternate_cover.jpg',
    uri: 'https://api.soundcloud.com/tracks/9737435/stream?client_id=8a754483a114344c70ab15f20a5035ab',
  }
}];
/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class SwipeView extends Component {
  static displayName = 'SwipeView';

  static navigationOptions = {
    title: 'PodSwipe',
    tabBar: () => ({
      icon: (props) => (
        <Icon
          name='menu'
          size={24}
          color={props.tintColor}/>
      )
    }),
    drawerLabel: 'PodSwipe',
    drawerIcon: (props) => (
      <Icon
        name='menu'
        color={props.tintColor}
      />
    ),
    // TODO: move this into global config?
    header: {
      tintColor: 'white',
      style: {
        backgroundColor: '#424142'
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      index: 0,
      song: Cards[0].song,
      cards: Cards,
    };
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  Card(x) {
    return (
      <View style={styles.card} elevation={2}>
        <Image source={{uri: x.image, cache: 'only-if-cached', width: 32, height: 32}} resizeMode='cover'
               style={{
                 flex: 3,
                 width: '100%',
                 height: '100%',
                 borderTopLeftRadius: 4,
                 borderTopRightRadius: 4
               }}/>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', margin: 15, marginTop: 20, flex: 3}}>
            <Text style={{fontSize: 20, fontWeight: '300', color: '#444'}}>{x.title}, </Text>
            <Text style={{fontSize: 21, fontWeight: '200', color: '#444'}}>{x.likes}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{
              padding: 13,
              borderLeftWidth: 1,
              borderColor: '#e3e3e3',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}><Icon name='people-outline' size={20} color='#777' style={{}}/><Text
              style={{fontSize: 16, fontWeight: '200', color: '#555'}}>{x.friends}</Text></View>
            <View style={{
              padding: 13,
              borderLeftWidth: 1,
              borderColor: '#e3e3e3',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}><Icon name='import-contacts' size={20} color='#777'/><Text
              style={{fontSize: 16, fontWeight: '200', color: '#555'}}>{x.interests}</Text></View>
          </View>
        </View>
      </View>
    );
  }

  loadNextSong() {
    const newIndex = Math.min(this.state.index + 1, Cards.length - 1)
    setTimeout(() => {
      this.setState({song: Cards[newIndex].song, index: newIndex});
    }, 1000);
  }

  handleMaybe(card) {
    console.log(`Maybe for ${card.title}`);
    this.loadNextSong();
  }

  handleYup(card) {
    console.log(`Yup for ${card.title}`);
    this.loadNextSong();
  }

  handleNope(card) {
    console.log(`Nope for ${card.title}`);
    this.loadNextSong();
  }

  noMore() {
    return (
      <View style={styles.card}>
        <Text>No More Cards</Text>
      </View>
    );
  }

  yup() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  nope() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  open = () => {
    this.props.navigate({routeName: 'Swipe'});
  };

  render() {
    return (
      <View style={[styles.container, {}]}>
        <AdMobBanner
          elevation={10}
          bannerSize="banner"
          adUnitID="ca-app-pub-8400656402787021/4043926771"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={(error) => console.log('adMobError', error)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            left: 0, right: 0,
            backgroundColor: '#f1f1f1',
            height: 60
          }}/>
        <SwipeCards
          ref={'swiper'}
          cards={this.state.cards}
          containerStyle={{backgroundColor: '#f7f7f7', alignItems: 'center', margin: 50}}
          renderCard={(cardData) => this.Card(cardData)}
          yupView={<Icona name='thumbs-o-up' size={45} color='#000'
                          style={{}}/>}
          noView={<Icona name='thumbs-o-down' size={45} color='#000'
                         style={{}}/>}
          renderNoMoreCards={() => this.noMore()}
          handleMaybe={this.handleMaybe.bind(this)}
          handleYup={this.handleYup.bind(this)}
          handleNope={this.handleNope.bind(this)}/>
        <View elevation={10} style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          padding: 10,
          backgroundColor: '#f1f1f1',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 3,
          shadowOpacity: 0.5
        }}>
          <TouchableOpacity style={[styles.buttons, {marginRight: 8}]} onPress={() => this.nope()}>
            <Iconz name='ios-close' size={45} color='#fff' style={{}}/>
          </TouchableOpacity>
          <Player style={[styles.buttons, styles.playPauseButton]} song={this.state.song}/>
          <TouchableOpacity style={[styles.buttons, {marginLeft: 8}]} onPress={() => this.yup()}>
            <Iconz name='ios-heart' size={36} color='#fff' style={{marginTop: 5}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSmall} onPress={() => this.setModalVisible()}>
            <Iconz name='ios-information' size={25} color='#888' style={{}}/>
          </TouchableOpacity>
        </View>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    backgroundColor: '#f5f5f5'
  },
  playPauseButton: {
    height: 90,
    width: 90,
    borderWidth: 0,
  },
  buttons: {
    width: 70,
    height: 70,
    borderWidth: 8,
    backgroundColor: '#333',
    borderColor: '#fbfbfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  buttonSmall: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 4,
    borderColor: '#fbfbfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    top: 10,
    right: 10
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 4,
    ...Platform.select({
      android: {
        //borderWidth: 2,
        //borderColor: '#b4b4b4'
      },
    }),
    backgroundColor: '#FFFFFF',
    height: 420,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.2
  }
});

export default SwipeView;
