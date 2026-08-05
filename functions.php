<?php
if (!defined('ABSPATH')) { exit; }

function sf_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('editor-style.css');
    register_nav_menus(['primary' => __('Primary menu', 'sabrina-fritzsche')]);
}
add_action('after_setup_theme', 'sf_theme_setup');

function sf_assets() {
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style('sabrina-fritzsche', get_stylesheet_uri(), [], $theme_version);
    wp_enqueue_script('sf-language', get_template_directory_uri() . '/assets/js/language.js', [], $theme_version, true);

    if (is_page_template('page-fortune.php')) {
        wp_enqueue_style(
            'sf-fortune',
            get_template_directory_uri() . '/assets/css/fortune.css',
            ['sabrina-fritzsche'],
            $theme_version
        );
        wp_enqueue_script(
            'sf-astronomy-engine',
            get_template_directory_uri() . '/assets/vendor/astronomy.browser.min.js',
            [],
            '2.1.19',
            true
        );
        wp_enqueue_script(
            'sf-fortune-content',
            get_template_directory_uri() . '/assets/js/fortune-content.js',
            [],
            $theme_version,
            true
        );
        wp_enqueue_script(
            'sf-fortune',
            get_template_directory_uri() . '/assets/js/fortune.js',
            ['sf-astronomy-engine', 'sf-fortune-content'],
            $theme_version,
            true
        );
        wp_localize_script('sf-fortune', 'sfFortune', [
            'geocodingUrl' => 'https://geocoding-api.open-meteo.com/v1/search',
            'locale' => 'de-DE',
            'houseSystem' => 'Whole Sign',
            'conjunctionOrb' => 3,
        ]);
    }
}
add_action('wp_enqueue_scripts', 'sf_assets');

function sf_is_fortune_page(): bool {
    return is_page_template('page-fortune.php') || is_page('fortune');
}

function sf_get_fortune_page_id(): int {
    $fortune = get_page_by_path('fortune');
    return $fortune instanceof WP_Post ? (int) $fortune->ID : 0;
}

function sf_fortune_robots(array $robots): array {
    if (sf_is_fortune_page()) {
        $robots['noindex'] = true;
        $robots['nofollow'] = true;
        $robots['noarchive'] = true;
    }
    return $robots;
}
add_filter('wp_robots', 'sf_fortune_robots');

function sf_fortune_robot_headers(): void {
    if (sf_is_fortune_page() && !headers_sent()) {
        header('X-Robots-Tag: noindex, nofollow, noarchive', true);
    }
}
add_action('template_redirect', 'sf_fortune_robot_headers', 0);

function sf_exclude_fortune_from_sitemap(array $args, string $post_type): array {
    if ('page' !== $post_type) { return $args; }
    $fortune_id = sf_get_fortune_page_id();
    if ($fortune_id) {
        $excluded = isset($args['post__not_in']) ? (array) $args['post__not_in'] : [];
        $excluded[] = $fortune_id;
        $args['post__not_in'] = array_values(array_unique(array_map('intval', $excluded)));
    }
    return $args;
}
add_filter('wp_sitemaps_posts_query_args', 'sf_exclude_fortune_from_sitemap', 10, 2);

function sf_exclude_fortune_from_page_lists(array $exclude_array): array {
    $fortune_id = sf_get_fortune_page_id();
    if ($fortune_id) { $exclude_array[] = $fortune_id; }
    return array_values(array_unique(array_map('intval', $exclude_array)));
}
add_filter('wp_list_pages_excludes', 'sf_exclude_fortune_from_page_lists');

function sf_exclude_fortune_from_search(WP_Query $query): void {
    if (is_admin() || !$query->is_main_query() || !$query->is_search()) { return; }
    $fortune_id = sf_get_fortune_page_id();
    if (!$fortune_id) { return; }
    $excluded = (array) $query->get('post__not_in');
    $excluded[] = $fortune_id;
    $query->set('post__not_in', array_values(array_unique(array_map('intval', $excluded))));
}
add_action('pre_get_posts', 'sf_exclude_fortune_from_search');

function sf_exclude_fortune_from_rest_search(array $args, WP_REST_Request $request): array {
    if ('edit' === $request->get_param('context') && current_user_can('edit_pages')) { return $args; }
    $fortune_id = sf_get_fortune_page_id();
    if (!$fortune_id) { return $args; }
    $excluded = isset($args['post__not_in']) ? (array) $args['post__not_in'] : [];
    $excluded[] = $fortune_id;
    $args['post__not_in'] = array_values(array_unique(array_map('intval', $excluded)));
    return $args;
}
add_filter('rest_page_query', 'sf_exclude_fortune_from_rest_search', 10, 2);

