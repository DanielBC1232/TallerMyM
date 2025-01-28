const SelectStock = () => {
  return (
    <div className="mb-4">
      <label htmlFor="selecStock" className="form-label">
        <h6 className="">Stock:</h6>
      </label>
      <select id="selectStock" className="form-select form-select-sm shadow-sm">
        <option value="todo">Todo</option>
        <option value="">0 - 10</option>
        <option value="">10 - 20</option>
        <option value="">20 - 30</option>
      </select>
    </div>
  );
};

export default SelectStock;
