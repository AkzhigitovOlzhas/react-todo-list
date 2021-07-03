import { useState } from "react";
import PropTypes from "prop-types"; 
const styles = {
  form: {
    margin: "1rem 0",
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
  },
};

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue();

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form style={styles.form} onSubmit={submitHandler}>
      <input style={styles.input} {...input.bind} />
      <button className="addBtn" type="submit">
        Add todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
