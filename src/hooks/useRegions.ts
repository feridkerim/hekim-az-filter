import { useQuery } from "@tanstack/react-query";
import { fetchRegions } from "@/services/region.service";

export const useRegions = () => {
    return useQuery({
        queryKey: ["regions"],
        queryFn: fetchRegions,
    });
};
