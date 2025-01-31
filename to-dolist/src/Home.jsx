import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/get")
      .then((result) => {
        setTodos(result.data.result);
        console.log(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEdit(id) {
    axios
      .put("http://127.0.0.1:4000/update/" + id)
      .then((result) => {
        console.log("tumi");
        console.log(result);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(id) {
    axios
      .delete("http://127.0.0.1:4000/delete/" + id)
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="task">
            <div className="checkbox">
              {/* <BsCircleFill className="icon" /> */}
              {todo.done ? (
                <p className="icon">ooo</p>
              ) : (
                <p className="icon" onClick={() => handleEdit(todo._id)}>
                  o
                </p>
              )}
              <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                {/* <BsFillTrashFill className="icon" /> */}
                <p
                  className="icon"
                  onClick={() => {
                    handleDelete(todo._id);
                  }}
                >
                  ----------
                </p>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
