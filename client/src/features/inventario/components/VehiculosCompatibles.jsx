import { CheckPicker, VStack } from "rsuite";

const data = ["Opcion1", "Opcion2", "Opcion3"].map(
  (item) => ({ label: item, value: item })
);
const VehiculosCompatibles = () => {
  return (
    <div>
      <span>Compatible:</span>
      <VStack>
        <CheckPicker data={data} style={{ width: 224 }} placeholder="Seleccionar"/>
      </VStack>
    </div>
  );
};

export default VehiculosCompatibles;
