import TrashIcon from '@rsuite/icons/Trash';
import { IconButton,Image } from 'rsuite';

const CargarImagenArticulo = () => {
  return (
    <div className="imgDetalle" style={{ position: "relative" }}>
      <Image
        rounded
        src="https://i.pinimg.com/236x/46/77/d7/4677d73a1ab9d63db490196ddb2a7358.jpg"
        alt="brown french bulldog puppy lying on yellow textile"
        width={130}
        className="shadow-sm"
      />
      <IconButton className="btn-danger delete-btn" icon={<TrashIcon />} />
    </div>
  );
};

export default CargarImagenArticulo;


