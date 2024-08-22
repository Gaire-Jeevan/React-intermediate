import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as constants from "../constants";
import { Todo } from "./useTodos";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Todo>("/todos");

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,

    onMutate: (newTodo: Todo) => {
      // save old Todo in this
      const previousTodos =
        queryClient.getQueryData<Todo[]>(constants.CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      onAdd();
      //

      return { previousTodos };
    },

    // savedTodo that we get from backend and newTodo that we create
    onSuccess: (savedTodo, newTodo) => {
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ['todos']
      // })

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });
};

export default useAddTodo;
