<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="site-shell">
<header class="site-header">
  <a class="wordmark" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Sabrina Fritzsche – Home">Sabrina Fritzsche<span class="mark-dot">.</span></a>
  <nav class="main-nav" aria-label="Main navigation">
    <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" data-de="Between Signals" data-en="Between Signals">Between Signals</a>
    <a href="<?php echo esc_url(home_url('/#about')); ?>" data-de="Über mich" data-en="About">Über mich</a>
    <a href="<?php echo esc_url(home_url('/#work')); ?>" data-de="Work with me" data-en="Work with me">Work with me</a>
  </nav>
  <div class="language" aria-label="Language selector"><button type="button" data-set-lang="de" class="active">DE</button><span>/</span><button type="button" data-set-lang="en">EN</button></div>
</header>
