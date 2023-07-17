import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully edited");
    },
    onError: (err) => {
      toast.error((err as Error).message);
      console.error((err as Error).message);
    },
  });

  return { isEditing, editCabin };
}
