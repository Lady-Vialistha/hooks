import React, { useState, useReducer } from "react";

export default function FormPerson() {
  const [state, setState] = useState({
    id: null,
    taskname: String,
  });

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "ADD_PERSON":
        console.log("act", action.data);
        return [...state, action.data];
      case "DELETE_PERSON":
        return state.filter((person) => person.id !== action.data.id);
      case "EDIT_PERSON":
        return [
          ...state.filter((person) => person.id !== action.data.id),
          action.data,
        ];
      default:
        break;
    }
  };

  const [person, dispatch] = useReducer(reducerFn, []);

  const addPerson = () => {
    const { taskname } = state;
    if (taskname === "") {
      alert("as");
      return;
    }
    dispatch({
      type: "ADD_PERSON",
      data: { id: person.length + 1, taskname },
    });
    setState({
      taskname: String,
    });
  };

  const deletePerson = (id) => {
    dispatch({
      type: "DELETE_PERSON",
      data: { id },
    });
  };

  const editPerson = () => {
    const { taskname } = state;
    dispatch({
      type: "EDIT_PERSON",
      data: { id: state.id, taskname },
    });
    setState({
      taskname: String,
    });
  };
  const startEdit = (id) => {
    setState({ ...person.filter((person) => person.id === id)[0], id });
  };

  function handleChangeNombre(e) {
    setState((prev) => ({
      ...prev,
      taskname: e.target.value,
    }));
  }

  return (
    <>
      <div>
        <div>
          <input
            placeholder="name"
            name="taskname"
            onChange={handleChangeNombre}
          />
        </div>

        <button onClick={state.id ? editPerson : addPerson}>
          {" "}
          {state.id ? "Save" : "Add"}{" "}
        </button>
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th> Nombre </th>
          <th> Edad </th>
          <th> </th>
          <th> </th>
        </tr>
        {person.length > 0 ? (
          person.map((onePerson) => {
            return (
              <tr>
                <td> {onePerson.id} </td>
                <td> {onePerson.taskname} </td>
                <td> {onePerson.edad} </td>
                <td>
                  {" "}
                  <button onClick={() => startEdit(onePerson.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deletePerson(onePerson.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        )}
      </table>
    </>
  );
}
