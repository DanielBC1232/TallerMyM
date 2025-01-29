import { CheckPicker, VStack } from "rsuite";
const data = ["Opcion1", "Opcion2", "Opcion3"].map((item) => ({
  label: item,
  value: item,
}));
const SelectMarca = () => {
  return (
    <div>
      <span>Marca:</span>
      <VStack>
        <CheckPicker
          data={data}
          style={{ width: 224 }}
          placeholder="Seleccionar"
        />
      </VStack>
    </div>
  );
};

export default SelectMarca;
