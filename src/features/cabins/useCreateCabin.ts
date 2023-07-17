import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New cabin successfully created");
    },
    onError: (err) => {
      toast.error((err as Error).message);
      console.error((err as Error).message);
    },
  });

  return { isCreating, createCabin };
}
