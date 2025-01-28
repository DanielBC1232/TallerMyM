const SelectCategoria = () => {
  return (
    <div className="mb-4">
      <label htmlFor="selecCategory" className="form-label">
        <h6 className="">Categoria:</h6>
      </label>
      <select
        id="selectCategory"
        className="form-select form-select-sm shadow-sm"
      >
        <option value="todo">Todo</option>
        <option value="">[categoria]</option>
        <option value="">[categoria]</option>
        <option value="">[categoria]</option>
      </select>
    </div>
  );
};

export default SelectCategoria;
