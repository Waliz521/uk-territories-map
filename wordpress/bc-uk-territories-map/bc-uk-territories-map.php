<?php
/**
 * Plugin Name: UK Territories Map
 * Description: Embeds the Blossoming Care UK Territories Map (self-hosted).
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

add_filter('theme_page_templates', function ($templates) {
  $templates['page-uk-territories-map.php'] = 'UK Territories Map';
  return $templates;
});

add_filter('page_template', function ($template) {
  if (is_page() && get_post_meta(get_queried_object_id(), '_wp_page_template', true) === 'page-uk-territories-map.php') {
    return __DIR__ . '/page-uk-territories-map.php';
  }
  return $template;
});
