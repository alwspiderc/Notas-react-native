import { SafeAreaView, StatusBar, StyleSheet, FlatList} from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, criaTabela } from "./src/servicos/Notas"

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()

    console.log("documentDirectory: ", FileSystem.documentDirectory)
   Sharing.shareAsync(
      
    FileSystem.documentDirectory + 'SQLite/sqlite.db',
      {dialogTitle: 'share or copy your DB via'}
      
    ).catch(error =>{
      console.log(error);
    })
    
  }, [])
 
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

