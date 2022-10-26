import React, { useReducer, useState } from "react";
import "../App.css";
import { Input, Button, Container } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

function TodolistReducer() {
  const [state, setState] = useState({
    id: null,
    taskname: String,
  });

  function reducerFn(state, action) {
    switch (action.type) {
      case "ADD_TASK":
        console.log("data", action.data);
        return [...state, action.data];
      case "DELETE_TASK":
        return state.filter((task) => task.id !== action.data.id);
      case "UPDATE_TASK":
        return [
          ...state.filter((task) => task.id !== action.data.id),
          action.data,
        ];
      default:
        break;
    }
  }
  const [task, dispatch] = useReducer(reducerFn, []);

  function handleAddTask() {
    console.log("state id", state.taskname);
    const { taskname } = state;
    if (taskname === "") {
      alert("empty");
      return;
    }
    dispatch({
      type: "ADD_TASK",
      data: { id: uuidv4(), taskname },
    });
    setState({
      taskname: String,
    });
  }

  function handleDeleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      data: { id },
    });
  }

  function handleUpdateTask() {
    const { taskname } = state;
    dispatch({
      type: "UPDATE_TASK",
      data: { id: state.id, taskname },
    });
    setState({
      taskname: String,
    });
  }

  function startUpdateTask(id) {
    setState({ ...task.filter((task) => task.id === id)[0], id });
  }

  function handleChange(e) {
    setState((prev) => ({ ...prev, taskname: e.target.value }));
  }
  return (
    <Container>
      <h3 className="text-white">CRUD REDUCER</h3>
      <div className="d-flex mt-5 mb-5 align-items-center justify-content-center">
        <Input
          className="input-list border-transparent bg-transparent"
          name="taskname"
          onChange={handleChange}
        />
        <Button
          color="info"
          outline
          className="button-list"
          onClick={state.id ? handleUpdateTask : handleAddTask}
        >
          {state.id ? "Save task" : "Add task"}
        </Button>
      </div>

      <div className="box">
        {task.length > 0
          ? task.map((item, key) => {
              return (
                <div key={key} className="box-list">
                  <p>{item.taskname}</p>
                  <Button
                    onClick={() => startUpdateTask(item.id)}
                    className="m-1"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteTask(item.id)}
                    className="m-1"
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          : "tidak ada"}
      </div>
    </Container>
  );
}
export default TodolistReducer;