function sf_customize_register($wp_customize) {
    $wp_customize->add_section('sf_links', ['title' => __('Links & contact', 'sabrina-fritzsche'), 'priority' => 30]);
    $settings = [
        'sf_calendly' => ['Calendly URL', 'https://calendly.com/sabrina-coolmindz/30min'],
        'sf_linkedin' => ['LinkedIn URL', 'https://www.linkedin.com/in/safritzsche/'],
        'sf_newsletter' => ['Newsletter form URL', ''],
    ];
    foreach ($settings as $key => $value) {
        $wp_customize->add_setting($key, ['default' => $value[1], 'sanitize_callback' => 'esc_url_raw']);
        $wp_customize->add_control($key, ['label' => __($value[0], 'sabrina-fritzsche'), 'section' => 'sf_links', 'type' => 'url']);
    }
}
add_action('customize_register', 'sf_customize_register');

function sf_get_lang() {
    $lang = isset($_GET['lang']) ? sanitize_key($_GET['lang']) : '';
    return in_array($lang, ['de', 'en'], true) ? $lang : 'de';
}

function sf_excerpt_length() { return 26; }
add_filter('excerpt_length', 'sf_excerpt_length');

function sf_theme_activate() {
    $home = get_page_by_path('home');
    if (!$home) {
        $home_id = wp_insert_post(['post_title' => 'Home', 'post_name' => 'home', 'post_type' => 'page', 'post_status' => 'publish']);
    } else { $home_id = $home->ID; }
    $journal = get_page_by_path('between-signals');
    if (!$journal) {
        $journal_id = wp_insert_post(['post_title' => 'Between Signals', 'post_name' => 'between-signals', 'post_type' => 'page', 'post_status' => 'publish']);
    } else { $journal_id = $journal->ID; }
    update_option('show_on_front', 'page');
    update_option('page_on_front', $home_id);
    update_option('page_for_posts', $journal_id);
}
add_action('after_switch_theme', 'sf_theme_activate');

