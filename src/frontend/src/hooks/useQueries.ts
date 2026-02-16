import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, TestSubmission, TestResult, HealthTip } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSubmitTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: TestSubmission) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTest(submission);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myResults'] });
    },
  });
}

export function useGetMyResults() {
  const { actor, isFetching } = useActor();

  return useQuery<TestResult | null>({
    queryKey: ['myResults'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyResults();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHealthTips() {
  const { actor, isFetching } = useActor();

  return useQuery<HealthTip[]>({
    queryKey: ['healthTips'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHealthTips();
    },
    enabled: !!actor && !isFetching,
  });
}
