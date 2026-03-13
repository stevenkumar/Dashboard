import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ConfigContext = createContext();

const API_BASE = 'http://127.0.0.1:5000/api';

const defaultGlobal = {
    generalSettings: {
        siteName: 'Tekunik',
        logo: '',
        email: '',
        phone: '',
        address: '',
        socialIcons: [],
        copyright: '© 2024 Tekunik',
        legalLinks: []
    },
    globalStyling: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1e293b',
        fontFamily: 'Inter'
    },
    navbar: {
        sticky: true,
        links: []
    },
    footer: {
        quickLinks: [],
        bottomText: ''
    }
};

const defaultPages = {
    home: {
        name: 'home',
        navigationLabel: 'Home',
        route: '/',
        sections: [
            {
                id: 'hero-1',
                type: 'hero',
                visible: true,
                heading: 'Building Digital Excellence',
                subheading: 'Innovation Meets Strategy',
                description: 'We transform complex ideas into seamless digital experiences.',
                media: {
                    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                    mediaType: 'image',
                    position: 'right'
                },
                ctas: [{ label: 'Start Your Journey', link: '/contact', variant: 'primary' }]
            }
        ]
    },
    about: { name: 'about', navigationLabel: 'About', route: '/about', sections: [] },
    services: { name: 'services', navigationLabel: 'Services', route: '/services', sections: [] },
    contact: { name: 'contact', navigationLabel: 'Contact', route: '/contact', sections: [] }
};

export const ConfigProvider = ({ children }) => {
    const [global, setGlobal] = useState(defaultGlobal);
    const [pages, setPages] = useState(defaultPages);
    const [loading, setLoading] = useState(true);

    // Backward compatibility wrapper for components still using 'config'
    const config = {
        ...global,
        pages: pages // This is now an object { home: { ... }, about: { ... } }
    };

    useEffect(() => {
        const initBuilder = async () => {
            try {
                // 1. Fetch Global Settings
                const globalRes = await axios.get(`${API_BASE}/global`);
                if (globalRes.data) setGlobal(globalRes.data);

                // 2. Fetch all Page Configurations
                const pagesRes = await axios.get(`${API_BASE}/pages`);
                if (pagesRes.data && pagesRes.data.length > 0) {
                    const pagesMap = {};
                    pagesRes.data.forEach(p => {
                        pagesMap[p.name] = p;
                    });
                    setPages(prev => ({ ...prev, ...pagesMap }));
                } else {
                    // If no pages in DB, initialize them
                    for (const pageName in defaultPages) {
                        await axios.post(`${API_BASE}/pages`, defaultPages[pageName]);
                    }
                }
            } catch (err) {
                console.error('Error initializing builder:', err);
            } finally {
                setLoading(false);
            }
        };
        initBuilder();
    }, []);

    const updateGeneralSettings = (settings) => {
        setGlobal(prev => ({
            ...prev,
            generalSettings: { ...prev.generalSettings, ...settings }
        }));
    };

    const updateGlobalStyling = (styling) => {
        setGlobal(prev => ({
            ...prev,
            globalStyling: { ...prev.globalStyling, ...styling }
        }));
    };

    const updatePageData = (pageName, data) => {
        setPages(prev => ({
            ...prev,
            [pageName]: { ...prev[pageName], ...data }
        }));
    };

    const saveConfig = async () => {
        try {
            setLoading(true);
            // 1. Save Global
            await axios.post(`${API_BASE}/global`, global);
            
            // 2. Save all pages (for simplicity in this step, we save current state)
            for (const pageName in pages) {
                await axios.post(`${API_BASE}/pages`, pages[pageName]);
            }
            
            console.log('All configurations saved successfully');
            return true;
        } catch (err) {
            console.error('Error saving configurations:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfigContext.Provider value={{
            config, // Legacy support
            global,
            pages,
            loading,
            updateGeneralSettings,
            updateGlobalStyling,
            updatePageData,
            saveConfig
        }}>
            {children}
        </ConfigContext.Provider>
    );
};
