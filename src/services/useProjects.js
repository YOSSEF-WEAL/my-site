import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import apiProjects, { fetchProjectsWithPagination, fetchProjectsByCategory, fetchAllCategories } from "../api/apiProjects";

export default function useLastProjects()
{
    const { data, isPending, error } = useQuery({
        queryKey: ["LastProjects"],
        queryFn: apiProjects,
        staleTime: 10000 * 10,
    });

    return {
        LastProjects: data,
        isPending,
        error,
    };
}

export function useCategories()
{
    const { data, isPending, error } = useQuery({
        queryKey: ["Categories"],
        queryFn: fetchAllCategories,
        staleTime: 10000 * 60,
    });

    return {
        categories: data || [],
        isPending,
        error,
    };
}

export function useInfiniteProjects(category = "all")
{
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error } = useInfiniteQuery({
        queryKey: ["InfiniteProjects", category],
        queryFn: ({ pageParam = 1 }) =>
        {
            if (category === "all")
            {
                return fetchProjectsWithPagination(pageParam, pageParam === 1 ? 9 : 6);
            } else
            {
                return fetchProjectsByCategory(category, pageParam, pageParam === 1 ? 9 : 6);
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
        {
            if (lastPage.projects.length > 0 && lastPage.hasMore)
            {
                return allPages.length + 1;
            }
            return undefined;
        },
        staleTime: 10000 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const allProjects = data?.pages.flatMap(page => page.projects) || [];

    const uniqueProjects = allProjects.filter((project, index, self) =>
        index === self.findIndex(p => p.id === project.id)
    );

    return {
        projects: uniqueProjects,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        error,
    };
}