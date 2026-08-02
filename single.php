<?php get_header(); ?>
<main id="top">
<?php while (have_posts()): the_post(); ?>
  <header class="single-hero"><p class="post-meta"><?php echo esc_html(get_the_date()); ?> · <?php the_category(', '); ?></p><h1><?php the_title(); ?></h1></header>
  <?php if (has_post_thumbnail()): ?><div class="content-wrap"><?php the_post_thumbnail('full'); ?></div><?php endif; ?>
  <article class="content-wrap entry-content"><?php the_content(); ?><div class="pagination"><?php previous_post_link('%link','← %title'); ?><?php next_post_link('%link','%title →'); ?></div></article>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>
