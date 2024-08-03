import React, { Fragment, useEffect, useState } from "react";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [editTodoId, setEditTodoId] = useState(null); // State for currently editing todo ID

  // Function to delete a todo item
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE"
    });
    setTodos(todos.filter((todo) => todo.todo_id !== id));
  };

  // Function to update the description of a todo item
  const updateDescription = async (id) => {
    const body = { description };
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    // Fetch the updated list of todos after the update
    await getTodos();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    closeEditModal(); // Close the edit modal after update
  };

  // Function to fetch all todos
  const getTodos = async () => {
    const response = await fetch("http://localhost:3000/todo");
    const jsonData = await response.json();
    setTodos(jsonData);
  };

  // Fetch todos on component mount
  useEffect(() => {
    getTodos();
  }, []);

  // Function to open the edit modal
  const openEditModal = (id) => {
    const todoToEdit = todos.find((todo) => todo.todo_id === id);
    setEditTodoId(id);
    setDescription(todoToEdit.description);
    setShowModal(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditTodoId(null);
    setDescription("");
    setShowModal(false);
  };

  // Function to handle form submit in the edit modal
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    updateDescription(editTodoId);
  };

  return (
    <Fragment>
      <h2 className="text-center mt-5">Task List</h2>

      {/* Alert for successful update */}
      {showAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Task item updated successfully!
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="close" onClick={closeEditModal}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleEditFormSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="editDescription">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className="table mt-3 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                {/* Edit button */}
                <button
                  className="btn btn-primary"
                  onClick={() => openEditModal(todo.todo_id)}
                >
                  Edit
                </button>
              </td>
              <td>
                {/* Delete button */}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
