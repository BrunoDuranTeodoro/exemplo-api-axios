import axios from "axios";
import { useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [quantidade, setQuantidade] = useState("1"); 

  async function buscar() {
    if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0) {
      Alert.alert("Erro", "Digite um número válido maior que 0");
      return;
    }

    try {
      const qtd = Number(quantidade);
      const fetchedImages = [];

      for (let i = 0; i < qtd; i++) {
        const result = await axios.get("https://dog.ceo/api/breeds/image/random");
        fetchedImages.push(result.data.message);
      }

      setDogs(fetchedImages);
    } catch (error) {
      Alert.alert("Erro de rede", "Não foi possível buscar imagens. Tente novamente.");
      console.log(error);
    }
  }

  const _render = () => {
    return dogs.map((url, index) => (
      <View style={styles.card} key={index}>
        <Image
          source={{ uri: url }}
          style={{ width: 500, height: 500 }}
          resizeMode="cover"  
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quantas imagens?"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <Button title="Buscar Cachorros 🐶" onPress={buscar} />
      <ScrollView>{_render()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 8,
    textAlign: "center",
  },
});
