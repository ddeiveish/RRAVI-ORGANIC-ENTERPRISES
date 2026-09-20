import { createContext, useContext } from "react";

export const QuoteContext = createContext({ openQuote: () => {} });

export const useQuote = () => useContext(QuoteContext);
