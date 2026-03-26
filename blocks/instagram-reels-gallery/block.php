<?php
/**
 * Instagram Reels Gallery Block
 *
 * @package Lkng_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the Instagram Reels Gallery block
 */
function lkng_blocks_register_instagram_reels_gallery_block() {
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
        'lkng-blocks-instagram-reels-gallery-editor',
        $block_url . 'editor.js',
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-block-editor' ),
        filemtime( $block_path . 'editor.js' ),
        true
    );

    // Register frontend script
    wp_register_script(
        'lkng-blocks-instagram-reels-gallery-frontend',
        $block_url . 'frontend.js',
        array( 'swiper-js' ),
        filemtime( $block_path . 'frontend.js' ),
        true
    );

    // Register block styles
    wp_register_style(
        'lkng-blocks-instagram-reels-gallery-style',
        $block_url . 'style.css',
        array( 'swiper-css' ),
        filemtime( $block_path . 'style.css' )
    );

    // Register the block
    register_block_type( 'lkng-blocks/instagram-reels-gallery', array(
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
        'render_callback' => 'lkng_blocks_render_instagram_reels_gallery',
        'editor_script' => 'lkng-blocks-instagram-reels-gallery-editor',
        'script' => 'lkng-blocks-instagram-reels-gallery-frontend',
        'style' => 'lkng-blocks-instagram-reels-gallery-style',
    ) );
}

/**
 * Render the Instagram Reels Gallery block
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML.
 */
function lkng_blocks_render_instagram_reels_gallery( $attributes ) {
    $video_links = isset( $attributes['videoLinks'] ) ? $attributes['videoLinks'] : array();
    $auto_play = isset( $attributes['autoPlay'] ) ? $attributes['autoPlay'] : false;
    $loop = isset( $attributes['loop'] ) ? $attributes['loop'] : true;
    $slides_per_view = isset( $attributes['slidesPerView'] ) ? $attributes['slidesPerView'] : 1;

    if ( empty( $video_links ) ) {
        return '<div class="lkng-instagram-reels-gallery-placeholder"><p>' . __( 'Adicione posts do Instagram usando o painel lateral do editor.', 'lkng-blocks' ) . '</p></div>';
    }

    $embed_links = array();
    foreach ( $video_links as $link ) {
        $post_id = lkng_blocks_extract_instagram_id( $link );
        if ( $post_id ) {
            // Gerar URL de embed simples (sem barra final, como no exemplo que funciona)
            if ( strpos( $link, '/reel/' ) !== false ) {
                $embed_url = "https://www.instagram.com/reel/{$post_id}/embed";
            } elseif ( strpos( $link, '/tv/' ) !== false ) {
                $embed_url = "https://www.instagram.com/tv/{$post_id}/embed";
            } else {
                $embed_url = "https://www.instagram.com/p/{$post_id}/embed";
            }
            
            $embed_links[] = array(
                'id' => $post_id,
                'embed' => $embed_url,
                'original' => $link,
            );
        }
    }

    if ( empty( $embed_links ) ) {
        return '<div class="lkng-instagram-reels-gallery-placeholder"><p>' . __( 'Nenhum post válido encontrado. Verifique se os links do Instagram estão corretos.', 'lkng-blocks' ) . '</p></div>';
    }

    $output = '<div class="lkng-instagram-reels-gallery" data-autoplay="' . ( $auto_play ? 'true' : 'false' ) . '" data-loop="' . ( $loop ? 'true' : 'false' ) . '" data-slides-per-view="' . esc_attr( $slides_per_view ) . '">';
    $output .= '<div class="swiper-container">';
    $output .= '<div class="swiper-wrapper">';

    foreach ( $embed_links as $index => $post ) {
        $output .= '<div class="swiper-slide">';
        $output .= '<div class="video-container">';
        $output .= '<iframe ';
        $output .= 'width="100%" ';
        $output .= 'height="100%" ';
        $output .= 'src="' . esc_url( $post['embed'] ) . '" ';
        $output .= 'name="instagram-' . $index . '" ';
        $output .= 'scrolling="no" ';
        $output .= 'allowfullscreen>';
        $output .= '</iframe>';
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
 * Extract Instagram post ID from URL
 *
 * @param string $url Instagram URL.
 * @return string|false Post ID or false if not found.
 */
function lkng_blocks_extract_instagram_id( $url ) {
    // Remove whitespace and ensure we have a string
    $url = trim( $url );
    if ( empty( $url ) ) {
        return false;
    }
    
    // Array of patterns to match different Instagram URL formats
    $patterns = array(
        // Instagram Reel URLs
        '/(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/([A-Za-z0-9_-]+)/',
        // Instagram Post URLs (can be videos)
        '/(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/',
        // Instagram TV URLs
        '/(?:https?:\/\/)?(?:www\.)?instagram\.com\/tv\/([A-Za-z0-9_-]+)/',
        // Instagram mobile URLs
        '/(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/([A-Za-z0-9_-]+)\/\?.*/',
        // Instagram post URLs with extra parameters  
        '/(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)\/\?.*/',
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
function lkng_blocks_enqueue_instagram_reels_gallery_frontend_assets() {
    if ( has_block( 'lkng-blocks/instagram-reels-gallery' ) ) {
        wp_enqueue_script( 'swiper-js' );
        wp_enqueue_style( 'swiper-css' );
        wp_enqueue_script( 'lkng-blocks-instagram-reels-gallery-frontend' );
        wp_enqueue_style( 'lkng-blocks-instagram-reels-gallery-style' );
    }
}

// Hook everything up
add_action( 'init', 'lkng_blocks_register_instagram_reels_gallery_block' );
add_action( 'wp_enqueue_scripts', 'lkng_blocks_enqueue_instagram_reels_gallery_frontend_assets' );