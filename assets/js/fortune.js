(() => {
    'use strict';

    const Astro = window.Astronomy;
    const config = window.sfFortune || {};
    if (!Astro) { return; }

    const SIGNS = [
        { name: 'Widder', symbol: '♈', element: 'Feuer', mode: 'kardinal', essence: 'Mut und Bewegung' },
        { name: 'Stier', symbol: '♉', element: 'Erde', mode: 'fix', essence: 'Verkörperung und Beständigkeit' },
        { name: 'Zwillinge', symbol: '♊', element: 'Luft', mode: 'veränderlich', essence: 'Austausch und Neugier' },
        { name: 'Krebs', symbol: '♋', element: 'Wasser', mode: 'kardinal', essence: 'Nähe und innere Sicherheit' },
        { name: 'Löwe', symbol: '♌', element: 'Feuer', mode: 'fix', essence: 'Selbstausdruck und Strahlkraft' },
        { name: 'Jungfrau', symbol: '♍', element: 'Erde', mode: 'veränderlich', essence: 'Präzision und gelebte Fürsorge' },
        { name: 'Waage', symbol: '♎', element: 'Luft', mode: 'kardinal', essence: 'Beziehung und Ausgleich' },
        { name: 'Skorpion', symbol: '♏', element: 'Wasser', mode: 'fix', essence: 'Tiefe und Transformation' },
        { name: 'Schütze', symbol: '♐', element: 'Feuer', mode: 'veränderlich', essence: 'Weite und Sinn' },
        { name: 'Steinbock', symbol: '♑', element: 'Erde', mode: 'kardinal', essence: 'Verantwortung und Meisterschaft' },
        { name: 'Wassermann', symbol: '♒', element: 'Luft', mode: 'fix', essence: 'Freiheit und Zukunft' },
        { name: 'Fische', symbol: '♓', element: 'Wasser', mode: 'veränderlich', essence: 'Hingabe und Intuition' },
    ];

    const HOUSES = [
        'Identität, Körper und unmittelbare Präsenz',
        'Werte, Ressourcen, Geld und Selbstwert',
        'Stimme, Lernen, Denken und nahes Umfeld',
        'Zuhause, Wurzeln, Familie und innerer Boden',
        'Kreativität, Freude, Romantik und Selbstausdruck',
        'Alltag, Arbeit, Routinen, Fürsorge und Gesundheit',
        'Beziehungen, Partnerschaft und das Gegenüber',
        'Intimität, gemeinsame Ressourcen, Krise und Wandlung',
        'Sinn, Weltanschauung, Reisen und geistige Weite',
        'Berufung, Verantwortung, Öffentlichkeit und Wirkung',
        'Freundschaft, Community, Visionen und Zukunft',
        'Rückzug, Träume, Spiritualität und das Unsichtbare',
    ];

    const RULERS = ['Mars', 'Venus', 'Merkur', 'Mond', 'Sonne', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    const PLANET_BODY = {
        Sonne: Astro.Body.Sun,
        Mond: Astro.Body.Moon,
        Merkur: Astro.Body.Mercury,
        Venus: Astro.Body.Venus,
        Mars: Astro.Body.Mars,
        Jupiter: Astro.Body.Jupiter,
        Saturn: Astro.Body.Saturn,
        Uranus: Astro.Body.Uranus,
        Neptun: Astro.Body.Neptune,
        Pluto: Astro.Body.Pluto,
    };

    const PLANET_STRATEGY = {
        Sonne: 'Sichtbarkeit, schöpferischen Selbstausdruck und die Erlaubnis, ganz du selbst zu sein',
        Mond: 'emotionale Ehrlichkeit, Körperwissen, Rhythmus und das, was sich wirklich sicher anfühlt',
        Merkur: 'Sprache, Fragen, Lernen, kluge Verbindungen und bewegliches Denken',
        Venus: 'Beziehung, Genuss, Ästhetik, Anziehung und die Fähigkeit, Wert zu erkennen',
        Mars: 'Mut, klare Grenzen, Initiative und den Moment, in dem aus einem Impuls eine Handlung wird',
        Jupiter: 'Vertrauen, Sinn, Wachstum, Großzügigkeit und einen Horizont, der weiter ist als die aktuelle Situation',
        Saturn: 'Verantwortung, Geduld, Struktur, Konsequenz und die Bereitschaft, etwas wirklich zu meistern',
        Uranus: 'Freiheit, Eigenwilligkeit, Überraschung und den Bruch mit einer Form, die zu eng geworden ist',
        Neptun: 'Intuition, Bilder, Mitgefühl, Hingabe und das feine Wissen jenseits rein logischer Argumente',
        Pluto: 'Wahrheit, Machtbewusstsein, radikale Ehrlichkeit und Transformation ohne kosmetische Abkürzungen',
    };

    const PLANET_SHADOW = {
        Sonne: 'Im Schatten wird Sichtbarkeit zur Bestätigungssucht: Du tust nicht mehr, was dich ausdrückt, sondern was dein Bild stabil hält.',
        Mond: 'Im Schatten regiert das momentane Gefühl die ganze Wirklichkeit. Schutz wird Rückzug, Bedürfnis wird Anspruch und Vertrautheit ersetzt Entwicklung.',
        Merkur: 'Im Schatten wird Denken zur Distanz: analysieren, erklären und umformulieren, damit keine Entscheidung den Körper erreichen muss.',
        Venus: 'Im Schatten wird Resonanz zur Anpassung. Schönheit, Gefallen und Harmonie halten etwas zusammen, das eine klare Wertentscheidung bräuchte.',
        Mars: 'Im Schatten wird Handlung reaktiv. Druck, Kampf oder sexuelle Spannung ersetzen Richtung, weil Verletzlichkeit sich zu langsam oder zu ungeschützt anfühlt.',
        Jupiter: 'Im Schatten wird Wachstum zur Übertreibung. Mehr Möglichkeiten, größere Versprechen und starke Überzeugungen verdecken Grenzen oder fehlende Erdung.',
        Saturn: 'Im Schatten wird Verantwortung zu Kontrolle. Du trägst zu viel, verlangst zu viel oder verschiebst Lebendigkeit auf den Tag, an dem endlich alles sicher ist.',
        Uranus: 'Im Schatten wird Freiheit zum Reflex gegen Bindung. Überraschung und Bruch halten dich autonom, aber nicht unbedingt verbunden oder wirksam.',
        Neptun: 'Im Schatten verschwimmen Wunsch, Intuition und Projektion. Hingabe wird Selbstverlust, wenn Realität nur noch stört.',
        Pluto: 'Im Schatten wird Wahrheit zur Machtfrage. Intensität, Kontrolle und ein Alles-oder-nichts-Muster ersetzen das langsamere Risiko echter Gegenseitigkeit.',
    };

    const LOTS = {
        fortune: {
            name: 'Fortune',
            symbol: '⊗',
            subtitle: 'Was dich trägt',
            question: 'Wo kommt dir das Leben entgegen?',
            opening: [
                'Dein Glück ist kein Zufallsfund. Es hat eine Landschaft, einen Rhythmus und eine ganz eigene Art, dich zu finden.',
                'Fortune zeigt nicht, wo du dich noch mehr anstrengen musst. Es zeigt, wo das Leben aufhört, gegen dich zu arbeiten.',
                'Hier beginnt dein natürlicher Flow: körperlich, materiell und erstaunlich konkret.',
            ],
            signs: [
                'Dein Flow liebt den ersten Schritt. Chancen entstehen, wenn du nicht auf Erlaubnis wartest, sondern deinem Instinkt vertraust und Bewegung erzeugst. Mut ist bei dir kein hübsches Ideal – er ist ein Öffnungsmechanismus.',
                'Fülle wächst langsam, sinnlich und belastbar. Dein Körper weiß oft früher als dein Kopf, was richtig ist. Wenn du vereinfachst, verwurzelst und etwas kontinuierlich nährst, beginnt das Leben, dich zurückzunähren.',
                'Das Leben findet dich über Worte, Informationen und scheinbar zufällige Begegnungen. Beweglichkeit ist dein Glücksfaktor. Solange du fragst, sprichst und verschiedene Türen offen hältst, bleibt auch der Flow in Bewegung.',
                'Dein Glück braucht einen inneren Boden. Es wächst, wenn du Nähe zulässt, deinem Gefühl glaubst und Räume erschaffst, in denen du nicht funktionieren musst. Weichheit ist hier keine Schwäche, sondern Orientierung.',
                'Fortune im Löwen antwortet auf Sichtbarkeit. Wenn du spielst, kreierst und großzügig mit deiner Lebendigkeit umgehst, reagiert die Welt. Dein Glück will nicht im Hintergrund verwaltet, sondern verkörpert werden.',
                'Dein Flow wohnt im Konkreten: in guten Routinen, präziser Arbeit und der Fähigkeit, das Wesentliche im Detail zu erkennen. Du wirst getragen, wenn du verbesserst, ohne dich dabei selbst zum ewigen Problem zu erklären.',
                'Beziehung ist ein Türöffner. Schönheit, Resonanz und ein echtes Gegenüber bringen dich in Bewegung. Dein Glück wächst nicht durch Selbstaufgabe, sondern dort, wo Verbindung und Selbstachtung gleichzeitig Platz haben.',
                'In der Tiefe liegen deine Ressourcen. Krisen, Wahrheit und Wandlung können für dich überraschend fruchtbar werden, sobald du aufhörst, das Unvermeidliche oberflächlich zu beruhigen. Dein Flow kennt den Weg durch das Tabu.',
                'Weite trägt dich. Reisen, Lernen, Humor und ein größerer Sinnzusammenhang öffnen Türen, die unter Kontrolle verschlossen bleiben. Dein Glück wird großzügiger, wenn du dein Leben nicht auf das bereits Bekannte reduzierst.',
                'Dein Glück ist gebaut, nicht erträumt. Es kommt durch Ausdauer, klare Standards und Entscheidungen, die auch morgen noch tragen. Du erntest vielleicht später – dafür oft mit einer Substanz, die niemand so leicht nehmen kann.',
                'Dein Flow braucht Freiheit und ein Stück Zukunft. Ungewöhnliche Menschen, Communities und Lösungen außerhalb der Norm können zu echten Glückskanälen werden. Was dich anders macht, ist häufig genau das, was dich trägt.',
                'Fortune in den Fischen wirkt über Hingabe, Intuition und Synchronizität. Du kannst nicht alles erzwingen, aber du musst lernen, feine Signale von bloßer Flucht zu unterscheiden. Wenn du präsent loslässt, fügt sich oft mehr als geplant.',
            ],
            houses: [
                'Das Leben kommt dir entgegen, wenn du dich selbst bewohnst. Körper, Auftreten und Eigenständigkeit sind keine Nebensache – sie sind dein unmittelbarer Glückskanal. Je weniger du dich für den Raum entschuldigst, den du einnimmst, desto deutlicher kann das Leben überhaupt auf dich reagieren.',
                'Flow entsteht über Werte, Geld, Besitz und eine ruhige Beziehung zu deinem Körper. Was du nachhaltig aufbaust und wirklich wertschätzt, beginnt auch dich zu halten.',
                'Gespräche, Lernen, Schreiben, Nachbarschaft und kurze Wege sind voller Türen. Deine Neugier bringt dich oft genauer ans Ziel als ein vollständig ausgearbeiteter Masterplan. Wichtig ist, dass Information irgendwann Kontakt erzeugt: eine Nachricht, eine Frage oder ein Satz kann hier mehr bewegen als monatelanges inneres Vorbereiten.',
                'Zuhause, Herkunft und emotionaler Boden tragen dein Fortune. Je sicherer dein inneres Fundament, desto weniger musst du Glück im Außen jagen. Das bedeutet nicht, in alten Familienmustern zu bleiben, sondern bewusst einen Ort und eine innere Zugehörigkeit zu schaffen, die dich heute wirklich halten.',
                'Spiel, Freude, Dating, Kinder und kreative Sichtbarkeit sind dein Resonanzraum. Wenn du dich traust, etwas einfach aus Lust zu tun, antwortet das Leben besonders deutlich.',
                'Dein Alltag ist kein Hindernis auf dem Weg zum Glück – er ist der Ort, an dem es entsteht. Gute Routinen, sinnvolle Arbeit und körperliche Fürsorge sind hier echte Magie.',
                'Menschen sind Türen. Partnerschaften und Begegnungen auf Augenhöhe bringen Chancen, Unterstützung und Spiegel. Der Schlüssel ist, dich in Beziehung nicht selbst zu verlassen. Dein Glück liegt nicht darin, gewählt zu werden, sondern in Verbindungen, in denen Gegenseitigkeit deine Möglichkeiten erweitert und deine Eigenständigkeit bestehen bleibt.',
                'Fortune liegt in Tiefe, Bindung und dem Mut, gemeinsam durch Wandlung zu gehen. Auch geteilte Ressourcen können tragen – wenn Macht und Abhängigkeit ehrlich benannt werden.',
                'Reisen, Studium, Lehre und Sinnsuche erweitern dein Feld. Dein Glück taucht häufig dort auf, wo du bereit bist, deine bisherige Sicht auf die Welt zu überschreiten.',
                'Öffentlichkeit, Verantwortung und Berufung sind Träger deines Fortune. Wenn du deine Rolle annimmst, ohne dich mit Status zu verwechseln, wird Wirkung zu einem natürlichen Strom.',
                'Freundschaften, Netzwerke und gemeinsame Zukunftsbilder tragen dich. Dein persönliches Glück ist eng mit den Räumen verbunden, die du zusammen mit anderen möglich machst. Achte auf Menschen, die nicht nur deine Gegenwart mögen, sondern Zukunft mit dir denken, Verantwortung teilen und ungewöhnliche Ideen praktisch unterstützen.',
                'Dein Fortune arbeitet hinter den Kulissen. Rückzug, Träume, Spiritualität und stille Regeneration öffnen einen Flow, der verschwindet, sobald du ihn kontrollieren oder beweisen willst.',
            ],
            jokers: [
                'Was würde ich beginnen, wenn ich nicht erst auf absolute Sicherheit warten müsste?',
                'Was trägt mich auch dann noch, wenn der schnelle Reiz verschwunden ist?',
                'Welches Gespräch oder welche Frage könnte heute eine neue Tür öffnen?',
                'Wo darf ich mich sicher machen, statt mich nur zusammenzureißen?',
                'Was will heute durch mich sichtbar, spielerisch oder großzügig werden?',
                'Welche kleine Ordnung würde meinem Körper und meinem Alltag sofort Erleichterung schenken?',
                'Welche Verbindung fühlt sich gleichzeitig schön, fair und wahr an?',
                'Welche Wahrheit birgt genau die Ressource, die ich bisher gesucht habe?',
                'Welche Entscheidung macht meinen Horizont größer, ohne dass ich vor meinem jetzigen Leben davonlaufe?',
                'Welche Entscheidung würde mein zukünftiges Ich respektieren?',
                'Wo ist mein Anderssein keine Störung, sondern die Lösung?',
                'Was fügt sich, wenn ich präsent bleibe und den Griff ein wenig lockere?',
            ],
            shadows: [
                'Der Schatten ist nicht mangelnder Mut, sondern die Sucht nach Vorwärtsbewegung. Du kannst Konflikt, Risiko oder einen Neuanfang erzeugen, nur damit du dich wieder handlungsfähig fühlst. Dann wird Initiative zur Selbstverteidigung und Unterstützung fühlt sich fälschlich wie Schwäche an.',
                'Was dich stabil macht, kann dich auch festsetzen. Du hältst möglicherweise an Beziehungen, Besitz oder Routinen fest, weil Veränderung sich körperlich unsicher anfühlt. Genuss kippt in Betäubung, Loyalität in Stillstand und Geduld in das endlose Vertagen einer längst fälligen Bewegung.',
                'Deine Beweglichkeit kann zur eleganten Flucht vor Tiefe werden. Noch eine Information, noch ein Gespräch, noch eine interessante Option – und niemand merkt, dass du dich nie wirklich festlegen musst. Der Schatten ist nicht Unklarheit, sondern die Gewohnheit, Konsequenz durch Komplexität zu vermeiden.',
                'Dein Bedürfnis nach Sicherheit kann dich zum emotionalen Radar für alle anderen machen. Du spürst Stimmungen, übernimmst Fürsorge und hoffst, dadurch selbst gehalten zu werden. Wenn das unausgesprochen bleibt, entstehen Rückzug, Schuld oder subtile Kontrolle statt echter Nähe.',
                'Sichtbarkeit nährt dich – doch im Schatten wird Resonanz zum Beweis deines Wertes. Dann brauchst du Applaus, romantische Intensität oder eine besondere Rolle, um dich lebendig zu fühlen. Die verletzlichste Übung ist nicht größer zu strahlen, sondern auch ohne Publikum bei dir zu bleiben.',
                'Kompetenz kann zu einer sehr respektablen Form von Selbstablehnung werden. Du verbesserst, ordnest und hilfst, bis kein Fehler mehr sichtbar ist – und leider auch kaum noch Lust. Der Schatten beginnt dort, wo dein Wert davon abhängt, nützlich, kontrolliert oder unangreifbar zu sein.',
                'Du kannst so fein auf das Gegenüber reagieren, dass deine eigene Position zur Verhandlungsmasse wird. Harmonie sieht dann schön aus, kostet dich aber Wahrheit. Der Schatten ist nicht Beziehung, sondern die Hoffnung, eine perfekte Balance könne dich vor Ablehnung und klaren Konflikten schützen.',
                'Tiefe kann berauschen. Du könntest Intensität mit Wahrheit, Misstrauen mit Intuition oder Krise mit echter Intimität verwechseln. Der Schatten sucht Macht über das Unsichere – durch Tests, Geheimnisse, Rückzug oder totale Verschmelzung – statt Verletzlichkeit ohne Garantie zu riskieren.',
                'Dein Glaube an das Größere kann zur Ausrede werden, das Naheliegende nicht zu leben. Du springst zur nächsten Vision, Reise oder Wahrheit, sobald Alltag, Ambivalenz oder Verantwortung enger werden. Optimismus ist dann kein Vertrauen, sondern Distanz zu dem, was gerade wirklich weh tut.',
                'Du kannst Last mit Bedeutung verwechseln. Je schwieriger etwas ist, desto wertvoller erscheint es; je mehr du trägst, desto sicherer fühlst du dich in deiner Rolle. Der Schatten ist ein Leben, das von außen souverän aussieht, während innen kaum noch Platz für Abhängigkeit, Spiel oder Empfang bleibt.',
                'Freiheit kann zum Reflex gegen jede Form von Bindung werden. Du erkennst früh, was veraltet ist, aber distanzierst dich vielleicht auch von Menschen, Bedürfnissen oder Verantwortung, bevor sie dich wirklich berühren. Anderssein wird zum Gefängnis, wenn Zugehörigkeit automatisch wie Anpassung wirkt.',
                'Durchlässigkeit ist deine Gabe und dein Risiko. Du kannst Synchronizität mit Wunschdenken, Mitgefühl mit Selbstaufgabe oder Hingabe mit fehlenden Grenzen verwechseln. Der Schatten ist nicht Sensibilität, sondern das Verschwinden aus dem eigenen Leben, während du auf ein Zeichen wartest.',
            ],
            transfers: [
                'Wähle eine sichtbare Handlung, die nur dir gehört: eine Grenze, ein Auftreten oder eine körperliche Entscheidung. Frage nicht zuerst, wie sie wirkt – prüfe, ob du dich darin tatsächlich bewohnst.',
                'Mach einen ehrlichen Ressourcen-Check: Geld, Zeit, Energie, Besitz. Was nährt dich, was beruhigt nur kurzfristig und was bezahlst du längst mit deinem Selbstwert?',
                'Sprich einen Gedanken aus, bevor er perfekt ist. Schreib, frage, ruf an oder teile die Idee. Dein Transfer beginnt, wenn Neugier eine reale Verbindung erzeugt statt nur weitere innere Schleifen.',
                'Verändere etwas Konkretes an deinem Zuhause oder deinen emotionalen Routinen, das Sicherheit nicht nur symbolisiert, sondern herstellt. Nähe beginnt bei einem Nervensystem, das nicht ständig auf Alarm bleiben muss.',
                'Plane Zeit für Freude, Flirt oder Kreativität, bevor alles Produktive erledigt ist. Beobachte, wie viel Erlaubnis du brauchst, um etwas zu tun, das keinen anderen Zweck als Lebendigkeit hat.',
                'Wähle eine kleine Routine, die täglich zehn Minuten echte Erleichterung schafft. Nicht optimieren, nicht tracken, nicht perfektionieren – sieben Tage lang nur wiederholen und beobachten.',
                'Führe ein Gespräch, in dem du gleichzeitig verbunden und klar bleibst. Sag, was du willst, was du nicht willst und worüber du noch nicht sicher bist, ohne das Gegenüber für deine Wahrheit verantwortlich zu machen.',
                'Benenne eine Abhängigkeit, Schuld, Machtfrage oder geteilte Ressource, die bisher im Halbdunkel lag. Dein Transfer ist nicht sofortige Lösung, sondern eine Wahrheit, die nicht länger heimlich regiert.',
                'Tu etwas, das deine bisherige Perspektive real erweitert: eine Reise, ein Seminar, ein schwieriges Buch oder ein Gespräch außerhalb deiner Bubble. Formuliere danach, was du nun anders leben willst.',
                'Definiere eine Verantwortung, die du bewusst annimmst – und eine, die du zurückgibst. Meisterschaft wächst nicht durch maximale Last, sondern durch klare Autorenschaft.',
                'Bring eine Idee in eine Gemeinschaft, statt sie nur allein genial zu finden. Bitte um Resonanz, suche Verbündete und beobachte, ob deine Vision Beziehung aushält.',
                'Schaffe einen stillen Raum ohne Input und ohne spirituelle Performance. Schreib danach auf, was wirklich da war – einschließlich Leere, Widerstand oder Müdigkeit. Auch das Unspektakuläre gehört zu deiner Intuition.',
            ],
        },
        spirit: {
            name: 'Spirit',
            symbol: '✦',
            subtitle: 'Was du erschaffst',
            question: 'Wo nimmt dein Wille Form an?',
            opening: [
                'Spirit ist der Teil in dir, der nicht nur hofft. Er entscheidet, richtet sich aus und übernimmt Verantwortung für das, was entstehen soll.',
                'Hier wartet deine innere Autorität. Nicht die lauteste Stimme – sondern die, die weiß, wofür du wirklich Ja sagen willst.',
                'Dein Spirit zeigt, wie aus einer Möglichkeit eine Richtung und aus einer Richtung ein gelebtes Leben wird.',
            ],
            signs: [
                'Dein Wille ist direkt, schnell und initiierend. Du findest Klarheit häufig erst in der Bewegung. Wenn du zu lange auf den perfekten Plan wartest, verlierst du den Kontakt zu der Kraft, die eigentlich führen möchte.',
                'Du willst, was Bestand hat. Entscheidungen reifen in dir körperlich und langsam, werden dann aber sehr tragfähig. Dein Spirit ist nicht sprunghaft – er baut Werte, Beziehungen und Werke, die bleiben können.',
                'Dein Wille denkt, fragt und verknüpft. Mehrere Perspektiven sind kein Zeichen fehlender Klarheit, sondern Teil deiner Intelligenz. Entscheidend ist, irgendwann aus der interessanten Möglichkeit einen ausgesprochenen Satz zu machen.',
                'Du entscheidest aus emotionaler Verbundenheit. Dein Spirit schützt, nährt und baut Zugehörigkeit. Wenn du fremde Bedürfnisse mit deiner eigenen Wahrheit verwechselst, wird der Kompass allerdings leise.',
                'Dein Wille möchte gestalten, führen und gesehen werden. Du bist am klarsten, wenn Herz und Handlung dieselbe Richtung haben. Anerkennung kann dich stärken – sie darf aber nicht die Quelle deiner Entscheidung werden.',
                'Dein Spirit arbeitet präzise, nützlich und differenziert. Du erkennst, was verbessert werden kann, und kannst daraus echte Meisterschaft entwickeln. Perfektionismus wird erst dann zum Problem, wenn er jede Entscheidung vertagt.',
                'Du willst in Beziehung zu etwas kommen: zu Menschen, Schönheit, Gerechtigkeit oder einer stimmigen Form. Dein Wille wägt ab. Seine Reife zeigt sich, wenn Harmonie nicht länger bedeutet, die eigene Position zu verschweigen.',
                'Dein Wille ist kompromisslos, strategisch und transformierend. Halbherzige Entscheidungen erschöpfen dich mehr als radikale. Wenn du dich wirklich festlegst, kann dein Spirit ganze innere Landschaften neu ordnen.',
                'Du entscheidest in Richtung Wachstum, Wahrheit und Sinn. Dein Spirit braucht eine Vision, die größer ist als reine Effizienz. Achte darauf, dass Begeisterung nicht nur den Start liebt, sondern auch eine Form bekommt.',
                'Dein Wille ist konzentriert und langfristig. Verantwortung macht dich klarer, solange du sie bewusst wählst. Du kannst große Dinge tragen – musst aber nicht jede Schwere automatisch zu deinem Auftrag erklären.',
                'Dein Spirit entscheidet frei, unkonventionell und zukunftsorientiert. Authentizität ist wichtiger als Anpassung. Die Kunst besteht darin, nicht nur gegen eine alte Form zu rebellieren, sondern eine bessere wirklich aufzubauen.',
                'Dein Wille kommt als Ahnung, Bild oder innere Strömung. Du brauchst Räume, in denen das Leise hörbar wird. Sobald du deine Intuition erdest, kann aus einem scheinbar formlosen Traum eine überraschend klare Richtung werden.',
            ],
            houses: [
                'Dein Wille will durch dich selbst sichtbar werden. Identität, Körper und Präsenz sind die Bühne, auf der du Entscheidungskraft entwickelst. Jede Entscheidung verändert hier auch dein Selbstbild: Du wirst nicht erst sicher und handelst dann – du erkennst dich zunehmend in dem, was du bewusst tust.',
                'Spirit wird konkret, wenn du Werte definierst und Ressourcen aufbaust. Geld, Selbstwert und Besitz fragen dich: Was ist mir wichtig genug, um es zu nähren?',
                'Deine Stimme ist ein Werkzeug des Willens. Schreiben, Lehren, Fragen und Austausch helfen dir, Richtung nicht nur zu denken, sondern auszusprechen. Sprache wird zur Handlung, sobald du dich festlegst, Wissen weitergibst oder einen Gedanken so formulierst, dass andere tatsächlich darauf reagieren können.',
                'Dein Spirit baut von innen nach außen. Familie, Herkunft, Zuhause und emotionale Autonomie sind Felder bewusster Gestaltung. Deine Aufgabe ist nicht, jede Vergangenheit zu reparieren, sondern zu entscheiden, welche Regeln, Bindungen und Formen von Zugehörigkeit in deinem heutigen Leben weiterwirken dürfen.',
                'Kreativität, Freude und Selbstausdruck sind keine Freizeitbeilage, sondern Ausdruck deiner bewussten Lebenskraft. Du willst etwas erschaffen, das deine Signatur trägt. Spirit fordert hier den Mut, aus privater Begabung ein sichtbares Werk zu machen – auch wenn Spiel dadurch plötzlich Verantwortung bekommt.',
                'Dein Wille zeigt sich im Alltag: in Routinen, Arbeit, Dienst und dem, was du verlässlich wiederholst. Große Absichten werden hier durch kleine Konsequenz wahr.',
                'Beziehung ist ein Feld bewusster Entscheidung. Du entwickelst Richtung im Gegenüber – und lernst, Bindung nicht mit dem Verlust eigener Führung zu verwechseln. Verträge, Partnerschaften und klare Absprachen zeigen dir, ob zwei Willen wirklich gemeinsam gestalten oder nur auf gegenseitige Anpassung hoffen.',
                'Spirit will in die Tiefe. Intimität, Macht, gemeinsame Ressourcen und Wandel fordern klare Entscheidungen und die Bereitschaft, Konsequenzen nicht zu beschönigen. Du wirst hier besonders wirksam, wenn du Abhängigkeit weder verleugnest noch romantisierst, sondern Verantwortung, Zustimmung und Risiko offen verhandelst.',
                'Dein Wille sucht Weite, Wissen und eine tragfähige Wahrheit. Lehre, Reisen und Weltanschauung werden zu Feldern, in denen du bewusst Richtung gibst. Eine Überzeugung wird erst zu Spirit, wenn sie nicht nur inspiriert, sondern deine Entscheidungen, deine Ethik und deinen Umgang mit anderen sichtbar verändert.',
                'Hier will Spirit wirken. Berufung, Führung, Verantwortung und Öffentlichkeit verlangen, dass du dich für eine Rolle entscheidest, statt nur auf Anerkennung zu warten. Sichtbarkeit ist dabei kein Selbstzweck: Sie wird zur Konsequenz daraus, dass du für eine bestimmte Wirkung wirklich Autorenschaft übernimmst.',
                'Du gestaltest Zukunft mit anderen. Gruppen, Freundschaften, Community und gemeinsame Ideale sind Orte, an denen dein Wille gesellschaftliche Form annimmt. Deine Vision wird reifer, wenn sie Zusammenarbeit, Widerspruch und geteilte Verantwortung aushält – nicht nur Zustimmung zu deiner Idee.',
                'Spirit wirkt im Verborgenen. Innere Arbeit, Rückzug und Spiritualität verlangen eine Führung, die nicht ständig von außen bestätigt werden kann. Entscheidungen reifen hier oft still; entscheidend ist, dass Rückzug irgendwann eine klare innere Ausrichtung hervorbringt und nicht zum dauerhaften Verschwinden wird.',
            ],
            jokers: [
                'Was entscheide ich, wenn ich mich selbst nicht länger aus meiner Entscheidung herausrechne?',
                'Wofür bin ich bereit, langfristig Zeit, Geld oder Aufmerksamkeit bereitzustellen?',
                'Welcher klare Satz würde aus meinen Gedanken eine Richtung machen?',
                'Welche Entscheidung schützt meine innere Wahrheit – nicht nur den Frieden im Raum?',
                'Was würde ich wählen, wenn mein Herz führen dürfte, ohne um Applaus zu bitten?',
                'Welche wiederholbare Handlung macht meine Absicht real?',
                'Welche Wahrheit braucht meine Beziehung zu mir selbst und zu anderen?',
                'Was muss enden, damit mein eigentliches Ja Kraft bekommt?',
                'Welche größere Wahrheit soll meine nächste Entscheidung leiten?',
                'Welche Verantwortung ist wirklich meine – und welche nur vertraute Schwere?',
                'Welche neue Form entspricht der Zukunft, die ich längst sehen kann?',
                'Wie kann ich meiner Intuition heute eine konkrete Form geben?',
            ],
            shadows: [
                'Du kannst Entscheidung mit Geschwindigkeit verwechseln. Dann wird jedes Zögern zum Feind, Widerstand zur Provokation und Kooperation fühlt sich wie Kontrollverlust an. Dein Wille ist stark – aber nicht jede Tür, die sich öffnen lässt, ist deine Tür.',
                'Deine Entschlossenheit kann zur stillen Verweigerung werden. Du bleibst bei einem Plan, Wert oder Versprechen, weil eine Kurskorrektur sich wie Verrat an dir selbst anfühlt. So schützt Beständigkeit irgendwann nicht mehr das Wesentliche, sondern nur noch das Bekannte.',
                'Dein Geist kann jede Entscheidung so brillant von mehreren Seiten betrachten, dass keine Seite je Realität werden muss. Worte ersetzen dann Handlung, Optionen ersetzen Hingabe. Der Schatten ist die Erzählung, du seist noch nicht klar – obwohl du die Konsequenz längst kennst.',
                'Du kannst deinen Willen über Fürsorge tarnen. Statt zu sagen, was du willst, machst du dich unentbehrlich, hoffst auf emotionale Gegenseitigkeit und ziehst dich verletzt zurück, wenn andere den unsichtbaren Vertrag nicht erfüllen. Schutz wird dann zu indirekter Führung.',
                'Dein Wunsch zu gestalten kann sich an Anerkennung binden. Ohne Resonanz zweifelst du am Weg; mit Resonanz überspielst du vielleicht Zweifel, die ernst genommen werden sollten. Der Schatten ist nicht Ego, sondern ein Wille, der sein Publikum braucht, um sich selbst zu glauben.',
                'Dein Anspruch kann jede lebendige Idee in ein Optimierungsprojekt verwandeln. Du verbesserst so lange, bis der Moment zum Handeln vorbei ist, oder definierst deinen Wert über Nützlichkeit. Perfektionismus ist hier oft Angst in sehr kompetenter Kleidung.',
                'Du kannst Entscheidung als endlose diplomatische Vorbereitung inszenieren. Alle Perspektiven werden gehört, nur deine eigene bleibt weichgezeichnet. Harmonie wird zur Machtstrategie, wenn niemand offen widersprechen darf und du trotzdem erwartest, verstanden zu werden.',
                'Dein Wille kann Kontrolle mit Integrität verwechseln. Du testest Loyalität, hältst Informationen zurück oder entscheidest erst, wenn du maximale Sicherheit über die Motive aller Beteiligten hast. Dann schützt Tiefe nicht mehr Wahrheit, sondern Unverwundbarkeit.',
                'Eine große Vision kann dich berauschen, bevor sie Verantwortung verlangt. Du sagst Ja zu Wachstum, Sinn und Freiheit – und unterschätzt Details, Grenzen oder die Menschen, die deine Versprechen mittragen. Überzeugung wird zum Schatten, wenn sie Korrektur nicht mehr verträgt.',
                'Du kannst deinen Wert an Belastbarkeit koppeln. Ziele werden härter, Zeitpläne enger und Bedürfnisse störender, weil Erfolg beweisen soll, dass du alles im Griff hast. Spirit wird dann zum inneren Vorstand, der permanent Leistung verlangt und niemals wirklich Feierabend macht.',
                'Dein Zukunftsblick kann zur emotionalen Distanz werden. Du erkennst Systeme, Muster und bessere Lösungen, aber überspringst vielleicht die langsame menschliche Arbeit dazwischen. Rebellion ist noch keine Richtung; Anderssein noch keine gelebte Alternative.',
                'Dein Wille kann im Nebel verschwinden. Du wartest auf Gewissheit, ein Zeichen oder den perfekten inneren Zustand und nennst das Intuition. Im Schatten übernimmst du fremde Visionen, rettest andere oder romantisierst Möglichkeiten, damit du dich nicht konkret festlegen musst.',
            ],
            transfers: [
                'Triff eine Entscheidung, die deine Identität sichtbar macht: ein Satz, eine Grenze oder ein Auftritt. Erkläre sie nicht länger als nötig und beobachte, wie dein Körper auf klare Selbstführung reagiert.',
                'Gib deiner Priorität ein reales Budget aus Zeit, Geld oder Aufmerksamkeit. Ein Wert, der keine Ressource erhält, ist noch keine Entscheidung.',
                'Formuliere deine Richtung in einem einzigen klaren Satz und teile ihn mit jemandem. Streiche jede Einschränkung, die nur dazu dient, eine Hintertür offen zu halten.',
                'Treffe eine Entscheidung für dein Zuhause, deine Familie oder deinen inneren Boden, die nicht nur Frieden bewahrt, sondern deine emotionale Autonomie stärkt.',
                'Erschaffe etwas und zeige es, bevor du weißt, wie es aufgenommen wird. Dein Wille braucht Spielraum, aber auch den Moment, in dem Kreativität eine sichtbare Signatur bekommt.',
                'Übersetze deine Absicht in eine kleine wiederholbare Handlung. Lege Zeitpunkt, Dauer und Mindestversion fest – und miss Erfolg zunächst nur daran, ob du wiederkommst.',
                'Vereinbare in einer Beziehung ausdrücklich, was ihr miteinander gestalten wollt. Gegenseitigkeit beginnt nicht bei Gedankenlesen, sondern bei zwei hörbaren Entscheidungen.',
                'Benenne eine Machtfrage, Verpflichtung oder gemeinsame Ressource, über die du bisher nur indirekt verhandelst. Entscheide, welcher Teil wirklich deiner Verantwortung gehört.',
                'Schreibe deine aktuelle Überzeugung als vorläufige These auf. Suche anschließend bewusst eine Perspektive, die sie erweitert oder korrigiert, und entscheide, was du tatsächlich daraus lebst.',
                'Übernimm eine sichtbare Rolle oder definiere deine bestehende neu. Formuliere, wofür du verantwortlich bist, woran Wirkung erkennbar wird und was ausdrücklich nicht mehr zu deinem Auftrag gehört.',
                'Bring deine Vision in eine Gruppe und baue einen ersten gemeinsamen Schritt. Zukunft wird erst zu Spirit, wenn andere daran teilnehmen können, ohne bloß deinem Konzept zu folgen.',
                'Gib deiner inneren Arbeit eine Form: feste Rückzugszeit, Meditation, Therapie, Schreiben oder kreative Praxis. Nicht um produktiver zu werden, sondern um deine eigene Stimme von fremdem Rauschen zu unterscheiden.',
            ],
        },
        eros: {
            name: 'Eros',
            symbol: '♡',
            subtitle: 'Was dich entzündet',
            question: 'Was macht dich magnetisch und lebendig?',
            opening: [
                'Eros ist dein tiefes Ja zum Leben. Nicht nur Sexualität, sondern der Moment, in dem Neugier, Lust und magnetische Lebenskraft durch dich hindurchgehen.',
                'Hier wird dein Verlangen ehrlich. Was dich wirklich anzieht, belebt dich – und was dich belebt, macht dich spürbar.',
                'Eros zeigt, wo du nicht nur funktionierst, sondern glühst. Wo dein Körper, dein Herz und deine kreative Kraft gleichzeitig wach werden.',
            ],
            signs: [
                'Dein Eros ist spontan, heiß und direkt. Spannung, Initiative und ein klares Ja lassen dich aufwachen. Zu viel Taktik kühlt dich ab – du willst Begegnung, die den Mut hat, wirklich zu beginnen.',
                'Dein Begehren ist sinnlich, körperlich und langsam. Duft, Berührung, Geschmack und Verlässlichkeit bauen die Spannung auf. Je weniger du hetzt, desto tiefer kann dein Feuer werden.',
                'Dein Eros geht über den Kopf. Worte, Humor, Nachrichten und geistige Beweglichkeit sind erotischer Treibstoff. Wenn das Gespräch aufhört zu leben, verliert häufig auch dein Begehren die Farbe.',
                'Dein Eros ist weich, beschützend und tief. Sicherheit öffnet eine Hingabe, die unter Härte unsichtbar bleibt. Du willst nicht nur berührt, sondern emotional erkannt werden.',
                'Dein Eros strahlt. Romantik, Spiel, Kreativität und ein Gegenüber, das dein Feuer feiert, machen dich lebendig. Du willst nicht bloß gemocht – du willst mit ganzem Herzen gesehen werden.',
                'Dein Begehren ist fein, aufmerksam und konkret. Kleine Gesten, gute Pflege und echte Präsenz können stärker wirken als jede große Show. Was du achtsam berührst, bekommt Bedeutung.',
                'Schönheit, Blickkontakt und Resonanz entzünden dich. Dein Eros liebt Eleganz und Begegnung auf Augenhöhe. Harmonie wird sexy, solange sie nicht jede wilde Wahrheit aus dem Raum dekoriert.',
                'Dein Eros ist intensiv, psychologisch und kompromisslos. Wahrheit, Tabu und vollständige Präsenz ziehen dich an. Lauwarm ermüdet dich – Tiefe kann dich verwandeln. Entscheidend ist, ob Intensität echte Intimität öffnet oder nur eine Bindung erzeugt, aus der niemand unverändert, aber auch niemand wirklich frei hervorgeht.',
                'Freiheit, Abenteuer, Humor und neue Horizonte halten dein Feuer wach. Dein Eros braucht Raum und eine Begegnung, in der Wachstum nicht als Gefahr behandelt wird.',
                'Dein Begehren ist konzentriert, reif und ausdauernd. Commitment, Kompetenz und klare Grenzen können tief erotisch wirken. Was langsam Vertrauen gewinnt, glüht bei dir häufig besonders lange.',
                'Dein Eros ist frei, eigen und elektrisch. Ungewöhnliche Menschen und Verbindungen ohne enge Schubladen ziehen dich an. Nähe funktioniert am besten, wenn beide trotzdem ganz sie selbst bleiben dürfen.',
                'Dein Eros ist mystisch, musikalisch und grenzenweich. Atmosphäre, Fantasie und seelische Resonanz öffnen dich. Die Kunst ist, Hingabe zu erleben, ohne dabei deine Konturen vollständig zu verlieren.',
            ],
            houses: [
                'Dein Körper ist die Bühne. Andere können dein Feuer spüren, bevor du etwas sagst. Präsenz, Bewegung und Blickkontakt bringen Eros unmittelbar ins Leben. Dein Begehren wird besonders klar, wenn du nicht versuchst, begehrenswert zu wirken, sondern deine eigene körperliche Antwort ernst nimmst.',
                'Lust entsteht über Sinne, Berührung, Stabilität und Genuss. Du begehrst, was greifbar ist und dir erlaubt, vollständig im Körper anzukommen. Zeit ist hier kein Hindernis, sondern ein erotischer Verstärker – sofern Langsamkeit nicht bloß eine elegante Form des Festhaltens wird.',
                'Worte entzünden dich. Gespräche bis spät in die Nacht, Humor, Nachrichten und neugierige Fragen sind direkte Zugänge zu deiner Lebendigkeit. Entscheidend ist, ob Sprache wirkliche Nähe aufbaut oder nur genug Spannung erzeugt, damit niemand emotional still werden muss.',
                'Eros braucht einen geschützten Raum. Zuhause, Vertrautheit und emotionale Sicherheit öffnen eine Seite, die nicht für jede Öffentlichkeit bestimmt ist. Gerade deshalb müssen Geborgenheit und Grenze nebeneinander bestehen: Nähe verliert ihre Erotik, wenn sie zur vollständigen Verschmelzung wird.',
                'Hier liebt Eros Spiel, Flirt, Kunst und Romantik. Kreativer Selbstausdruck ist Teil deiner magnetischen Signatur – Funkenflug ist ausdrücklich erlaubt. Dein Feuer wächst, wenn Freude nicht erst verdient werden muss und du riskierst, sichtbar begeistert statt nur souverän zu sein.',
                'Eros lebt in Fürsorge, Ritualen und kleinen Gesten. Gemeinsamer Alltag kann tief sinnlich werden, wenn Aufmerksamkeit nicht mit bloßem Funktionieren verwechselt wird. Lust braucht hier keine große Inszenierung, wohl aber einen Moment, in dem Optimierung, Dienst und Nützlichkeit wirklich enden dürfen.',
                'Du brauchst ein Gegenüber. Beziehung, Blickkontakt und echte Gegenseitigkeit stellen dein Feuer scharf. Dein Begehren wird größer, wenn jemand bewusst zurückschaut. Die erotische Aufgabe besteht darin, Resonanz zu genießen, ohne deine Wünsche so lange anzupassen, bis nur noch Harmonie übrig bleibt.',
                'Eros will Tiefe, Nacktheit und Wahrheit. Intimität, Macht und Tabu sind keine Nebenthemen. Oberflächliche Begegnung verliert schnell ihre Spannung. Besonders wichtig sind ausgesprochene Zustimmung und Grenzen, damit Intensität nicht heimlich zur Prüfung, Kontrolle oder emotionalen Schuld wird.',
                'Reisen, Lernen und geistige Abenteuer entzünden dich. Du willst ein Begehren, das deinen Horizont erweitert und nicht nur Bekanntes wiederholt. Die Verbindung bleibt lebendig, wenn Freiheit nicht Flucht bedeutet, sondern beide Menschen größer in ihr eigenes Leben zurückkehren lässt.',
                'Wirkung, Verantwortung und sichtbare Kompetenz sind Teil deines erotischen Resonanzraums. Wenn du in deiner Rolle stehst, wird dein Charisma besonders deutlich. Der wichtige Unterschied: Begehrst du den Menschen, die gemeinsame Wirkung – oder die Sicherheit und Anerkennung, die sein Status verspricht?',
                'Freundschaft, Freiheit, Szenen und gemeinsame Visionen beleben Eros. Du begehrst Menschen, mit denen du Zukunft denken und trotzdem eigenständig bleiben kannst. Nähe wird besonders spannend, wenn sie aus Wahl entsteht – nicht aus sozialer Anpassung, emotionaler Unverfügbarkeit oder der Angst vor gewöhnlicher Bindung.',
                'Dein Begehren ist feinstofflich und teilweise verborgen. Träume, Musik, Fantasie und Rückzug öffnen Türen zu einem Eros, der zuerst von der Seele wahrgenommen wird.',
            ],
            jokers: [
                'Was will mein Körper jetzt – bevor mein Kopf die Antwort sozial verträglich macht?',
                'Was wird lebendiger, wenn ich langsamer werde und wirklich empfange?',
                'Welches Gespräch bringt meine Augen wieder zum Leuchten?',
                'Wo brauche ich Sicherheit, um mich wirklich öffnen zu können?',
                'Wo darf ich größer, verspielter und sichtbarer werden?',
                'Welche kleine, achtsame Geste würde heute echte Lebendigkeit erzeugen?',
                'Welche Begegnung fühlt sich gleichzeitig schön, frei und gegenseitig an?',
                'Welche Wahrheit macht mir Angst – und zugleich mein ganzes System wach?',
                'Welches Abenteuer erinnert mich daran, dass ich lebendig bin?',
                'Welches klare Ja ist stark genug, um langsam tiefer zu werden?',
                'Wo braucht Nähe mehr Freiheit statt mehr Kontrolle?',
                'Welche Musik, Fantasie oder stille Sehnsucht will heute Raum bekommen?',
            ],
            shadows: [
                'Du kannst Begehren nur dann spüren, wenn etwas gejagt, erobert oder riskiert werden muss. Sobald Nähe verfügbar wird, sinkt die Spannung – oder du erzeugst Konflikt, damit wieder Hitze entsteht. Nicht jedes starke Kribbeln ist Kompatibilität; manchmal ist es nur Adrenalin mit gutem Marketing.',
                'Genuss kann in Festhalten kippen. Du bleibst bei Menschen, Gewohnheiten oder Fantasien, weil dein Körper das Vertraute mit Sicherheit verwechselt. Sinnlichkeit wird dann zur Sedierung und Exklusivität zur Besitzfrage. Echte Langsamkeit bleibt lebendig; Stillstand wird nur bequem.',
                'Du kannst dich in Worte, Flirt und Möglichkeiten verlieben, ohne je vollständig anzukommen. Die nächste Nachricht ist spannender als die emotionale Konsequenz der letzten. Der Schatten ist nicht Vielfalt, sondern eine Nervosität, die Tiefe sofort in Langeweile übersetzt.',
                'Dein Wunsch nach emotionaler Sicherheit kann Verschmelzung erzeugen. Du begehrst, was sich nach Zuhause anfühlt – auch wenn es eigentlich nur vertraute Verletzung ist. Fürsorge wird erotischer Vertrag, Rückzug zur Strafe und Nostalgie zum Filter über die Gegenwart.',
                'Du willst gesehen werden, doch im Schatten wird jede Begegnung zur Bühne. Drama, Unerreichbarkeit oder besonders große Gesten halten das Feuer hoch, während leise Gegenseitigkeit fast zu gewöhnlich erscheint. Applaus kann Begehren spiegeln, aber keine intime Wahrheit ersetzen.',
                'Deine Aufmerksamkeit für Details kann Berührung vertiefen – oder jeden Funken sezieren. Du optimierst dich, den anderen oder die Dynamik, bis Lust wie eine Aufgabe mit Qualitätskontrolle wirkt. Dienen wird zum Schatten, wenn du nur noch gebraucht, aber nicht mehr begehrt werden darfst.',
                'Du kannst Ästhetik und Harmonie über Wahrheit stellen. Dann sieht die Verbindung besser aus, als sie sich anfühlt, und Begehren bleibt höflich, damit niemand ablehnt oder unbequem wird. Der Schatten ist Verführung ohne Position: viel Resonanz, wenig echtes Risiko.',
                'Intensität kann zur Droge werden. Du prüfst, bindest, provozierst oder verschmilzt, um sicherzugehen, dass die Verbindung stark genug ist. Obsession fühlt sich dann wie Schicksal an. Wirkliche Intimität beginnt dort, wo Macht, Zustimmung und Angst ausgesprochen werden dürfen.',
                'Freiheit kann zur Flucht vor Bindung werden. Du begehrst das Ferne, Neue oder Unerreichbare und verlierst Interesse, sobald Alltag und Wiederholung beginnen. Nicht jede Grenze ist ein Käfig; manchmal ist sie genau die Form, in der ein Feuer länger als eine Reise brennen kann.',
                'Du kannst Begehren disziplinieren, bis nur noch kontrollierte Intensität übrig bleibt. Status, Kompetenz oder Unerreichbarkeit werden erotisch, weil sie Verletzlichkeit verzögern. Der Schatten ist eine perfekte Fassade, unter der Bedürfnisse erst dann erlaubt sind, wenn sie strategisch sinnvoll erscheinen.',
                'Du willst Freiheit, kannst aber emotionale Distanz als Unabhängigkeit verkaufen. Unerreichbare, ungewöhnliche oder komplizierte Menschen halten dein System elektrisch, ohne dich wirklich zu binden. Rebellion gegen Normen ist nicht automatisch intime Ehrlichkeit.',
                'Deine Fantasie kann einen Menschen in eine Projektionsfläche verwandeln. Du spürst Seelenverwandtschaft, Möglichkeit und Magie – und übersiehst Grenzen, Widersprüche oder fehlende Gegenseitigkeit. Hingabe wird gefährlich, wenn du dafür deine Wahrnehmung opfern musst.',
            ],
            transfers: [
                'Tu etwas, das dich unmittelbar in deinen Körper bringt: Bewegung, Kleidung, Blickkontakt oder eine klare Initiative. Frage danach nicht nur „War ich mutig?“, sondern „War mein Ja wirklich meines?“',
                'Plane ein langsames sinnliches Ritual ohne Bildschirm und ohne Leistung: Essen, Berührung, Musik oder Natur. Beobachte, wann Genuss auftaucht und wann du nur Gewohnheit wiederholst.',
                'Beginne das Gespräch, das dich geistig und körperlich wach macht. Stelle eine echte Frage, sage etwas Riskantes und bleib lang genug, um die Antwort nicht sofort mit einem neuen Thema zu überholen.',
                'Schaffe einen Raum, in dem Öffnung sicherer wird: Tür zu, Handy weg, klare Zeit, klare Grenze. Sag, was du brauchst, bevor du hoffst, dass jemand es errät.',
                'Mach ein Date mit deiner eigenen Lebendigkeit: tanzen, flirten, fotografieren, malen, auftreten. Wähle etwas, bei dem du sichtbar wirst, ohne den Wert des Moments vom Applaus abhängig zu machen.',
                'Bring Sinnlichkeit in eine alltägliche Handlung: Kochen, Duschen, Aufräumen, Pflege oder gemeinsame Routine. Nimm wahr, ob Aufmerksamkeit Lust erzeugt – oder ob du dich wieder nur nützlich machst.',
                'Führe ein klares Gespräch über Anziehung, Grenzen und Gegenseitigkeit. Sag sowohl, was du willst, als auch, was du nicht mehr schönreden möchtest.',
                'Benenne eine Fantasie, Angst oder Machtfrage, die unter der Intimität liegt. Prüfe Zustimmung, Konsequenzen und gemeinsame Verantwortung, bevor Intensität die Führung übernimmt.',
                'Wähle ein reales Abenteuer, das deinen Horizont erweitert, ohne dein bestehendes Leben abzuwerten. Freiheit wird reifer, wenn du auch zurückkommen und integrieren kannst.',
                'Erlaube einem langsamen Ja, tiefer zu werden. Zeige ein Bedürfnis, das sich nicht durch Kompetenz lösen lässt, und beobachte, ob die Verbindung auch deine Weichheit tragen kann.',
                'Verhandle Freiheit konkret: Zeit, Raum, Freundschaften, Sexualität, Erwartungen. Unabhängigkeit wird intim, wenn sie nicht als unangekündigter Rückzug daherkommt.',
                'Gib einer Fantasie eine kreative Form – Musik, Text, Bild, Tanz – bevor du sie auf einen Menschen projizierst. Prüfe anschließend, was davon Sehnsucht, Wahrheit und tatsächliche Gegenseitigkeit ist.',
            ],
        },
    };

    const CONJUNCTIONS = {
        Sonne: 'Die Sonne macht diesen Punkt sichtbar und zentral. Was hier geschieht, will nicht im Schatten bleiben – es möchte bewusst verkörpert werden.',
        Mond: 'Der Mond macht diesen Punkt körperlich, emotional und unmittelbar spürbar. Bedürfnisse, Rhythmen und Erinnerungen färben seine Wirkung stark.',
        Merkur: 'Merkur bringt Sprache, Neugier und geistige Beweglichkeit hinein. Gespräche, Schreiben und Verstehen werden zu Aktivatoren.',
        Venus: 'Venus verstärkt Anziehung, Genuss, Beziehung und ästhetisches Empfinden. Dieser Punkt öffnet sich über Resonanz statt über Druck.',
        Mars: 'Mars gibt Hitze, Mut und Handlungskraft. Die Energie will nicht nur verstanden, sondern getan werden – direkt und deutlich.',
        Jupiter: 'Jupiter vergrößert das Feld. Wachstum, Sinn, Vertrauen und manchmal auch Übertreibung machen diesen Punkt besonders weitreichend.',
        Saturn: 'Saturn verdichtet und vertieft. Reife, Verzögerung, Verantwortung und Meisterschaft machen aus einem schnellen Impuls eine langfristige Aufgabe.',
        Uranus: 'Uranus elektrisiert diesen Punkt. Freiheit, Überraschung und eine unkonventionelle Signatur lassen ihn anders arbeiten als erwartet.',
        Neptun: 'Neptun macht die Wirkung fein, intuitiv und durchlässig. Vision und Sehnsucht sind stark – klare Grenzen helfen, die Gabe nicht in Projektion zu verlieren.',
        Pluto: 'Pluto intensiviert radikal. Macht, Wahrheit, Obsession und tiefgreifende Wandlung können an diesem Punkt kaum oberflächlich gelebt werden.',
    };

    const ELEMENT_COPY = {
        Feuer: 'will Bewegung, Mut und gelebte Begeisterung',
        Erde: 'will Substanz, Verkörperung und etwas, das im Alltag trägt',
        Luft: 'will Sprache, Verbindung und einen freien geistigen Raum',
        Wasser: 'will Resonanz, Intuition und emotionale Wahrhaftigkeit',
    };

    const ELEMENT_BODY = {
        Feuer: 'Dein System reagiert häufig auf Stagnation: Bewegung, Ausdruck und eine spürbare Richtung bringen Energie zurück. Der Schatten ist Daueraktivierung – nicht jeder innere Funke verlangt sofort eine Handlung.',
        Erde: 'Dein Körper liebt Verlässlichkeit, Rhythmus und etwas Greifbares. Unter Druck kannst du jedoch so lange festhalten oder funktionieren, bis der Körper die Grenze deutlicher formuliert als dein Kopf.',
        Luft: 'Gedanken, Gespräche und neue Perspektiven können dich unmittelbar beleben. Wenn alles im Kopf bleibt, wird aus Beweglichkeit allerdings Zerstreuung – dann braucht Erkenntnis wieder Atem, Körper und eine konkrete Entscheidung.',
        Wasser: 'Du nimmst Atmosphären und emotionale Unterströmungen stark auf. Rückzug und Resonanz können regulieren; ohne klare Grenzen trägst du jedoch schnell Gefühle weiter, die nicht vollständig deine sind.',
    };

    const MODE_SHADOW = {
        kardinal: 'Du kannst versuchen, Unsicherheit durch Initiative zu kontrollieren: lieber noch etwas beginnen, entscheiden oder organisieren, als einen Moment lang nicht zu wissen. Führung wird dann zur Flucht vor Empfänglichkeit.',
        fix: 'Deine Stärke ist Bindung – und genau dort liegt der blinde Fleck. Du kannst an Menschen, Rollen oder Strategien festhalten, weil Loslassen sich wie Machtverlust anfühlt, obwohl das Leben längst eine neue Form verlangt.',
        veränderlich: 'Du erkennst Möglichkeiten und Zwischentöne, doch genau das kann klare Konsequenzen verdünnen. Anpassung wird zum Schatten, wenn du jede Perspektive verstehst, nur deine eigene Position nicht mehr verkörperst.',
    };

    const LOT_SHADOW = {
        fortune: 'Fortune ist kein Versprechen, dass alles leicht wird. Sein Schatten zeigt sich dort, wo du „Flow“ mit Passivität verwechselst, auf Rettung wartest oder deine Lebensumstände zu einer endgültigen Identität erklärst.',
        spirit: 'Spirit ist nicht automatisch Purpose und schon gar nicht moralische Überlegenheit. Sein Schatten ist ein Wille, der alles kontrollieren, optimieren oder erzwingen will – und dabei nicht mehr bemerkt, wofür er ursprünglich losgegangen ist.',
        eros: 'Eros ist nicht nur sexy. Begehren kann projizieren, idealisieren, konsumieren und süchtig nach Intensität werden. Nicht alles, was dich elektrisiert, nährt dich; manchmal zeigt die Anziehung genau die Stelle, an der du dich selbst verlassen würdest.',
    };

    const ACTIONS = {
        day: [
            'Tu heute eine kleine Sache, die deinem Fortune-Haus konkret mehr Raum gibt. Kein symbolischer Großakt – eine Handlung, die dein Körper und dein Alltag tatsächlich bemerken.',
            'Sprich innerhalb der nächsten sieben Tage ein klares Ja oder Nein aus, das zu deinem Spirit passt. Richtung entsteht, wenn eine Möglichkeit eine Konsequenz bekommt.',
            'Plane für die nächsten sechs Monate ein Vorhaben, in dem dein Eros nicht nur Belohnung am Rand ist, sondern eine echte Quelle von Energie und Gestaltung.',
        ],
    };

    const form = document.getElementById('fortune-form');
    if (!form) { return; }

    const placeInput = document.getElementById('fortune-place');
    const placeResults = document.getElementById('fortune-place-results');
    const placeConfirmation = document.getElementById('fortune-place-confirmation');
    const consentInput = document.getElementById('fortune-consent');
    const errorBox = document.getElementById('fortune-error');
    const loading = document.getElementById('fortune-loading');
    const results = document.getElementById('fortune-results');
    const resultsContent = document.getElementById('fortune-results-content');
    let selectedPlace = null;
    let searchTimer = null;
    let activeRequest = null;

    function normalize(value) {
        const result = value % 360;
        return result < 0 ? result + 360 : result;
    }

    function angularDistance(a, b) {
        const difference = Math.abs(normalize(a) - normalize(b));
        return Math.min(difference, 360 - difference);
    }

    function signIndex(longitude) { return Math.floor(normalize(longitude) / 30); }

    function wholeSignHouse(longitude, ascendant) {
        return ((signIndex(longitude) - signIndex(ascendant) + 12) % 12) + 1;
    }

    function degreeLabel(longitude) {
        const value = normalize(longitude);
        const sign = SIGNS[signIndex(value)];
        let degree = Math.floor(value % 30);
        let minutes = Math.round(((value % 30) - degree) * 60);
        if (minutes === 60) { degree += 1; minutes = 0; }
        if (degree === 30) { return `0° 00′ ${SIGNS[(signIndex(value) + 1) % 12].name}`; }
        return `${degree}° ${String(minutes).padStart(2, '0')}′ ${sign.name}`;
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;',
        }[character]));
    }

    function nameSeed(value) {
        return Array.from(value || 'stars').reduce((total, character) => total + character.charCodeAt(0), 0);
    }

    function greeting(name, variant) {
        if (!name) { return ['Oh, du wundervoller Mensch …', 'Yes – da bist du.', 'The sky remembers.'][variant % 3]; }
        const safe = escapeHtml(name.trim());
        return [`Oh ${safe} …`, `Yes ${safe}, this is you.`, `${safe}! Der Himmel erinnert sich.`][variant % 3];
    }

    function datePartsInZone(date, timeZone) {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone,
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
        });
        const parts = Object.fromEntries(formatter.formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
        return parts;
    }

    function wallTimeCandidates(dateValue, timeValue, timeZone) {
        const [year, month, day] = dateValue.split('-').map(Number);
        const [hour, minute] = timeValue.split(':').map(Number);
        const target = { year, month, day, hour, minute };
        const wallAsUtc = Date.UTC(year, month - 1, day, hour, minute);
        const matches = [];
        const seen = new Set();

        const testOffset = offsetMinutes => {
            const candidate = new Date(wallAsUtc - (offsetMinutes * 60000));
            const actual = datePartsInZone(candidate, timeZone);
            const matchesTarget = Object.keys(target).every(key => actual[key] === target[key]);
            if (matchesTarget && !seen.has(candidate.getTime())) {
                seen.add(candidate.getTime());
                matches.push(candidate);
            }
        };

        for (let offset = -14 * 60; offset <= 14 * 60; offset += 15) { testOffset(offset); }
        if (!matches.length) {
            for (let offset = -14 * 60; offset <= 14 * 60; offset += 1) { testOffset(offset); }
        }
        return matches.sort((a, b) => a - b);
    }

    function timeZoneLabel(date, timeZone) {
        const formatter = new Intl.DateTimeFormat('de-DE', { timeZone, timeZoneName: 'longOffset' });
        const part = formatter.formatToParts(date).find(item => item.type === 'timeZoneName');
        return part ? `${timeZone} · ${part.value}` : timeZone;
    }

    function planetLongitude(body, date) {
        if (body === Astro.Body.Sun) { return normalize(Astro.SunPosition(date).elon); }
        if (body === Astro.Body.Moon) { return normalize(Astro.EclipticGeoMoon(date).lon); }
        return normalize(Astro.Ecliptic(Astro.GeoVector(body, date, true)).elon);
    }

    function ascendantLongitude(date, observer) {
        const eclipticNorth = new Astro.Vector(0, 0, 1, date);
        const eclipticNorthEqd = Astro.RotateVector(Astro.Rotation_ECT_EQD(date), eclipticNorth);
        const eclipticNorthHor = Astro.RotateVector(Astro.Rotation_EQD_HOR(date, observer), eclipticNorthEqd);
        let horizonIntersection = new Astro.Vector(-eclipticNorthHor.y, eclipticNorthHor.x, 0, date);
        if (horizonIntersection.y > 0) {
            horizonIntersection = new Astro.Vector(-horizonIntersection.x, -horizonIntersection.y, 0, date);
        }
        const equatorOfDate = Astro.RotateVector(Astro.Rotation_HOR_EQD(date, observer), horizonIntersection);
        const eclipticOfDate = Astro.RotateVector(Astro.Rotation_EQD_ECT(date), equatorOfDate);
        return normalize(Astro.SphereFromVector(eclipticOfDate).lon);
    }

    function calculateChart(date, place) {
        const observer = new Astro.Observer(place.latitude, place.longitude, 0);
        const ascendant = ascendantLongitude(date, observer);
        const positions = {};
        Object.entries(PLANET_BODY).forEach(([name, body]) => { positions[name] = planetLongitude(body, date); });

        const sunEquator = Astro.Equator(Astro.Body.Sun, date, observer, true, true);
        const sunHorizon = Astro.Horizon(date, observer, sunEquator.ra, sunEquator.dec, '');
        const isDay = sunHorizon.altitude > 0;

        const fortune = normalize(isDay
            ? ascendant + positions.Mond - positions.Sonne
            : ascendant + positions.Sonne - positions.Mond);
        const spirit = normalize(isDay
            ? ascendant + positions.Sonne - positions.Mond
            : ascendant + positions.Mond - positions.Sonne);
        const eros = normalize(isDay
            ? ascendant + positions.Venus - spirit
            : ascendant + spirit - positions.Venus);

        const lots = { fortune, spirit, eros };
        const details = {};
        Object.entries(lots).forEach(([key, longitude]) => {
            const index = signIndex(longitude);
            const ruler = RULERS[index];
            details[key] = {
                longitude,
                signIndex: index,
                sign: SIGNS[index],
                house: wholeSignHouse(longitude, ascendant),
                ruler,
                rulerLongitude: positions[ruler],
                rulerSign: SIGNS[signIndex(positions[ruler])],
                rulerHouse: wholeSignHouse(positions[ruler], ascendant),
                conjunctions: Object.entries(positions)
                    .map(([planet, planetPosition]) => ({ planet, distance: angularDistance(longitude, planetPosition), longitude: planetPosition }))
                    .filter(item => item.distance <= Number(config.conjunctionOrb || 3))
                    .sort((a, b) => a.distance - b.distance),
            };
        });

        return { ascendant, positions, isDay, sunAltitude: sunHorizon.altitude, lots: details };
    }

    function locationLabel(place) {
        return [place.name, place.admin1, place.country].filter(Boolean).filter((value, index, array) => array.indexOf(value) === index).join(', ');
    }

    function renderPlaceResults(items) {
        placeResults.replaceChildren();
        if (!items.length) {
            const item = document.createElement('li');
            item.innerHTML = '<button type="button" disabled><strong>Kein Ort gefunden</strong><span>Versuche eine größere Stadt in der Nähe.</span></button>';
            placeResults.appendChild(item);
        } else {
            items.forEach((place, index) => {
                const item = document.createElement('li');
                const button = document.createElement('button');
                button.type = 'button';
                button.setAttribute('role', 'option');
                button.id = `fortune-place-${index}`;
                const title = document.createElement('strong');
                title.textContent = place.name;
                const detail = document.createElement('span');
                detail.textContent = [place.admin1, place.country, place.timezone].filter(Boolean).join(' · ');
                button.append(title, detail);
                button.addEventListener('click', () => {
                    selectedPlace = place;
                    placeInput.value = locationLabel(place);
                    placeInput.setAttribute('aria-expanded', 'false');
                    placeResults.hidden = true;
                    placeConfirmation.textContent = `Ausgewählt: ${locationLabel(place)} · ${place.timezone}`;
                    errorBox.textContent = '';
                });
                item.appendChild(button);
                placeResults.appendChild(item);
            });
        }
        placeResults.hidden = false;
        placeInput.setAttribute('aria-expanded', 'true');
    }

    async function searchPlaces(query) {
        if (activeRequest) { activeRequest.abort(); }
        activeRequest = new AbortController();
        const endpoint = new URL(config.geocodingUrl || 'https://geocoding-api.open-meteo.com/v1/search');
        endpoint.searchParams.set('name', query);
        endpoint.searchParams.set('count', '7');
        endpoint.searchParams.set('language', 'de');
        endpoint.searchParams.set('format', 'json');
        const response = await fetch(endpoint, { signal: activeRequest.signal, referrerPolicy: 'strict-origin-when-cross-origin' });
        if (!response.ok) { throw new Error('Der Geburtsort konnte gerade nicht gesucht werden.'); }
        const data = await response.json();
        return (data.results || []).filter(item => item.latitude !== undefined && item.longitude !== undefined && item.timezone);
    }

    placeInput.addEventListener('input', () => {
        selectedPlace = null;
        placeConfirmation.textContent = '';
        clearTimeout(searchTimer);
        const query = placeInput.value.trim();
        if (query.length < 2) {
            placeResults.hidden = true;
            placeInput.setAttribute('aria-expanded', 'false');
            return;
        }
        if (!consentInput.checked) {
            placeConfirmation.textContent = 'Bitte bestätige zuerst den Datenschutzhinweis, damit wir den Ort suchen dürfen.';
            return;
        }
        searchTimer = window.setTimeout(async () => {
            try {
                const items = await searchPlaces(query);
                renderPlaceResults(items);
            } catch (error) {
                if (error.name !== 'AbortError') { placeConfirmation.textContent = error.message; }
            }
        }, 420);
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.fortune-place-field')) {
            placeResults.hidden = true;
            placeInput.setAttribute('aria-expanded', 'false');
        }
    });

    function conjunctionMarkup(detail) {
        if (!detail.conjunctions.length) {
            return '<p>Kein Planet steht innerhalb des gewählten 3°-Orbis direkt an diesem Lot. Das macht den Punkt nicht schwach: Zeichen, Haus und Herrscher erzählen bereits seine vollständige Grundgeschichte.</p>';
        }
        const list = detail.conjunctions.map(item => `<li><strong>${escapeHtml(item.planet)} · ${item.distance.toFixed(1)}°</strong><br>${CONJUNCTIONS[item.planet]}</li>`).join('');
        return `<p>${detail.conjunctions.length === 1 ? 'Ein Planet sitzt wie ein VIP direkt an diesem Lot und verstärkt seine Signatur.' : 'Mehrere Planeten verdichten diesen Lot zu einem besonders starken Resonanzpunkt.'}</p><ul class="fortune-conjunction-list">${list}</ul>`;
    }

    function lifeFacetsMarkup(key, detail) {
        const lot = LOTS[key];
        const houseField = HOUSES[detail.house - 1].toLowerCase();
        const specificShadow = lot.shadows ? lot.shadows[detail.signIndex] : MODE_SHADOW[detail.sign.mode];
        const specificTransfer = lot.transfers ? lot.transfers[detail.house - 1] : `Wähle eine kleine Handlung im Feld ${houseField}, die deiner Erkenntnis eine sichtbare Form gibt.`;
        const relationshipCopy = key === 'fortune'
            ? `In Beziehungen zeigt Fortune, welche Begegnungen und Dynamiken dich tatsächlich tragen. Mit ${detail.sign.essence} und dem Fokus auf ${houseField} brauchst du Verbindung, die Substanz hat – nicht nur Chemie, Potenzial oder ein schönes Narrativ. Achte darauf, Unterstützung nicht mit Abhängigkeit und Loyalität nicht mit Selbstverlassen zu verwechseln.`
            : key === 'spirit'
                ? `In Beziehungen will Spirit nicht nur fühlen, sondern wählen. ${detail.sign.essence} beschreibt, wie du Bindung bewusst mitgestaltest; das ${detail.house}. Haus zeigt, wo deine Entscheidungen Konsequenzen bekommen. Sexy wird es dort, wo du weder dominierst noch dich unsichtbar machst, sondern ein klares Begehren und ein klares Nein aushältst.`
                : `Eros beschreibt, was dein Begehren aufweckt – aber nicht automatisch, was langfristig gut für dich ist. ${detail.sign.essence} färbt deine Anziehung, während das ${detail.house}. Haus die Bühne dafür zeigt. Die ehrlichste Frage lautet nicht nur „Will ich das?“, sondern auch: „Wer werde ich, wenn ich diesem Begehren folge?“`;
        const workCopy = key === 'fortune'
            ? `Im Beruf und im Umgang mit Geld entsteht Flow nicht durch blindes Glück, sondern wenn deine Umgebung zu deiner natürlichen Arbeitsweise passt. ${detail.ruler} als Herrscher verlangt ${PLANET_STRATEGY[detail.ruler]}. Wenn du dauerhaft gegen diese Logik arbeitest, kann selbst äußerer Erfolg teuer werden; wenn du sie respektierst, werden Timing, Menschen und Ressourcen spürbar kooperativer.`
            : key === 'spirit'
                ? `Spirit zeigt die Art von Wirkung, für die du bewusst Verantwortung übernehmen kannst. Über ${detail.ruler} führt der Weg durch ${PLANET_STRATEGY[detail.ruler]}. Das ist nicht zwingend ein Jobtitel: Es ist die Qualität von Entscheidung, die du in Arbeit, Führung, Geld und Sichtbarkeit immer wieder trainierst.`
                : `Eros ist im Arbeitsleben deine magnetische Energie: die Themen, Menschen und Ideen, bei denen du mehr Präsenz hast als Pflichtgefühl. Über ${detail.ruler} will diese Energie durch ${PLANET_STRATEGY[detail.ruler]} Form bekommen. Der Test: Macht dich das Vorhaben auf Dauer lebendiger – oder brauchst du ständig den nächsten Kick, um dich überhaupt noch zu spüren?`;
        return `
            <section class="fortune-facets">
                <p class="fortune-layer-label">Where it lands · real life</p>
                <h3>Not just a placement. A pattern.</h3>
                <div class="fortune-facet-grid">
                    <article><span>♡</span><h4>Love & relationships</h4><p>${relationshipCopy}</p></article>
                    <article><span>↗</span><h4>Work, money & impact</h4><p>${workCopy}</p></article>
                    <article><span>◌</span><h4>Body & daily life</h4><p>${ELEMENT_BODY[detail.sign.element]} Das ist eine astrologische Reflexion, keine medizinische Aussage.</p></article>
                </div>
            </section>
            <aside class="fortune-shadow-truth">
                <p class="fortune-layer-label">The honest part · no sugarcoating</p>
                <h3>Where this can get messy.</h3>
                <p>${LOT_SHADOW[key]}</p><p>${specificShadow}</p><p>${MODE_SHADOW[detail.sign.mode]}</p>
            </aside>
            <section class="fortune-transfer">
                <p class="fortune-layer-label">Transfer · take it into your life</p>
                <h3>Don’t just understand it. Catch it in the wild.</h3>
                <ol>
                    <li><span>01 · Notice</span><p>Beobachte sieben Tage lang Situationen rund um <strong>${houseField}</strong>. Wann wird deine Energie weiter – und wann beginnst du, dich zusammenzuziehen oder zu beweisen?</p></li>
                    <li><span>02 · Interrupt</span><p>Erkenne den Moment, in dem deine Stärke in ihr Schattenmuster kippt. Unterbrich nicht dich selbst – unterbrich die automatische Strategie.</p></li>
                    <li><span>03 · Practice</span><p>${specificTransfer}</p></li>
                    <li><span>04 · Choose</span><p>${lot.jokers[detail.signIndex]} Schreib die Antwort nicht astrologisch schön. Schreib sie so, dass daraus eine echte Entscheidung werden kann.</p></li>
                </ol>
            </section>`;
    }

    function lotSection(key, detail, name, seed) {
        const lot = LOTS[key];
        const opening = lot.opening[(seed + detail.signIndex + detail.house) % lot.opening.length];
        const rulerPosition = `${degreeLabel(detail.rulerLongitude)} im ${detail.rulerHouse}. Haus`;
        const pullQuote = key === 'fortune'
            ? `Du musst hier nicht härter arbeiten. Du darfst lernen, zu erkennen, was dich bereits trägt.`
            : key === 'spirit'
                ? `Dein Wille wird stark, sobald aus einem inneren Vielleicht ein bewusstes Ja wird.`
                : `Was dich wirklich lebendig macht, ist keine Ablenkung. Es ist Information.`;
        return `
            <article class="fortune-reading-section" id="reading-${key}">
                <aside class="fortune-reading-aside">
                    <p class="fortune-kicker">${lot.name} · ${degreeLabel(detail.longitude)}</p>
                    <h2>Your<br><em>${key === 'fortune' ? 'Flow.' : key === 'spirit' ? 'Will.' : 'Fire.'}</em></h2>
                    <p>${lot.question}</p>
                </aside>
                <div class="fortune-reading-body">
                    <p class="fortune-reading-lead">${greeting(name, seed + detail.house)} ${opening}</p>
                    <section class="fortune-layer">
                        <p class="fortune-layer-label">The sign · How</p>
                        <h3>${detail.sign.symbol} ${lot.name} in ${detail.sign.name}</h3>
                        <p>${lot.signs[detail.signIndex]}</p>
                    </section>
                    <blockquote class="fortune-pullquote"><span aria-hidden="true"></span>${pullQuote}</blockquote>
                    <section class="fortune-layer">
                        <p class="fortune-layer-label">The house · Where</p>
                        <h3>${detail.house}. Haus · ${HOUSES[detail.house - 1]}</h3>
                        <p>${lot.houses[detail.house - 1]}</p>
                    </section>
                    <section class="fortune-layer">
                        <p class="fortune-layer-label">The ruler · Through what</p>
                        <h3>${detail.ruler} holds the key</h3>
                        <p>Das Zeichen ${detail.sign.name} wird traditionell von ${detail.ruler} regiert. Dein Zugang öffnet sich deshalb über ${PLANET_STRATEGY[detail.ruler]}. In deinem Horoskop steht ${detail.ruler} auf ${rulerPosition}. Das verlagert den Schlüssel zusätzlich in die Welt von <strong>${detail.rulerSign.essence}</strong> und in den Lebensbereich <strong>${HOUSES[detail.rulerHouse - 1]}</strong>.</p><p class="fortune-ruler-shadow"><strong>Watch this:</strong> ${PLANET_SHADOW[detail.ruler]}</p>
                    </section>
                    <section class="fortune-layer">
                        <p class="fortune-layer-label">Planets at the Lot · 3° orb</p>
                        <h3>Who is sitting with ${lot.name}?</h3>
                        ${conjunctionMarkup(detail)}
                    </section>
                    ${lifeFacetsMarkup(key, detail)}
                    <div class="fortune-polarity" aria-label="Potenzial und Schattenseite">
                        <section><p class="fortune-layer-label">When it flows</p><h3>In your power</h3><p>${detail.sign.essence} wird zu einer Ressource, die du nicht beweisen musst – du verkörperst sie.</p></section>
                        <section><p class="fortune-layer-label">Watch the shadow</p><h3>The plot twist</h3><p>Dieselbe Kraft kippt, wenn sie zur Pflicht, zur Kontrolle oder zur einzigen erlaubten Strategie wird.</p></section>
                    </div>
                    <aside class="fortune-joker">
                        <p class="fortune-layer-label">Your ${lot.name} Joker</p>
                        <blockquote>${lot.jokers[detail.signIndex]}</blockquote>
                    </aside>
                </div>
            </article>`;
    }

    function lotAspectCopy(chart) {
        const pairs = [['fortune', 'spirit'], ['spirit', 'eros'], ['fortune', 'eros']];
        const aspectNames = { 0: 'Konjunktion', 60: 'Sextil', 90: 'Quadrat', 120: 'Trigon', 180: 'Opposition' };
        const pairLabels = { fortune: 'Fortune', spirit: 'Spirit', eros: 'Eros' };
        const found = [];

        pairs.forEach(([first, second]) => {
            const distance = angularDistance(chart.lots[first].longitude, chart.lots[second].longitude);
            const target = [0, 60, 90, 120, 180]
                .map(angle => ({ angle, orb: Math.abs(distance - angle) }))
                .sort((a, b) => a.orb - b.orb)[0];
            if (target.orb <= 4) {
                const dynamic = target.angle === 0
                    ? 'Die beiden Kräfte sind eng miteinander verschmolzen: Was die eine aktiviert, zieht die andere unmittelbar mit.'
                    : target.angle === 60
                        ? 'Zwischen ihnen liegt ein nutzbares Talent. Es öffnet sich jedoch erst, wenn du selbst eine Verbindung herstellst.'
                        : target.angle === 90
                            ? 'Hier sitzt produktive Reibung. Die beiden Bedürfnisse lassen sich nicht dauerhaft gegeneinander ausspielen; sie verlangen eine neue, erwachsenere Strategie.'
                            : target.angle === 120
                                ? 'Die Energien verstehen einander fast mühelos. Genau deshalb lohnt es sich zu prüfen, ob du diese Gabe bewusst nutzt oder für selbstverständlich hältst.'
                                : 'Die Kräfte stehen sich gegenüber und machen ein Entweder-oder besonders verführerisch. Integration beginnt, wenn beide Seiten gleichzeitig eine Stimme bekommen.';
                found.push(`${pairLabels[first]} und ${pairLabels[second]} bilden eine ${aspectNames[target.angle]} mit ${target.orb.toFixed(1)}° Orbis. ${dynamic}`);
            }
        });

        if (!found.length) {
            found.push('Zwischen den drei Lots liegt keine enge klassische Hauptverbindung innerhalb von 4°. Sie funktionieren deshalb nicht automatisch als ein Paket: Die Verbindung entsteht stärker über ihre Zeichen, Häuser und Herrscher – also durch gelebte Integration statt durch unmittelbaren astrologischen Gleichklang.');
        }

        const rulerGroups = {};
        Object.entries(chart.lots).forEach(([key, detail]) => {
            rulerGroups[detail.ruler] = [...(rulerGroups[detail.ruler] || []), pairLabels[key]];
        });
        Object.entries(rulerGroups).forEach(([ruler, lots]) => {
            if (lots.length > 1) {
                found.push(`${lots.join(' und ')} teilen mit ${ruler} denselben Gatekeeper. Dadurch läuft mehr als eine deiner Kernkräfte über ${PLANET_STRATEGY[ruler]}. Der gemeinsame Schatten: ${PLANET_SHADOW[ruler]}`);
            }
        });
        return found.join(' ');
    }

    function integrationCopy(chart, name) {
        const fortune = chart.lots.fortune;
        const spirit = chart.lots.spirit;
        const eros = chart.lots.eros;
        const personal = name ? escapeHtml(name.trim()) : 'Du';
        const aligned = fortune.sign.element === spirit.sign.element;
        const erosSupportsSpirit = eros.sign.element === spirit.sign.element || eros.sign.mode === spirit.sign.mode;
        const sameHouse = fortune.house === spirit.house;

        const paragraphOne = sameHouse
            ? `Fortune und Spirit treffen sich in deinem ${fortune.house}. Haus. Was dich trägt und was du bewusst gestalten willst, spielen damit auf derselben Lebensbühne. Wenn du in diesem Feld Verantwortung übernimmst, muss Flow nicht gegen deinen Willen arbeiten.`
            : aligned
                ? `Fortune und Spirit sprechen beide die Sprache ${fortune.sign.element}. Dein natürlicher Flow ${ELEMENT_COPY[fortune.sign.element]}, und genau darüber findet auch dein Wille Richtung. Die beiden Kräfte verstehen einander – solange du ihre gemeinsame Energie nicht übertreibst.`
                : `Fortune in ${fortune.sign.name} und Spirit in ${spirit.sign.name} verlangen zwei verschiedene Intelligenzen. Was dich trägt, ${ELEMENT_COPY[fortune.sign.element]}; was du bewusst erschaffst, ${ELEMENT_COPY[spirit.sign.element]}. Dein Sweet Spot entsteht nicht durch die Wahl einer Seite, sondern durch eine Reihenfolge: erst Boden und Resonanz, dann bewusste Richtung.`;

        const paragraphTwo = erosSupportsSpirit
            ? `Eros unterstützt deinen Spirit unmittelbar: Begehren und Wille teilen eine verwandte Energie. Wenn dich etwas wirklich lebendig macht, steigt auch deine Entscheidungskraft. Deine Aufgabe ist weniger, Motivation herzustellen, als dein echtes Feuer von kurzfristiger Ablenkung zu unterscheiden.`
            : `Eros bringt mit ${eros.sign.element} eine zusätzliche Kraft in die Matrix. Dein Verlangen will ${ELEMENT_COPY[eros.sign.element]}, während Spirit über ${spirit.sign.element} führt. Genau diese Reibung kann fruchtbar sein: Eros zeigt, wofür es sich lohnt, die gewohnte Strategie deines Willens zu erweitern.`;

        const statement = `${personal}, du bist hier, um über ${fortune.sign.essence} zu empfangen, durch ${spirit.sign.essence} bewusst zu gestalten und mit ${eros.sign.essence} ganz ins Leben zu kommen.`;
        const paragraphThree = lotAspectCopy(chart);
        return { paragraphOne, paragraphTwo, paragraphThree, statement };
    }

    function renderResults(chart, birthDate, place, name, ambiguityCount) {
        const modeLabel = chart.isDay ? 'Taghoroskop' : 'Nachthoroskop';
        const seed = nameSeed(name);
        const integration = integrationCopy(chart, name);
        const cards = Object.entries(chart.lots).map(([key, detail]) => {
            const lot = LOTS[key];
            return `<article class="fortune-lot-card"><span class="fortune-lot-symbol" aria-hidden="true">${lot.symbol}</span><p class="fortune-kicker">${lot.name} · ${lot.subtitle}</p><h3>${detail.sign.symbol} ${degreeLabel(detail.longitude)}<br>${detail.house}. Haus</h3><p>Herrscher: ${detail.ruler} · ${degreeLabel(detail.rulerLongitude)}</p><a href="#reading-${key}">Read ${lot.name} <span aria-hidden="true">↘</span></a></article>`;
        }).join('');
        const readings = Object.entries(chart.lots).map(([key, detail], index) => lotSection(key, detail, name, seed + index)).join('');
        const actions = ACTIONS.day.map((action, index) => `<article class="fortune-action"><span>0${index + 1} · ${['Today', 'This week', 'This season'][index]}</span><p>${action}</p></article>`).join('');

        const ambiguityNote = ambiguityCount > 1 ? '<span>Die lokale Uhrzeit kam durch eine Zeitumstellung zweimal vor; verwendet wurde die frühere Instanz.</span>' : '';

        resultsContent.innerHTML = `
            <section class="fortune-reveal">
                <span class="fortune-result-planet" aria-hidden="true"></span>
                <p class="fortune-kicker">The sky at the moment you arrived</p>
                <p class="fortune-reveal-greeting">${name ? `Oh ${escapeHtml(name.trim())} …` : 'Your cosmic shortcut …'}</p>
                <h2>Your three Lots<br><em>are here.</em></h2>
                <p class="fortune-reveal-intro">Drei Punkte. Drei sehr unterschiedliche Kräfte. Und zusammen eine erstaunlich klare Antwort darauf, was dich trägt, was du erschaffst und was dich wirklich lebendig macht.</p>
                <div class="fortune-meta"><span>${locationLabel(place)}</span><span>${timeZoneLabel(birthDate, place.timezone)}</span><span>${modeLabel}</span><span>Aszendent ${degreeLabel(chart.ascendant)}</span><span>Whole-Sign-Häuser</span>${ambiguityNote}</div>
                <div class="fortune-lot-grid">${cards}</div>
            </section>
            <div class="fortune-reading">${readings}</div>
            <section class="fortune-integration">
                <p class="fortune-kicker">The synthesis · this is where it gets interesting</p>
                <h2>Now for<br><em>the Juice.</em></h2>
                <div class="fortune-integration-grid">
                    <p class="fortune-integration-statement">${integration.statement}</p>
                    <div class="fortune-integration-copy"><p>${integration.paragraphOne}</p><p>${integration.paragraphTwo}</p><p>${integration.paragraphThree}</p></div>
                </div>
                <section class="fortune-joker-guide" aria-labelledby="fortune-joker-title">
                    <header><p class="fortune-kicker">Save this for later</p><h3 id="fortune-joker-title">Your three-Lot Joker.</h3><p>Wenn alles zu viel wird, brauchst du nicht dein gesamtes Horoskop. Stell dir einfach diese drei Fragen.</p></header>
                    <div class="fortune-joker-cards">
                        <article><span>⊗</span><p>Fortune</p><h4>Was trägt mich – ohne dass ich es erzwingen muss?</h4></article>
                        <article><span>✦</span><p>Spirit</p><h4>Was will ich bewusst wählen und erschaffen?</h4></article>
                        <article><span>♡</span><p>Eros</p><h4>Was macht mich gerade wirklich lebendig?</h4></article>
                    </div>
                </section>
                <section class="fortune-next-moves"><p class="fortune-kicker">Bring it down to earth</p><h3>Three moves. No cosmic homework.</h3><div class="fortune-actions">${actions}</div></section>
                <button class="fortune-again" id="fortune-again" type="button">Calculate another chart <span aria-hidden="true">↗</span></button>
            </section>`;

        document.getElementById('fortune-again').addEventListener('click', () => {
            results.hidden = true;
            document.getElementById('reveal-your-lots').scrollIntoView({ behavior: 'smooth' });
        });
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        errorBox.textContent = '';

        const name = document.getElementById('fortune-name').value.trim();
        const dateValue = document.getElementById('fortune-date').value;
        const timeValue = document.getElementById('fortune-time').value;

        if (!dateValue || !timeValue || !consentInput.checked || !selectedPlace) {
            if (!selectedPlace) { errorBox.textContent = 'Bitte wähle deinen Geburtsort aus der Vorschlagsliste aus.'; }
            else { errorBox.textContent = 'Bitte vervollständige alle Pflichtfelder und bestätige den Datenschutzhinweis.'; }
            return;
        }

        const candidates = wallTimeCandidates(dateValue, timeValue, selectedPlace.timezone);
        if (!candidates.length) {
            errorBox.textContent = 'Diese lokale Uhrzeit existierte am gewählten Ort wegen einer Zeitumstellung nicht. Bitte prüfe deine Geburtszeit.';
            return;
        }

        const submit = form.querySelector('.fortune-submit');
        submit.disabled = true;
        loading.hidden = false;
        results.hidden = true;
        loading.scrollIntoView({ behavior: 'smooth', block: 'center' });

        try {
            await new Promise(resolve => window.setTimeout(resolve, 650));
            const birthDate = candidates[0];
            const chart = calculateChart(birthDate, selectedPlace);
            renderResults(chart, birthDate, selectedPlace, name, candidates.length);
            loading.hidden = true;
            results.hidden = false;
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            loading.hidden = true;
            errorBox.textContent = 'Die Berechnung konnte nicht abgeschlossen werden. Bitte prüfe deine Angaben und versuche es erneut.';
            console.error(error);
            document.getElementById('reveal-your-lots').scrollIntoView({ behavior: 'smooth' });
        } finally {
            submit.disabled = false;
        }
    });
})();
