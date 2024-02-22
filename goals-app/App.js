import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  
  function addGoalHandler(enteredGoalText) {
    console.log('Button was pressed');
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {key: Math.random().toString(), text: enteredGoalText},
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    console.log('Item was pressed');
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
    <StatusBar style="auto" />
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="darkblue"
        onPress={startAddGoalHandler} />
      <GoalInput onAddGoal={addGoalHandler} isVisible={modalIsVisible} onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <ScrollView alwaysBounceVertical={false}>
        <Text>List of goals</Text>
        {courseGoals.map((goal, index) => 
          <View style={styles.goalItem} key={'scroll-view-'+index}>
          <Text style={styles.goalText} key={'scroll-goalText-'+index}>{goal.text}</Text>
          </View>
        )}
        </ScrollView>
      </View>

      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals}
        renderItem={itemData => {
          return <GoalItem
          text={itemData.item.text}
          id={itemData.item.key}
          onDeleteItem={deleteGoalHandler} />
        }}
        keyExtractor={(item, index) => {
          return item.key;
        }} 
        alwaysBounceVertical={false}>
        </FlatList>
      </View>

      <View style={styles.boxContainer}>
        <View style={[styles.boxStyle, {flex: 1}]}>
          <Text style={styles.textInsideBox}>Box 1</Text>
        </View>
        <View style={[styles.boxStyle, {backgroundColor: 'green', flex: 2}]}>
          <Text style={styles.textInsideBox}>Box 2</Text>
        </View>
        <View style={[styles.boxStyle, {backgroundColor: 'blue', flex: 3}]}>
          <Text style={styles.textInsideBox}>Box 3</Text>
        </View>
      </View>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  boxContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  boxStyle: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInsideBox: {
    color: 'white',
  },
  goalsContainer: {
    flex: 2
  },
  goalItem: {
    margin: 8,
    padding: 10,
    backgroundColor: '#5e0acc',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
  },
  goalText: {
    color: 'white',
  }
});
