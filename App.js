import React from 'react';
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
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: data,
      task: "",
      modalVisible: false,
      valueEdit:"",
      idEdit:""
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
  }

  deleteItem = (id) => {
    let newList = this.state.list;
    let itemDel = newList.findIndex(e => e.id === id);
    newList.splice(itemDel, 1);
    this.setState({list: newList});
  };
  toggleModalEdit = (id) => {
    let newList = this.state.list;
    let itemEdit = newList.find(e => e.id === id);
    this.setState({
      valueEdit: itemEdit.task,
      idEdit: itemEdit.id,
      modalVisible: true
    })
  }
  editItem = () =>{
    const {idEdit, valueEdit} = this.state;
    let newList = this.state.list;
    let itemDel = newList.findIndex(e => e.id === idEdit);
    let editItem = {
      id: idEdit,
      task: valueEdit
    };
    newList.splice(itemDel, 1, editItem);
    this.setState({
      list: newList,
      modalVisible: false
    })
  }
  render() {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal animationType="slide"
                 transparent={true}
                 visible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
                  value={this.state.valueEdit}
                  onChangeText={(task) => this.setState({valueEdit: task})}
                />
                <Button
                  title="Edit"
                  onPress={()=>
                  {
                    this.editItem()
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => this.setState({modalVisible:false})}
                />
              </View>
            </View>

          </Modal>
        </View>

        <Text>My todo app</Text>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={task => this.setState({task: task})}
            value={this.state.task}
            placeholder="Typing task"
          />
          <Button
            title="Add"
            onPress={() => {
              let newList = this.state.list;
              let l = newList.concat({id: Math.random().toString(), task: this.state.task});
              this.setState({list: l})
              this.setState({task: ""})
              }
            }
          />
        </View>
        <View>
          <FlatList
            data={this.state.list}
            renderItem={({item}) => (
              <View>
                <Text key={item.id}>{item.task}</Text>
                <Button title="Del" onPress={() => this.deleteItem(item.id)}/>
                <Button title="Edit" onPress={() => this.toggleModalEdit(item.id)}/>
              </View>

            )}
          />
        </View>
      </View>
    );
  }


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