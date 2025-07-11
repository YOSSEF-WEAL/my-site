import { useQuery } from "@tanstack/react-query";
import apiProject from "../api/apiProject";

export default function useProject(projectId)
{
    const { data, isPending, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => apiProject(projectId),
        staleTime: 10000 * 10,
    });

    return {
        project: data,
        isPending,
        error,
    };
}