import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TEMPLATE_PRESETS } from './TemplatePresets';

export const ConfigContext = createContext();

const API_BASE = 'http://localhost:5000/api';

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

    const applyTemplatePreset = async (id) => {
        console.log('Initiating applyTemplatePreset for ID:', id);
        if (!TEMPLATE_PRESETS[id]) {
            console.error('Invalid Template ID:', id);
            return false;
        }
        
        try {
            setLoading(true);
            const preset = TEMPLATE_PRESETS[id];
            
            // 1. Update local state first for immediate UI responsiveness
            setGlobal(prev => ({ ...prev, globalStyling: preset.globalStyling }));
            setPages(prev => ({ ...prev, ...preset.pages }));
            
            // 2. Prepare data for persistence (clean up MongoDB fields)
            const cleanData = (obj) => {
                const newObj = { ...obj };
                delete newObj._id;
                delete newObj.__v;
                delete newObj.createdAt;
                delete newObj.updatedAt;
                return newObj;
            };

            // 3. Persist Global Settings
            try {
                const globalData = cleanData({ ...global, globalStyling: preset.globalStyling });
                await axios.post(`${API_BASE}/global`, globalData);
                console.log('Global settings persisted successfully');
            } catch (globalErr) {
                console.warn('Failed to persist global settings, but continuing...', globalErr);
            }
            
            // 4. Persist Pages
            try {
                for (const pageName in preset.pages) {
                    const pageData = cleanData(preset.pages[pageName]);
                    await axios.post(`${API_BASE}/pages`, pageData);
                }
                console.log('All preset pages persisted successfully');
            } catch (pageErr) {
                console.warn('Failed to persist preset pages, but continuing...', pageErr);
            }
            
            return true; // We return true if at least the local state was updated
        } catch (err) {
            console.error('Critical error in applyTemplatePreset:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const saveConfig = async () => {
        try {
            setLoading(true);
            // 1. Save Global
            await axios.post(`${API_BASE}/global`, global);
            
            // 2. Save all pages
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
            saveConfig,
            applyTemplatePreset
        }}>
            {children}
        </ConfigContext.Provider>
    );
};
