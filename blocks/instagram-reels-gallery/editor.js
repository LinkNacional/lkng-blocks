(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, TextareaControl, ToggleControl, Button } = wp.components;
    const { Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('lkng-blocks/instagram-reels-gallery', {
        title: __('Instagram Reels Gallery', 'lkng-blocks'),
        description: __('Uma galeria de vídeos reels do Instagram com loop infinito.', 'lkng-blocks'),
        icon: 'instagram',
        category: 'embed',
        attributes: {
            videoLinks: {
                type: 'array',
                default: [],
            },
            autoPlay: {
                type: 'boolean',
                default: false,
            },
            loop: {
                type: 'boolean',
                default: true,
            },
            slidesPerView: {
                type: 'number',
                default: 1,
            },
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { videoLinks, autoPlay, loop, slidesPerView } = attributes;

            const [newLink, setNewLink] = useState('');

            const addVideoLink = function() {
                if (newLink.trim() && videoLinks.indexOf(newLink.trim()) === -1) {
                    setAttributes({
                        videoLinks: videoLinks.concat([newLink.trim()])
                    });
                    setNewLink('');
                }
            };

            const removeVideoLink = function(index) {
                const updatedLinks = videoLinks.filter(function(_, i) { 
                    return i !== index; 
                });
                setAttributes({ videoLinks: updatedLinks });
            };

            const extractInstagramId = function(url) {
                // Remove whitespace and ensure we have a string
                url = (url || '').trim();
                if (!url) {
                    return null;
                }
                
                // Array of patterns to match different Instagram URL formats
                const patterns = [
                    // Instagram Reel URLs
                    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
                    // Instagram Post URLs (can be videos)
                    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/,
                    // Instagram TV URLs
                    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
                ];
                
                for (var i = 0; i < patterns.length; i++) {
                    const match = url.match(patterns[i]);
                    if (match) {
                        return match[1];
                    }
                }
                
                return null;
            };

            return wp.element.createElement(Fragment, null,
                wp.element.createElement(InspectorControls, null,
                    wp.element.createElement(PanelBody, {
                        title: __('Adicionar Posts', 'lkng-blocks')
                    },
                        wp.element.createElement('div', {
                            style: { marginBottom: '16px' }
                        },
                            wp.element.createElement(TextareaControl, {
                                label: __('Link do Instagram', 'lkng-blocks'),
                                value: newLink,
                                onChange: setNewLink,
                                placeholder: __('https://www.instagram.com/reel/{reel_id}/', 'lkng-blocks')
                            }),
                            wp.element.createElement(Button, {
                                isPrimary: true,
                                onClick: addVideoLink
                            }, __('Adicionar Post', 'lkng-blocks'))
                        ),

                        videoLinks.length > 0 ? wp.element.createElement('div', null,
                            wp.element.createElement('h4', null, __('Posts Adicionados:', 'lkng-blocks')),
                            videoLinks.map(function(link, index) {
                                const postId = extractInstagramId(link);
                                return wp.element.createElement('div', {
                                    key: index,
                                    style: { 
                                        marginBottom: '8px', 
                                        padding: '8px', 
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }
                                },
                                    wp.element.createElement('div', {
                                        style: { fontSize: '12px', marginBottom: '4px' }
                                    }, postId ? 'ID: ' + postId : __('Link inválido', 'lkng-blocks')),
                                    wp.element.createElement('div', {
                                        style: { 
                                            fontSize: '11px', 
                                            color: '#666', 
                                            wordBreak: 'break-all',
                                            marginBottom: '4px'
                                        }
                                    }, link),
                                    wp.element.createElement(Button, {
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function() { removeVideoLink(index); }
                                    }, __('Remover', 'lkng-blocks'))
                                );
                            })
                        ) : null
                    ),
                    
                    wp.element.createElement(PanelBody, {
                        title: __('Configurações da Galeria', 'lkng-blocks')
                    },
                        wp.element.createElement(ToggleControl, {
                            label: __('Reprodução Automática', 'lkng-blocks'),
                            checked: autoPlay,
                            onChange: function(value) { setAttributes({ autoPlay: value }); }
                        }),

                        wp.element.createElement(ToggleControl, {
                            label: __('Loop Infinito', 'lkng-blocks'),
                            checked: loop,
                            onChange: function(value) { setAttributes({ loop: value }); }
                        }),

                        wp.element.createElement('div', {
                            style: { marginBottom: '16px' }
                        },
                            wp.element.createElement('label', {
                                style: { display: 'block', marginBottom: '8px', fontWeight: '500' }
                            }, __('Posts por Slide', 'lkng-blocks')),
                            wp.element.createElement('input', {
                                type: 'number',
                                min: '1',
                                value: slidesPerView,
                                onChange: function(e) { setAttributes({ slidesPerView: parseInt(e.target.value) }); },
                                style: { width: '80px' }
                            })
                        )
                    )
                ),

                wp.element.createElement('div', {
                    style: { 
                        padding: '20px', 
                        border: '2px dashed #ccc',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }
                },
                    wp.element.createElement('div', {
                        style: { marginBottom: '16px' }
                    },
                        wp.element.createElement('h3', null, __('Instagram Reels Gallery', 'lkng-blocks')),
                        wp.element.createElement('p', {
                            style: { 
                                fontSize: '12px', 
                                color: '#666', 
                                margin: '8px 0 0 0',
                                fontStyle: 'italic'
                            }
                        }, __('Mínimo de 4 vídeos recomendado para loop infinito funcionar corretamente.', 'lkng-blocks'))
                    ),

                    videoLinks.length === 0 ? 
                        wp.element.createElement('p', null, __('Use o painel lateral para adicionar links de posts do Instagram.', 'lkng-blocks'))
                        :
                        wp.element.createElement('div', null,
                            wp.element.createElement('div', {
                                style: { 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }
                            },
                                videoLinks.map(function(link, index) {
                                    const postId = extractInstagramId(link);
                                    return wp.element.createElement('div', {
                                        key: index,
                                        style: {
                                            height: '80px',
                                            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            flexDirection: 'column'
                                        }
                                    },
                                        wp.element.createElement('div', {
                                            style: { fontSize: '16px', marginBottom: '4px' }
                                        }, '📷'),
                                        wp.element.createElement('div', null, postId ? postId.substring(0, 6) + '...' : 'Post')
                                    );
                                })
                            ),
                            wp.element.createElement('div', {
                                style: { fontSize: '12px', color: '#666' }
                            }, videoLinks.length + __(' posts adicionados', 'lkng-blocks'))
                        ),

                    wp.element.createElement('div', {
                        style: { fontSize: '12px', color: '#666', marginTop: '16px' }
                    }, __('Configure autoplay, loop e quantos posts mostrar por slide no painel lateral.', 'lkng-blocks'))
                )
            );
        },

        save: function() {
            return null; // Renderizado via PHP
        }
    });
})(window.wp);