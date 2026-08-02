<?php get_header(); ?>
<main id="top">
  <header class="content-header"><div><p class="eyebrow">The journal</p><h1>Between Signals<em>.</em></h1></div><p class="journal-deck">Gedanken über Führung, Performance und das Menschsein in einer Welt, die immer schneller wird.</p></header>
  <div class="journal-grid">
    <?php if (have_posts()): while (have_posts()): the_post(); ?>
      <article class="post-card"><p class="post-meta"><?php echo esc_html(get_the_date()); ?><br><?php the_category(', '); ?></p><div><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><div class="post-excerpt"><?php the_excerpt(); ?></div></div><a class="essay-arrow" href="<?php the_permalink(); ?>" aria-label="Essay lesen">↗</a></article>
    <?php endwhile; ?><div class="pagination"><?php the_posts_pagination(); ?></div><?php else: ?><p class="empty-journal">Der erste Essay erscheint bald.</p><?php endif; ?>
  </div>
</main>
<?php get_footer(); ?>
