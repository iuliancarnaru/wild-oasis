import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { CabinType } from "../../types/db.types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     name: yup.string().required("Please provide cabin name"),
//     max_capacity: yup
//       .number()
//       .positive()
//       .min(1)
//       .integer()
//       .required("Please provide number of guests"),
//     regular_price: yup
//       .number()
//       .positive()
//       .integer()
//       .required("Please provide cabin price"),
//     discount: yup
//       .number()
//       .positive()
//       .integer()
//       .required("Please provide discount price"),
//     description: yup.string().required("Please provide a short description"),
//   })
//   .required();

function CreateCabinForm({
  cabinToEdit,
  onCloseModal,
}: {
  cabinToEdit?: CabinType;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = !!editId;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: isEditSession ? editValues : {},
  });

  const isLoading = isCreating || isEditing;

  const onSubmit = (data: CabinType) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message as string}>
        <Input
          disabled={isLoading}
          type="number"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum capacity"
        error={errors.max_capacity?.message as string}
      >
        <Input
          disabled={isLoading}
          type="number"
          id="max_capacity"
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Regular price"
        error={errors.regular_price?.message as string}
      >
        <Input
          disabled={isLoading}
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors.discount?.message as string}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            // custom validation
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount should be less than price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description"
        error={errors.description?.message as string}
      >
        <Textarea
          disabled={isLoading}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors.image?.message as string}>
        <FileInput
          type="file"
          disabled={isLoading}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This filed is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          size="medium"
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isLoading}>
          {isEditSession ? "Update cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
