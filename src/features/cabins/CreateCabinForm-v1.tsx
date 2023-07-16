import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";
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

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New cabin successfully created");
      reset();
    },
    onError: (err) => {
      toast.error((err as Error).message);
      console.error((err as Error).message);
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    mutate({ ...data, image: data.image[0] });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors.name?.message as string}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors.image?.message as string}>
        <FileInput
          type="file"
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button size="medium" variation="secondary" type="reset">
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
