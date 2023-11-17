import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorOriginal, setValorOriginal] = useState('33.33333')
  const [valorConvertido, setValorConvertido] = useState ('0')
  

  const handleConverter = async () => {
    //https://economia.awesomeapi.com.br/last/USD-BRL
    let URL = 'https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}'
    try {
      let page = await fetch(URL);
      let json = await page.json();
      console.log(json);
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high)
      let vlEntrada = parseFloat(valorOriginal)
      setValorConvertido((indice*vlEntrada).toFixed(2))
      console.log(indice) 
    } catch (error) {
      setValorConvertido('Erro: ${error.message}')
    }
  }


  const handleLimpar = () => {
    setMoedaOrigem('BRL')
    setMoedaDestino('USD')
    setValorOriginal('33.33333')
    setValorConvertido('')
  }


  return (
    <View style={styles.container}>
      <View>
        <Text>Moeda de Origem</Text>
        <Picker
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaOrigem(itemValue)
          }>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Euro" value="EUR" />
          <Picker.Item label="Dólar Canadense" value="CAD" /> 
          <Picker.Item label="Dólar Americano" value="USD" /> 
        </Picker>
      </View>





      <View>
        <Text>Moeda de Destino</Text>
        <Picker
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaDestino(itemValue)
          }>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Euro" value="EUR" />
          <Picker.Item label="Dólar Canadense" value="CAD" /> 
          <Picker.Item label="Dólar Americano" value="USD" /> 
        </Picker>
      </View>
      <View><Text>Valor a ser convertido</Text><TextInput 
      value={valorOriginal} 
      onChangeText={setValorOriginal} /></View>
      <View>
        <Pressable onPress={handleConverter}><Text>Converter</Text></Pressable>
        <Pressable onPress={handleLimpar}><Text>Limpar</Text></Pressable>
      </View>
      <View>
        <Text>Resultado </Text>
        <Text>{valorConvertido}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
