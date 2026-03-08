<?php
/**
 * Template: UK Territories Map (Full Page)
 * Renders the Blossoming Care UK Territories Map app.
 * Assets must be uploaded to: wp-content/uploads/uk-territories-map/
 */
$map_base = plugins_url('build/', dirname(__FILE__)) . '/';
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php if (function_exists('get_site_icon_url') && get_site_icon_url(32)) : ?>
  <link rel="icon" href="<?php echo esc_url(get_site_icon_url(32)); ?>" sizes="32x32" />
  <link rel="icon" href="<?php echo esc_url(get_site_icon_url(192)); ?>" sizes="192x192" />
  <link rel="apple-touch-icon" href="<?php echo esc_url(get_site_icon_url(180)); ?>" />
  <?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
  <title>Blossoming Care - UK Territories Map</title>
  <link rel="stylesheet" href="<?php echo esc_url($map_base . 'assets/index.css'); ?>" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="<?php echo esc_url($map_base . 'assets/index.js'); ?>"></script>
</body>
</html>
