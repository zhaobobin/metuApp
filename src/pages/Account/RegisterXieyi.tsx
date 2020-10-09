import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import htmlContent from '@/pages/Other/ServiceHtml';

class RegisterXieyi extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <HTMLView value={htmlContent} stylesheet={styles} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50
  },
  a: {
    fontWeight: '300',
    color: '#FF3366'
  }
});

export default RegisterXieyi;
