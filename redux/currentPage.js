const currPageReducerDefaultState = [];

const currPageReducer = (state = currPageReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];

    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id != action.id);

    case "EDIT_EXPENSE":
      return state.map((expense) =>
        expense.id == action.id
          ? {
              ...expense,
              ...action.updates,
            }
          : expense
      );

    case "SET_EXPENSES":
      return action.expenses;

    default:
      return state;
  }
};

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
