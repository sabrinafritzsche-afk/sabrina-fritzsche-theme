<?php get_header(); ?>
<main id="top">
<?php while (have_posts()): the_post(); ?>
  <header class="content-header"><h1><?php the_title(); ?></h1></header>
  <article class="content-wrap entry-content"><?php the_content(); ?></article>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>