function sf_seed_first_essay() {
    if (get_option('sf_first_essay_seeded')) { return; }
    $existing = get_page_by_path('klarheit-beginnt-wo-die-ausreden-enden', OBJECT, 'post');
    if (!$existing) {
        $category = wp_create_category('Leadership');
        $content = <<<'HTML'
<p><em>Über die unbequeme Distanz zwischen dem, was wir längst wissen – und dem, was wir bereit sind zu tun.</em></p>
<p>In festgefahrenen Situationen fehlt selten Information.</p>
<p>Meist wurde bereits analysiert, diskutiert und priorisiert. Es gibt Präsentationen, Maßnahmenlisten und gute Gründe dafür, weshalb etwas kompliziert ist. Alle Beteiligten kennen die Zahlen. Viele spüren, wo das eigentliche Problem liegt.</p>
<p>Und trotzdem bewegt sich wenig.</p>
<p>Das wird dann gern als Mangel an Klarheit beschrieben. Doch häufig ist längst genug Klarheit vorhanden. Was fehlt, ist die Bereitschaft, ihre Konsequenz zu akzeptieren.</p>
<p>Denn Klarheit ist nicht nur erleichternd. Sie nimmt uns auch Auswege.</p>
<p>Sobald wir ehrlich benennen, was geschieht, können wir nicht mehr so tun, als bräuchten wir lediglich noch eine Analyse, ein weiteres Meeting oder einen besseren Prozess. Wir müssen entscheiden. Vielleicht gegen etwas, in das bereits viel investiert wurde. Vielleicht für ein Gespräch, das wir lange vermieden haben. Vielleicht für einen Weg, der weniger angenehm, aber wirksamer ist.</p>
<h2>Wenn Aktivität zur Ausweichbewegung wird</h2>
<p>Organisationen sind sehr gut darin, Bewegung zu simulieren.</p>
<p>Neue Initiativen entstehen. Verantwortlichkeiten werden neu verteilt. Workshops werden angesetzt. Es wird mehr berichtet, häufiger abgestimmt und genauer gemessen. All das kann sinnvoll sein. Es kann aber auch verhindern, dass die eine Frage gestellt wird, auf die es wirklich ankommt:</p>
<blockquote><p>Was wissen wir längst – handeln aber noch nicht?</p></blockquote>
<p>Diese Frage verändert die Qualität eines Gesprächs. Sie richtet den Blick weg von den Symptomen und hin zu der Entscheidung, die bisher vermieden wurde.</p>
<p>Vielleicht ist die Strategie nicht unklar, sondern unbeliebt. Vielleicht fehlt dem Team nicht Motivation, sondern Vertrauen in eine Entscheidung, die niemand nachvollziehbar erklärt hat. Vielleicht ist der Markt nicht das Problem, sondern die Tatsache, dass sich niemand von einer alten Annahme trennen will. Vielleicht ist die Führungskraft nicht überlastet, sondern hält an Aufgaben fest, die längst jemand anderes übernehmen müsste.</p>
<p>Mehr Aktivität löst diese Situationen nicht. Sie macht sie nur geschäftiger.</p>
<h2>Klarheit hat einen Preis</h2>
<p>Wir sprechen über Klarheit häufig, als sei sie ein neutraler Zustand: ein aufgeräumter Tisch, eine gute Struktur, ein präziser Plan.</p>
<p>In Wirklichkeit kostet Klarheit etwas.</p>
<p>Sie kann Zugehörigkeit gefährden, weil wir einer verbreiteten Meinung widersprechen. Sie kann unser Selbstbild berühren, weil wir anerkennen müssen, dass Einsatz allein keine Wirkung garantiert. Sie kann Beziehungen verändern, weil ein ehrliches Gespräch nicht kontrollierbar ist. Und sie kann bedeuten, etwas loszulassen, das einmal richtig war.</p>
<p>Deshalb bleiben intelligente Menschen und erfahrene Teams nicht trotz ihres Wissens stecken. Manchmal bleiben sie gerade deshalb stecken: Sie können jede Seite verstehen, jede Unsicherheit erklären und für jede Option ein plausibles Argument formulieren.</p>
<p>Komplexität ist real. Aber sie darf nicht zur dauerhaften Erlaubnis werden, ohne Konsequenz zu bleiben.</p>
<h2>Die nächste ehrliche Bewegung</h2>
<p>Klarheit verlangt nicht immer die perfekte Antwort. Oft verlangt sie nur den nächsten ehrlichen Schritt.</p>
<ul><li>Das ist nicht mehr unsere Priorität.</li><li>Diese Rolle funktioniert so nicht.</li><li>Wir haben kein Erkenntnis-, sondern ein Umsetzungsproblem.</li><li>Wir brauchen nicht mehr Zustimmung, sondern eine Entscheidung.</li><li>Ich weiß noch nicht, wie es ausgeht. Aber ich weiß, dass wir so nicht weitermachen sollten.</li></ul>
<p>Ein solcher Satz löst nicht automatisch alles. Aber er beendet die Fiktion, dass das Wesentliche noch nicht sichtbar sei.</p>
<p>Klarheit entsteht nicht, wenn jede Unsicherheit verschwunden ist. Sie entsteht, wenn wir trotz verbleibender Unsicherheit unterscheiden können: Was ist wesentlich? Was ist wahr? Und was folgt daraus jetzt?</p>
<p>Die entscheidende Frage lautet daher nicht immer: <strong>Was müssen wir noch wissen?</strong></p>
<p>Manchmal lautet sie: <strong>Was sind wir bereit, aus dem zu machen, was wir bereits wissen?</strong></p>
HTML;
        wp_insert_post([
            'post_title' => 'Klarheit beginnt dort, wo die Ausreden enden',
            'post_name' => 'klarheit-beginnt-wo-die-ausreden-enden',
            'post_content' => $content,
            'post_excerpt' => 'Warum in festgefahrenen Situationen selten Information fehlt – und Klarheit erst entsteht, wenn Erkenntnis eine Konsequenz bekommt.',
            'post_status' => 'publish',
            'post_type' => 'post',
            'post_category' => [$category],
        ]);
    }
    update_option('sf_first_essay_seeded', 1);
}
add_action('admin_init', 'sf_seed_first_essay');

function sf_schema() {
    if (is_front_page()) {
        $data = ['@context'=>'https://schema.org','@type'=>'ProfilePage','mainEntity'=>['@type'=>'Person','name'=>'Sabrina Fritzsche','url'=>home_url('/'),'sameAs'=>[get_theme_mod('sf_linkedin','https://www.linkedin.com/in/safritzsche/')]]];
    } elseif (is_single()) {
        $data = ['@context'=>'https://schema.org','@type'=>'Article','headline'=>get_the_title(),'datePublished'=>get_the_date('c'),'dateModified'=>get_the_modified_date('c'),'author'=>['@type'=>'Person','name'=>'Sabrina Fritzsche','url'=>home_url('/')]];
    } else { return; }
    echo '<script type="application/ld+json">' . wp_json_encode($data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) . '</script>';
}
add_action('wp_head', 'sf_schema');
