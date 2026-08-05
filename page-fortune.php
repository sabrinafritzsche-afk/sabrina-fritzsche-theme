<?php
/**
 * Template Name: Fortune Portal
 * Template Post Type: page
 */
if (!defined('ABSPATH')) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('fortune-page'); ?>>
<?php wp_body_open(); ?>
<a class="screen-reader-text" href="#fortune-main">Zum Inhalt springen</a>

<header class="fortune-header" aria-label="Fortune Portal">
    <a class="fortune-wordmark" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Sabrina Fritzsche Startseite">
        Sabrina Fritzsche<span>.</span>
    </a>
    <p>For the astro babes</p>
</header>

<main id="fortune-main">
    <section class="fortune-landing" id="reveal-your-lots" aria-labelledby="fortune-title">
        <div class="fortune-hero-art" aria-hidden="true">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/fortune-hero-celestial-v1-transparent.png'); ?>" alt="">
        </div>
        <span class="fortune-coral-planet" aria-hidden="true"></span>
        <div class="fortune-star-scatter" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
        <div class="fortune-landing-copy">
            <div class="fortune-celestial-signature" aria-hidden="true">
                <span>☉</span><i></i><span>☽</span><i></i><span>♀</span><i></i><span>✦</span>
            </div>
            <p class="fortune-kicker">Fortune · Spirit · Eros</p>
            <h1 id="fortune-title">Three points.<br>One <em>powerful</em><br>reading<span class="fortune-pink-dot">.</span></h1>
            <p class="fortune-intro">Entdecke, was dich unterstützt, wie du klare Entscheidungen triffst und was dein echtes Begehren weckt.</p>
            <p class="fortune-editorial-note">Die drei astrologischen Punkte zeigen dir unterschiedliche Seiten deines Lebens: welche Bedingungen dir Stabilität geben, wie du bewusst handelst und welche Menschen, Ideen oder Erfahrungen dich wirklich anziehen. Sie werden aus deinen Geburtsdaten berechnet und anschließend persönlich für dich erklärt.</p>
        </div>

        <div class="fortune-form-card">
            <div class="fortune-form-title-row">
                <p class="fortune-form-eyebrow">Calculate your three Lots</p>
                <span class="fortune-form-moon" aria-hidden="true">☾</span>
            </div>
            <h2>Enter your birth details.</h2>
            <form class="fortune-form" id="fortune-form" novalidate>
                <div class="fortune-field fortune-field-full">
                    <label for="fortune-name">Dein Vorname <span>optional</span></label>
                    <input id="fortune-name" name="name" type="text" maxlength="40" autocomplete="given-name" placeholder="Sabrina">
                </div>

                <div class="fortune-field">
                    <label for="fortune-date">Geburtsdatum</label>
                    <input id="fortune-date" name="date" type="date" min="1900-01-01" required>
                </div>

                <div class="fortune-field">
                    <label for="fortune-time">Geburtszeit</label>
                    <input id="fortune-time" name="time" type="time" required>
                </div>

                <label class="fortune-consent fortune-field-full">
                    <input id="fortune-consent" type="checkbox" required>
                    <span>Ich stimme der einmaligen Übermittlung meines Geburtsorts zur Ermittlung von Koordinaten und Zeitzone zu.</span>
                </label>

                <div class="fortune-field fortune-field-full fortune-place-field">
                    <label for="fortune-place">Geburtsort</label>
                    <input id="fortune-place" name="place" type="search" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="fortune-place-results" placeholder="Ort eingeben …" required>
                    <ul id="fortune-place-results" class="fortune-place-results" role="listbox" hidden></ul>
                    <p class="fortune-place-confirmation" id="fortune-place-confirmation" aria-live="polite"></p>
                </div>

                <fieldset class="fortune-focus fortune-field-full">
                    <legend>Was beschäftigt dich gerade? <span>optional</span></legend>
                    <p>Wähle ein Thema, wenn du dein Reading auf deine aktuelle Situation beziehen möchtest.</p>
                    <div class="fortune-focus-options">
                        <label><input type="radio" name="focus" value="work"><span>Arbeit &amp; Wirkung</span></label>
                        <label><input type="radio" name="focus" value="love"><span>Liebe &amp; Beziehungen</span></label>
                        <label><input type="radio" name="focus" value="decision"><span>Eine Entscheidung</span></label>
                        <label><input type="radio" name="focus" value="change"><span>Veränderung &amp; Neuanfang</span></label>
                        <label><input type="radio" name="focus" value="self"><span>Mich selbst besser verstehen</span></label>
                    </div>
                </fieldset>

                <fieldset class="fortune-focus fortune-focus-detail fortune-field-full" id="fortune-focus-detail" hidden>
                    <legend>Was beschreibt deine Situation am besten? <span>optional</span></legend>
                    <p>Damit können wir die Hinweise noch genauer auf deinen Alltag beziehen.</p>
                    <div class="fortune-focus-options" id="fortune-focus-detail-options"></div>
                </fieldset>

                <div class="fortune-field-full">
                    <button class="fortune-submit" type="submit">
                        <span>Calculate my Lots</span><span aria-hidden="true">→</span>
                    </button>
                    <p class="fortune-form-note">Deine Geburtsdaten und dein Ergebnis werden nicht gespeichert.</p>
                    <p class="fortune-error" id="fortune-error" role="alert"></p>
                </div>
            </form>
        </div>
    </section>

    <section class="fortune-lots-intro" aria-label="Die drei Lots">
        <header>
            <p class="fortune-kicker">Your personal astrological shortcut</p>
            <h2>Not your whole chart.<br><em>The three points to remember.</em></h2>
        </header>
        <p class="fortune-lots-explainer">Die drei Lots sind berechnete Punkte in deinem Geburtshoroskop. Sie sind keine Planeten. Jeder von ihnen beantwortet eine andere Frage: Was unterstützt dich? Wie setzt du deine Entscheidungen um? Was weckt dein Begehren?</p>
        <div class="fortune-lots-row">
            <article><div class="fortune-lot-heading"><span>01 · Was unterstützt mich?</span><b aria-hidden="true">⊗</b></div><h3>Fortune</h3><p>Fortune zeigt, welche Menschen, Bedingungen und Lebensbereiche dir Stabilität geben. Du erkennst daran, was dir im Alltag guttut und wo du nicht ständig gegen deine eigenen Bedürfnisse arbeiten musst.</p></article>
            <article><div class="fortune-lot-heading"><span>02 · Wie handle ich bewusst?</span><b aria-hidden="true">☉</b></div><h3>Spirit</h3><p>Spirit beschreibt, wie du aus einem Wunsch eine klare Entscheidung machst. Du erkennst daran, welche Vorgehensweise dir hilft, wirklich ins Handeln zu kommen und Verantwortung für deine Entscheidung zu übernehmen.</p></article>
            <article><div class="fortune-lot-heading"><span>03 · Was begehre ich?</span><b aria-hidden="true">♡</b></div><h3>Eros</h3><p>Eros zeigt, welche Menschen, Ideen und Erfahrungen deine Anziehung und Lebensfreude wecken. Das kann sich in Liebe und Sexualität zeigen, aber auch in kreativen Projekten, Freundschaften oder Aufgaben, die dich spürbar lebendiger machen.</p></article>
        </div>
    </section>

    <section class="fortune-loading" id="fortune-loading" hidden aria-live="polite">
        <div class="fortune-sun" aria-hidden="true"><span></span></div>
        <p>We are reading the sky …</p>
    </section>

    <section class="fortune-results" id="fortune-results" hidden aria-live="polite">
        <div id="fortune-results-content"></div>
    </section>

    <section class="fortune-method">
        <p class="fortune-section-number">A note on the stars</p>
        <p>Diese Deutung nutzt drei traditionelle astrologische Berechnungen: Fortune, Spirit und Eros. Für Geburten am Tag und in der Nacht gelten unterschiedliche Formeln. Die Lebensbereiche werden nach dem Whole Sign Häusersystem berechnet. Das Ergebnis soll dir helfen, dich selbst besser zu verstehen. Es sagt kein festes Schicksal voraus und ersetzt keine medizinische, rechtliche oder finanzielle Beratung.</p>
    </section>
</main>

<footer class="fortune-footer">
    <div class="fortune-footer-meta">
        <p>Made with stardust, precision & a little bit of juice.</p>
        <p>© <?php echo esc_html(wp_date('Y')); ?> Sabrina Fritzsche</p>
    </div>
    <div class="fortune-signoff">
        <p>Das Wichtigste: Alles, was Du brauchst, ist schon da.</p>
        <p>Big hug.<br>Sabrina</p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
