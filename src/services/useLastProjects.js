import { useQuery } from "@tanstack/react-query";
import apiLastProjects from "../api/apiLastProjects";

export default function useLastProjects()
{
    const { data, isPending, error } = useQuery({
        queryKey: ["LastProjects"],
        queryFn: apiLastProjects,
        staleTime: 10000 * 10,
    });

    return {
        LastProjects: data,
        isPending,
        error,
    };
}