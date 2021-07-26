import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";
const API_KEY = "2f55b8f8120d696ee061400e3ff8226d";
export default class App extends React.Component //function이 아닌 class로 정의하려면 React.Component를 상속받아야함
{ 
  state = {
  isLoading : true
};

//url을 fetch하기 위한 새로운 함수
getWeather = async(latitude,longitude) => {
const { 
  data:{
    main:{temp}, 
    weather
  }
} = await axios.get(
  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
  );
this.setState({
  isLoading: false,
  condition : weather[0].main,
  temp
});
};

getLocation = async() => {
  try { 
    await Location.requestPermissionsAsync(); //권한 인증받기 --> 인증 되었을때, 안되었을때 처리를 try-catch로 분기 설정
    const { coords:{ latitude, longitude } 
   } = await Location.getCurrentPositionAsync(); //location내에 coords object가져와서 longitude랑 latidue값 저장
    //send to API and get weather
    //this.setState()
    this.getWeather(latitude,longitude); 
    console.log({latitude}, {longitude});
  } catch(error){
    //인증이 되지 않았을때
    Alert.alert("Can't find you.", "So sad");
  }
};
componentDidMount(){
  this.getLocation();
}
 render() //React.Component의 하위 class에서 반드시 정의해야 하는 메서드
 { 
   console.log("after render");
   const { isLoading, temp, condition } =  this.state; //초기화
   return isLoading ? (
   <Loading />
   ) : (
     <Weather temp ={Math.round(temp)} condition = {condition}/>
     );
 }

}

//constructor() -> Render() -> componentDidMount() 는 컴포넌트의 인스턴스가 생성되어 DOM상에 삽입될때 이 순으로 호출