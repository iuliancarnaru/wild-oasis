import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      min_booking_length,
      max_booking_length,
      max_number_of_guests_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    const { value } = event.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
          defaultValue={max_booking_length}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          onBlur={(e) => handleUpdate(e, "max_number_of_guests_per_booking")}
          defaultValue={max_number_of_guests_per_booking}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
          defaultValue={breakfast_price}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
