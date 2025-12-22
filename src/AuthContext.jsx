import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null); 
    const [dashboardPath, setDashboardPath] = useState('/profile');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const role = localStorage.getItem('userRole');
        const name = localStorage.getItem('userName');

        if (token && role && name) {
            const path = role === 'admin' ? '/admin/dashboard' : '/profile';
            
            setIsLoggedIn(true);
            setUserName(name);
            setUserRole(role);
            setDashboardPath(path);
        }
    }, []);

    const login = (token, role, name) => {
        const path = role === 'admin' ? '/admin/dashboard' : '/profile';
        
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        
        setIsLoggedIn(true);
        setUserName(name);
        setUserRole(role);
        setDashboardPath(path);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        setIsLoggedIn(false);
        setUserName(null);
        setUserRole(null);
        setDashboardPath('/login'); 
    };
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userName,
            userRole,
            dashboardPath,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};