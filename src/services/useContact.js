import { useQuery } from "@tanstack/react-query";
import apiContact from "../api/apiContact";

export default function useContact()
{
    const { data, isPending, error } = useQuery({
        queryKey: ["contact"],
        queryFn: apiContact,
        staleTime: 10000 * 10,
    });

    return {
        contact: data,
        isPending,
        error,
    };
}