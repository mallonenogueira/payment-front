
import { companyService } from "@/services/company.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const companiesQuery = {
  queryKey: ["companies"],
  queryFn: companyService.list,
};

export function useCompaniesQuery() {
  return useQuery({
    ...companiesQuery,
  });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(companiesQuery);
    },
  });
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(companiesQuery);
    },
  });
}
