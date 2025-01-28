const SelectMarca = () => {
  return (
    <div className="mb-4">
      <label htmlFor="selecMarca" className="form-label">
        <h6 className="">Marca:</h6>
      </label>
      <select id="selectMarca" className="form-select form-select-sm shadow-sm">
        <option value="todo">Todo</option>
        <option value="">[marca]</option>
        <option value="">[marca]</option>
        <option value="">[marca]</option>
      </select>
    </div>
  );
};

export default SelectMarca;
