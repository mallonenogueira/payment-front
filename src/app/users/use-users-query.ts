import { userService } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usersQuery = {
  queryKey: ["users"],
  queryFn: userService.list,
};

export function useUsersQuery() {
  return useQuery({
    ...usersQuery,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(usersQuery);
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(usersQuery);
    },
  });
}
