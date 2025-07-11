import { useQuery } from "@tanstack/react-query";
import apiTechStack from "../api/apiTechStack";

export default function useTechStack()
{
    const { data, isPending, error } = useQuery({
        queryKey: ["TechStack"],
        queryFn: apiTechStack,
        staleTime: 10000 * 10,
    });

    return {
        techStack: data,
        isPending,
        error,
    };
}