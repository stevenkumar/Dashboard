import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ConfigContext = createContext();

const API_URL = 'http://localhost:5000/api/config';

const defaultConfig = {
    generalSettings: {
        logo: '',
        socialIcons: [],
        address: '',
        mail: '',
        legalLinks: [],
        copyright: '© 2024 Your Company'
    },
    globalStyling: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1e293b',
        fontFamily: 'Inter'
    },
    pages: {
        home: [],
        about: [],
        services: [],
        contact: []
    }
};

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axios.get(API_URL);
                if (res.data && res.data.pages) {
                    setConfig(res.data);
                }
            } catch (err) {
                console.error('Error fetching config:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const updateGeneralSettings = (settings) => {
        setConfig(prev => ({
            ...prev,
            generalSettings: { ...prev.generalSettings, ...settings }
        }));
    };

    const updateGlobalStyling = (styling) => {
        setConfig(prev => ({
            ...prev,
            globalStyling: { ...prev.globalStyling, ...styling }
        }));
    };

    const updatePageSections = (page, sections) => {
        setConfig(prev => ({
            ...prev,
            pages: {
                ...prev.pages,
                [page]: sections
            }
        }));
    };

    const saveConfig = async () => {
        try {
            const res = await axios.post(API_URL, config);
            console.log('Config saved successfully:', res.data);
            return true;
        } catch (err) {
            console.error('Error saving config:', err);
            return false;
        }
    };

    return (
        <ConfigContext.Provider value={{
            config,
            loading,
            updateGeneralSettings,
            updateGlobalStyling,
            updatePageSections,
            saveConfig
        }}>
            {children}
        </ConfigContext.Provider>
    );
};
