import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Object>({});
  const [name, setName] = useState<string>("");

  const calc = (name: string) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const num = sum % 1025;
    fetchPokemon(num);
  };

  const fetchPokemon = async (num) => {
    console.log("Request");
    try {
      const response = await fetch(
        "https://tyradex.tech/api/v1/pokemon/" + num.toString()
      );
      const data = await response.json();
      setPokemon(data);
      console.log(response.status, " pokemon/" + num.toString());
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    calc(name);
  }, [name]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Quel Pokemon es-tu ?
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {pokemon.name?.fr}
      </Text>
      <Image
        style={{
          width: "50%",
          height: "50%",
          margin: 8,
          resizeMode: "contain",
        }}
        source={{ uri: pokemon.sprites?.regular }}
      />
      <Text style={{ fontSize: 16, textAlign: "center" }}>Votre nom :</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={{
          margin: 8,
          padding: 8,
          borderWidth: 1,
          borderRadius: 8,
          width: "30%",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
