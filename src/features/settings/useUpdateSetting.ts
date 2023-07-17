import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      toast.success("Setting updated");
    },
    onError: (err) => {
      console.error(err);
      toast.error((err as Error).message);
    },
  });

  return { isUpdating, updateSetting };
}
