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
  const [pokemon, setPokemon] = useState({} as Pokemon);
  const [name, setName] = useState<string>("");
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("");

  const calc = (name: string) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const num = sum % 1025;
    fetchPokemon(num);
  };

  const fetchPokemon = async (num: number) => {
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

  const fetchVersion = async () => {
    try {
      const response = await fetch("/version.json");
      const data = await response.json();
      setVersion(data);
      console.log("Version:", version);
    } catch (error) {
      console.error("Error fetching version data:", error);
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontSize: 30,
          margin: 10,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Quel Pokemon es-tu ?
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        {pokemon.name?.fr}
        {isShiny ? " shiny" : ""}
      </Text>
      <Image
        style={{
          width: "50%",
          height: "50%",
          margin: 20,
          resizeMode: "contain",
        }}
        source={{
          uri: isShiny ? pokemon.sprites?.shiny : pokemon.sprites?.regular,
        }}
      />
      <Button
        title={isShiny ? "○ Normal ○ " : "♦ Shiny ♦"}
        onPress={() => setIsShiny(!isShiny)}
      />
      <View style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
        <Text style={{ fontSize: 16 }}>Votre nom :</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Entrer votre nom"
          style={{
            marginTop: 5,
            padding: 8,
            borderWidth: 1,
            borderRadius: 8,
            width: "100%",
          }}
        />
      </View>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Version: {version}</Text>
    </View>
  );
}
