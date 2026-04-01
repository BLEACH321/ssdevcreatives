import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface LoadingContextType {
    percent: number;
    setPercent: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ percent, setPercent, isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
