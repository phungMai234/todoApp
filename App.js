import React , {useState} from 'react';
import {Text, View, TextInput, Button, FlatList, Modal, StyleSheet} from 'react-native';

const data = [
  {
    id: Math.random().toString(),
    task: 'speaking E'
  },
  {
    id: Math.random().toString(),
    task: 'listening E'
  },
  {
    id: Math.random().toString(),
    task: 'clean house'
  }
];
export default function App() {
  const [list, setList] = useState(data);
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [valueEdit, setValueEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const deleteItem = (id) => {
    let newList = list;
    let itemDel = newList.findIndex(e => e.id === id);
    newList.splice(itemDel, 1);
    setList(newList);
  };
  const toggleModalEdit = (id) => {
    let newList = list;
    let itemEdit = newList.find(e => e.id === id);

    setValueEdit(itemEdit.task);
    setIdEdit(itemEdit.id);
    setModalVisible(true);

  }
  const editItem = () =>{
    let newList = list;
    let itemDel = newList.findIndex(e => e.id === idEdit);
    let editItem = {
      id: idEdit,
      task: valueEdit
    };
    newList.splice(itemDel, 1, editItem);
    setList(newList);
    setModalVisible(false);

  }
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal animationType="slide"
                 transparent={true}
                 visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
                  value={valueEdit}
                  onChangeText={(task) => setValueEdit(task)}
                />
                <Button
                  title="Edit"
                  onPress={()=>
                  {
                    editItem()
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>

          </Modal>
        </View>

        <Text>My todo app</Text>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={task => setTask(task)}
            value={task}
            placeholder="Typing task"
          />
          <Button
            title="Add"
            onPress={() => {
              let newList = list;
              let l = newList.concat({id: Math.random().toString(), task:task});
              setList(l);
              setTask("")
              }
            }
          />
        </View>
        <View>
          <FlatList
            data={list}
            renderItem={({item}) => (
              <View>
                <Text key={item.id}>{item.task}</Text>
                <Button title="Del" onPress={() => deleteItem(item.id)}/>
                <Button title="Edit" onPress={() => toggleModalEdit(item.id)}/>
              </View>

            )}
          />
        </View>
      </View>
    );


}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});