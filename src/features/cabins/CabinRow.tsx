import styled from "styled-components";
import { CabinType } from "../../types/db.types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinType }) {
  const { id, name, max_capacity, regular_price, discount, image } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Table.Row>
      <Img src={image!} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity}</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={`${id}`} />

          <Menus.List id={`${id}`}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="cabins"
            disabled={isDeleting}
            onConfirm={() => deleteCabin(id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
