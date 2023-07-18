import styled from "styled-components";
import { CabinType } from "../../types/db.types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

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
        <Modal.Open opens="edit">
          <Button size="medium" variation="secondary">
            Edit
          </Button>
        </Modal.Open>
        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        <Modal.Open opens="delete">
          <Button
            size="medium"
            variation="secondary"
            onClick={() => deleteCabin(id)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </Modal.Open>
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
