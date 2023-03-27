import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Emoji from 'react-native-emoji';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_2 from 'react-native-vector-icons/Fontisto';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.reward-dragon.com:8000/customers/customer-josh-reason-today/?user_profile=500',
          {
            headers: {
              Authorization: 'c3fb04334a7c647338cdfd500e2997bb9898cf52',
            },
          },
        );
        const json = await response.json();
        setData(json.moodalytics);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const createdDates = data.map(el => el.created_at);
  const emoji_point = data.map(el => el.emoji_point);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile__container}>
        <Image
          style={styles.profile__pic}
          source={{
            uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/09/professional-mens-hairstyles-combed-min-1024x683.jpg',
          }}
        />
        <View>
          <Text style={styles.developer__name}>Alok Maurya</Text>
          <Text style={styles.developer__position}>Developer</Text>
        </View>
      </View>

      <LinearGradient
        colors={['gray', '#252525', 'black']}
        style={styles.developer__mood__container}>
        <Text style={styles.text1}>
          How's the <Text style={styles.mood__text}> Mood</Text>
        </Text>

        <Text style={styles.text2}>Today</Text>
        <View style={styles.emoji__container}>
          <Emoji name="smile" style={styles.emoji__size} />
          <Emoji name="innocent" style={styles.emoji__size} />
          <Emoji name="neutral_face" style={styles.emoji__size} />
          <Emoji name="pensive" style={styles.emoji__size} />
          <Emoji name="angry" style={styles.emoji__size} />
        </View>
      </LinearGradient>
      <View style={styles.horizontal__line} />
      <View style={styles.team__mood__container}>
        <Icon name="speedometer" size={30} color={'#ffd03e'} />
        <Text style={styles.team__mood__text}>Team Mood</Text>
        <View style={styles.horizontal__line} />
      </View>
      <View style={styles.team__feeling__container}>
        <View style={styles.team__status__container}>
          <Icon_2 name="quote-a-right" size={10} color={'#ffd03e'} />
          <Text style={styles.team__feeling}>
            The team is feeling good today
          </Text>
          <Icon_2
            name="quote-a-left"
            size={10}
            color={'#ffd03e'}
            style={styles.quote__icon}
          />
        </View>
        <View style={styles.innocent__emoji}>
          <Emoji name="innocent" style={styles.emoji__size} />
        </View>
      </View>
      <View style={styles.moodalytics__container}>
        <View style={styles.emojiMood__view}>
          <Emoji name="innocent" style={styles.emoji__size} />
          <Text style={{marginLeft: 10, color: 'white'}}>Moodalytics</Text>
        </View>
        <Text style={{color: 'white', fontSize: 10}}>
          (Trend chart on Mood)
        </Text>
      </View>

      <View>
        <LineChart
          data={{
            labels: createdDates,
            datasets: [
              {
                data: emoji_point,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: 'black',
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'black',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '1',
              stroke: 'green',
            },
          }}
          style={styles.lineChart}
        />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {backgroundColor: '#252525'},

  profile__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile__pic: {
    margin: 10,
    height: 50,
    width: 50,
    borderRadius: 999,
  },
  developer__name: {
    color: 'white',
    fontSize: 18,
  },
  developer__position: {
    color: 'white',
  },
  developer__mood__container: {
    margin: 10,
    borderColor: '#ffd03e',
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 10,
    height: 170,
  },
  text1: {
    color: 'white',
    fontSize: 18,
  },
  mood__text: {
    color: '#ffd03e',
  },
  text2: {
    color: 'white',
    fontSize: 18,
  },
  emoji__container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  emoji__size: {
    fontSize: 30,
  },
  horizontal__line: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    height: 1,
    flex: 1,
    borderBottomColor: 'white',
  },
  team__mood__container: {
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  team__mood__text: {
    color: 'white',
    marginLeft: 10,
  },
  team__feeling__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffd03e',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  team__status__container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 190,
  },
  team__feeling: {
    color: 'white',
    marginHorizontal: 10,
  },
  innocent__emoji: {marginLeft: 30},
  quote__icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  moodalytics__container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiMood__view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
