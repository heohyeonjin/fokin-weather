import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; //자바스크립트와 안드로이드 ios의 네이티브 텍스트, 뷰를 이어주는 브릿지

export default function Loading(){
return <View style = {styles.container}>
<Text>Getting the fucking weather</Text>
</View>
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        justifyContent: "flex-end",
        paddingHorizontal : 30,
        paddingVertical : 100,
        backgroundColor :"#FDF6AA"
    },
    text:{
        color: "#2c2c2c",
        fontSize: 30
    }
});