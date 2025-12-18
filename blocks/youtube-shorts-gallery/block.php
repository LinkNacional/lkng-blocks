<?php
/**
 * YouTube Shorts Gallery Block
 *
 * @package Lkng_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the YouTube Shorts Gallery block
 */
function lkng_blocks_register_youtube_shorts_gallery_block() {
    // Check if Gutenberg is available
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    $block_path = plugin_dir_path( __FILE__ );
    $block_url = plugin_dir_url( __FILE__ );

    // Register and enqueue Swiper.js from CDN
    wp_register_script( 'swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), '11.0.0', true );
    wp_register_style( 'swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', array(), '11.0.0' );

    // Register editor script
    wp_register_script(
        'lkng-blocks-youtube-shorts-gallery-editor',
        $block_url . 'editor.js',
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-block-editor' ),
        filemtime( $block_path . 'editor.js' ),
        true
    );

    // Register frontend script
    wp_register_script(
        'lkng-blocks-youtube-shorts-gallery-frontend',
        $block_url . 'frontend.js',
        array( 'swiper-js' ),
        filemtime( $block_path . 'frontend.js' ),
        true
    );

    // Register block styles
    wp_register_style(
        'lkng-blocks-youtube-shorts-gallery-style',
        $block_url . 'style.css',
        array( 'swiper-css' ),
        filemtime( $block_path . 'style.css' )
    );

    // Register the block
    register_block_type( 'lkng-blocks/youtube-shorts-gallery', array(
        'attributes' => array(
            'videoLinks' => array(
                'type' => 'array',
                'default' => array(),
            ),
            'autoPlay' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'loop' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'slidesPerView' => array(
                'type' => 'number',
                'default' => 1,
            ),
        ),
        'render_callback' => 'lkng_blocks_render_youtube_shorts_gallery',
        'editor_script' => 'lkng-blocks-youtube-shorts-gallery-editor',
        'script' => 'lkng-blocks-youtube-shorts-gallery-frontend',
        'style' => 'lkng-blocks-youtube-shorts-gallery-style',
    ) );
}

/**
 * Render the YouTube Shorts Gallery block
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML.
 */
function lkng_blocks_render_youtube_shorts_gallery( $attributes ) {
    $video_links = isset( $attributes['videoLinks'] ) ? $attributes['videoLinks'] : array();
    $auto_play = isset( $attributes['autoPlay'] ) ? $attributes['autoPlay'] : true;
    $loop = isset( $attributes['loop'] ) ? $attributes['loop'] : true;
    $slides_per_view = isset( $attributes['slidesPerView'] ) ? $attributes['slidesPerView'] : 1;

    if ( empty( $video_links ) ) {
        return '<div class="lkng-youtube-shorts-gallery-placeholder"><p>' . __( 'Adicione links de vídeos do YouTube Shorts no painel lateral.', 'lkng-blocks' ) . '</p></div>';
    }

    // Convert YouTube links to embed format
    $embed_links = array();
    foreach ( $video_links as $link ) {
        $video_id = lkng_blocks_extract_youtube_id( $link );
        if ( $video_id ) {
            $embed_links[] = array(
                'id' => $video_id,
                'embed' => "https://www.youtube.com/embed/{$video_id}",
                'original' => $link,
            );
        }
    }

    if ( empty( $embed_links ) ) {
        // Debug: show what links were tried
        $debug_info = '';
        if ( ! empty( $video_links ) ) {
            $debug_info = '<br><small>Links recebidos: ' . implode( ', ', array_slice( $video_links, 0, 3 ) ) . '</small>';
        }
        return '<div class="lkng-youtube-shorts-gallery-placeholder"><p>' . __( 'Nenhum link válido do YouTube encontrado.', 'lkng-blocks' ) . $debug_info . '</p></div>';
    }

    $output = '<div class="lkng-youtube-shorts-gallery" data-autoplay="' . ( $auto_play ? 'true' : 'false' ) . '" data-loop="' . ( $loop ? 'true' : 'false' ) . '" data-slides-per-view="' . esc_attr( $slides_per_view ) . '">';
    $output .= '<div class="swiper-container">';
    $output .= '<div class="swiper-wrapper">';

    foreach ( $embed_links as $video ) {
        $output .= '<div class="swiper-slide">';
        $output .= '<div class="video-container">';
        $output .= '<iframe src="' . esc_url( $video['embed'] ) . '" frameborder="0" allowfullscreen loading="lazy"></iframe>';
        $output .= '</div>';
        $output .= '</div>';
    }

    $output .= '</div>';
    $output .= '<div class="swiper-pagination"></div>';
    $output .= '<div class="swiper-button-next"></div>';
    $output .= '<div class="swiper-button-prev"></div>';
    $output .= '</div>';
    $output .= '</div>';

    return $output;
}

/**
 * Extract YouTube video ID from URL
 *
 * @param string $url YouTube URL.
 * @return string|false Video ID or false if not found.
 */
function lkng_blocks_extract_youtube_id( $url ) {
    // Remove whitespace and ensure we have a string
    $url = trim( $url );
    if ( empty( $url ) ) {
        return false;
    }
    
    // Array of patterns to match different YouTube URL formats
    $patterns = array(
        // Standard YouTube URLs
        '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/',
        // YouTube Shorts URLs
        '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/',
        // YouTube embed URLs
        '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/',
        // YouTube short URLs
        '/(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/',
        // YouTube mobile URLs
        '/(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/',
        // YouTube live URLs
        '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/',
        // Additional format with extra parameters
        '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*[&?]v=([a-zA-Z0-9_-]{11})/',
    );
    
    foreach ( $patterns as $pattern ) {
        if ( preg_match( $pattern, $url, $matches ) ) {
            return $matches[1];
        }
    }
    
    return false;
}

/**
 * Enqueue block assets for frontend
 */
function lkng_blocks_enqueue_youtube_shorts_gallery_frontend_assets() {
    if ( has_block( 'lkng-blocks/youtube-shorts-gallery' ) ) {
        wp_enqueue_script( 'swiper-js' );
        wp_enqueue_style( 'swiper-css' );
        wp_enqueue_script( 'lkng-blocks-youtube-shorts-gallery-frontend' );
        wp_enqueue_style( 'lkng-blocks-youtube-shorts-gallery-style' );
    }
}

// Hook everything up
add_action( 'init', 'lkng_blocks_register_youtube_shorts_gallery_block' );
add_action( 'wp_enqueue_scripts', 'lkng_blocks_enqueue_youtube_shorts_gallery_frontend_assets' );