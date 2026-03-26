(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, TextareaControl, ToggleControl, Button } = wp.components;
    const { Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('lkng-blocks/youtube-shorts-gallery', {
        title: __('YouTube Shorts Gallery', 'lkng-blocks'),
        description: __('Uma galeria de vídeos shorts do YouTube com loop infinito.', 'lkng-blocks'),
        icon: 'video-alt3',
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

            const extractYouTubeId = function(url) {
                // Remove whitespace and ensure we have a string
                url = (url || '').trim();
                if (!url) {
                    return null;
                }
                
                // Array of patterns to match different YouTube URL formats
                const patterns = [
                    // Standard YouTube URLs
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
                    // YouTube Shorts URLs
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
                    // YouTube embed URLs
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
                    // YouTube short URLs
                    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
                    // YouTube mobile URLs
                    /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
                    // YouTube live URLs
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
                    // Additional format with extra parameters
                    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*[&?]v=([a-zA-Z0-9_-]{11})/,
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
                        title: __('Adicionar Vídeos', 'lkng-blocks')
                    },
                        wp.element.createElement('div', {
                            style: { marginBottom: '16px' }
                        },
                            wp.element.createElement(TextareaControl, {
                                label: __('Link do YouTube', 'lkng-blocks'),
                                value: newLink,
                                onChange: setNewLink,
                                placeholder: __('Cole o link do YouTube Shorts aqui...', 'lkng-blocks')
                            }),
                            wp.element.createElement(Button, {
                                isPrimary: true,
                                onClick: addVideoLink
                            }, __('Adicionar Vídeo', 'lkng-blocks'))
                        ),

                        videoLinks.length > 0 ? wp.element.createElement('div', null,
                            wp.element.createElement('h4', null, __('Vídeos Adicionados:', 'lkng-blocks')),
                            videoLinks.map(function(link, index) {
                                const videoId = extractYouTubeId(link);
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
                                    }, videoId ? 'ID: ' + videoId : __('Link inválido', 'lkng-blocks')),
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
                            }, __('Vídeos por Slide', 'lkng-blocks')),
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
                        wp.element.createElement('h3', null, __('YouTube Shorts Gallery', 'lkng-blocks')),
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
                        wp.element.createElement('p', null, __('Use o painel lateral para adicionar links de vídeos do YouTube Shorts.', 'lkng-blocks'))
                        :
                        wp.element.createElement('div', null,
                            wp.element.createElement('p', null, __('Galeria configurada com', 'lkng-blocks') + ' ' + videoLinks.length + ' ' + (videoLinks.length === 1 ? __('vídeo', 'lkng-blocks') : __('vídeos', 'lkng-blocks'))),
                            wp.element.createElement('div', {
                                style: { 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: '8px',
                                    marginTop: '16px'
                                }
                            },
                                videoLinks.slice(0, 4).map(function(link, index) {
                                    const videoId = extractYouTubeId(link);
                                    return videoId ? wp.element.createElement('div', {
                                        key: index,
                                        style: { 
                                            aspectRatio: '9/16',
                                            backgroundColor: '#000',
                                            borderRadius: '8px',
                                            backgroundImage: 'url(https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }
                                    }) : null;
                                })
                            ),
                            videoLinks.length > 4 ? wp.element.createElement('p', {
                                style: { fontSize: '12px', color: '#666', marginTop: '8px' }
                            }, __('e mais', 'lkng-blocks') + ' ' + (videoLinks.length - 4) + ' ' + __('vídeos...', 'lkng-blocks')) : null
                        ),

                    wp.element.createElement('div', {
                        style: { fontSize: '12px', color: '#666', marginTop: '16px' }
                    }, 
                        __('Configurações:', 'lkng-blocks') + 
                        (autoPlay ? __(' Auto-play ativado', 'lkng-blocks') : __(' Auto-play desativado', 'lkng-blocks')) + ' | ' +
                        (loop ? __(' Loop ativado', 'lkng-blocks') : __(' Loop desativado', 'lkng-blocks')) + ' | ' +
                        __(' Vídeos por slide: ', 'lkng-blocks') + slidesPerView
                    )
                )
            );
        },

        save: function() {
            // Dynamic block - content is rendered via PHP
            return null;
        },
    });
})(window.wp);