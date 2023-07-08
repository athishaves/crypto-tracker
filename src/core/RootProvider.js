import React, {createContext, useReducer} from 'react';

const RootContext = createContext();

const initialState = {
  language: 'EN',
  currency: 'USD',
  currencyDisplay: '$',
  currentCrypto: {},
  allCryptos: [],
  filterCryptoString: '',
  filteredCryptos: [],
};

function rootReducer(state, action) {
  switch (action.type) {
    case 'setCurrentCrypto': {
      return {...state, currentCrypto: action.item};
    }
    case 'setAllCryptos': {
      state.filteredCryptos.length = 0;
      state.filteredCryptos.push(...action.item);
      return {
        ...state,
        allCryptos: action.item,
        filterString: '',
        currentCrypto: action.item[0],
      };
    }
    case 'setFilteredCryptos': {
      const filterStringLower = action.item.toLowerCase();
      const cryptos = state.allCryptos.filter(
        item =>
          item.coinNameLower.includes(filterStringLower) ||
          item.coinShortNameLower.includes(filterStringLower),
      );
      state.filteredCryptos.length = 0;
      state.filteredCryptos.push(...cryptos);
      return {
        ...state,
        filterString: action.item,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RootProvider(props) {
  const [state, reducer] = useReducer(rootReducer, initialState);
  const value = {state, reducer};
  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
}

function useRoot() {
  const context = React.useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRoot must be used within a RootProvider');
  }
  return context;
}

export {RootProvider, useRoot};
