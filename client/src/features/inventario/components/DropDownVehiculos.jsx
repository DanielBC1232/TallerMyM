import { CheckPicker, VStack } from "rsuite";

const data = ["Toyota", "Hyundai", "VolksWagen", "BMW", "Kia", "Honda"].map(
  (item) => ({ label: item, value: item })
);

const DropdownVehiculos = ({ opciones, onChange }) => {
  return (
    <div>
      <span>Vehiculos compatibles:</span>
      <VStack>
        <CheckPicker data={data} style={{ width: 224 }} placeholder="Seleccionar"/>
      </VStack>
    </div>
  );
};

export default DropdownVehiculos;
