import Toast from 'react-native-root-toast';

export default class CustomToast {
  static show(message: string) {
    return (
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true
      })
    )
  }
    
}
