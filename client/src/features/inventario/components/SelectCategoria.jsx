import { InputPicker, VStack } from "rsuite";
const data = ["Opcion1", "Opcion2", "Opcion3"].map(
  (item) => ({ label: item, value: item })
);
const SelectCategoria = () => {
  
  return (

    <div>
      <span>Categoria:</span>
      <VStack>
        <InputPicker data={data} style={{ width: 224 }} placeholder="Seleccionar"/>
      </VStack>
    </div>
  );
};

export default SelectCategoria;
