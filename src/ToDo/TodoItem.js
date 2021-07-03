import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "../context";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid gray",
    borderRadius: "5px",
    maginBottom: ".5rem",
    background: "white",
    marginTop: "10px",
  },
  input: {
    marginRight: "1rem",
  },
};

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];

  if (todo.complited) {
    classes.push("done");
  }
  return (
    <li style={styles.li}>
      <div className="task">
        <div>
          <input
            style={styles.input}
            type="checkbox"
            checked={todo.complited}
            onChange={() => {
              onChange(todo.id);
            }}
          />
        </div>
          <strong>{index + 1}.</strong>

        <div className={classes.join(" ")}>&nbsp;{todo.title}</div>
      </div>

      <button className="deleteBtn" onClick={() => removeTodo(todo.id)}>
        &times;
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
