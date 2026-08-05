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
        { name: 'Skorpion', symbol: '♏', element: 'Wasser', mode: 'fix', essence: 'ehrliche Nähe und der Mut zu Veränderung' },
        { name: 'Schütze', symbol: '♐', element: 'Feuer', mode: 'veränderlich', essence: 'Weite und Sinn' },
        { name: 'Steinbock', symbol: '♑', element: 'Erde', mode: 'kardinal', essence: 'Verantwortung und Meisterschaft' },
        { name: 'Wassermann', symbol: '♒', element: 'Luft', mode: 'fix', essence: 'Freiheit und Zukunft' },
        { name: 'Fische', symbol: '♓', element: 'Wasser', mode: 'veränderlich', essence: 'Intuition, Mitgefühl und bewusstes Loslassen' },
    ];

    const HOUSES = [
        'Identität, Körper und unmittelbare Präsenz',
        'Werte, Ressourcen, Geld und Selbstwert',
        'Stimme, Lernen, Denken und nahes Umfeld',
        'Zuhause, Herkunft, Familie und emotionale Sicherheit',
        'Kreativität, Freude, Romantik und Selbstausdruck',
        'Alltag, Arbeit, Routinen, Fürsorge und Gesundheit',
        'Beziehungen, Partnerschaft und das Gegenüber',
        'Intimität, gemeinsames Geld, geteilte Verantwortung und Krisen',
        'Sinn, Weltanschauung, Reisen und geistige Weite',
        'Berufung, Verantwortung, Öffentlichkeit und Wirkung',
        'Freundschaft, Community, Visionen und Zukunft',
        'Rückzug, Träume, Spiritualität und das Unsichtbare',
    ];

    const RULERS = ['Mars', 'Venus', 'Merkur', 'Mond', 'Sonne', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    const RULER_BY = {
        Sonne: 'von der Sonne', Mond: 'vom Mond', Merkur: 'von Merkur', Venus: 'von Venus',
        Mars: 'von Mars', Jupiter: 'von Jupiter', Saturn: 'von Saturn',
    };
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
        Sonne: 'dich zu zeigen, eigene Ideen auszudrücken und Entscheidungen selbstbewusst zu vertreten',
        Mond: 'deine Gefühle ernst zu nehmen, auf deinen Körper zu achten und dir echte Sicherheit zu schaffen',
        Merkur: 'offen zu sprechen, Fragen zu stellen, Informationen zu sammeln und dich mit anderen auszutauschen',
        Venus: 'Beziehungen zu pflegen, zu genießen und klar zu erkennen, was dir wirklich wichtig ist',
        Mars: 'zu handeln, Grenzen zu setzen und einen ersten konkreten Schritt zu machen',
        Jupiter: 'größer zu denken, Neues zu lernen und Möglichkeiten zu nutzen, die dich wachsen lassen',
        Saturn: 'Verantwortung zu übernehmen, klare Strukturen zu schaffen und geduldig dranzubleiben',
        Uranus: 'eigene Wege zu gehen und Regeln zu verändern, die nicht mehr zu dir passen',
        Neptun: 'auf deine Intuition zu hören, ohne überprüfbare Fakten und klare Grenzen auszublenden',
        Pluto: 'schwierige Wahrheiten anzusprechen und Macht, Kontrolle oder Abhängigkeit offen zu klären',
    };

    const PLANET_SHADOW = {
        Sonne: 'Achte darauf, ob du etwas nur noch für Anerkennung tust. Dann zählt das Bild nach außen mehr als das, was wirklich zu dir passt.',
        Mond: 'Achte darauf, ob ein starkes Gefühl für dich sofort zur unumstößlichen Wahrheit wird. Du darfst fühlen und trotzdem prüfen, was tatsächlich passiert ist.',
        Merkur: 'Achte darauf, ob du immer weiter analysierst, obwohl eine Entscheidung längst fällig ist. Denken hilft nur, wenn daraus irgendwann ein klarer Schritt entsteht.',
        Venus: 'Achte darauf, ob du dich anpasst, damit alles harmonisch bleibt. Eine schöne Verbindung ist nicht automatisch eine gute Verbindung.',
        Mars: 'Achte darauf, ob du aus Druck oder Ärger handelst. Eine klare Handlung braucht ein Ziel und nicht nur Spannung.',
        Jupiter: 'Achte darauf, ob du zu viel versprichst oder wichtige Grenzen übersiehst. Wachstum ist nur hilfreich, wenn es auch praktisch tragbar ist.',
        Saturn: 'Achte darauf, ob du zu viel Verantwortung übernimmst und alles kontrollieren willst. Verlässlichkeit bedeutet nicht, dass du alles allein tragen musst.',
        Uranus: 'Achte darauf, ob du eine Verbindung oder Verpflichtung nur deshalb abbrichst, weil sie sich eng anfühlt. Freiheit braucht klare Absprachen, nicht nur Abstand.',
        Neptun: 'Achte darauf, Wunschdenken nicht mit Intuition zu verwechseln. Prüfe, was du weißt, was du hoffst und welche Grenze du brauchst.',
        Pluto: 'Achte darauf, ob du kontrollierst, testest oder Informationen zurückhältst, um dich sicher zu fühlen. Sprich Macht und Abhängigkeit direkt an.',
    };

    const LOTS = {
        fortune: {
            name: 'Fortune',
            symbol: '⊗',
            subtitle: 'Was dich trägt',
            question: 'Wo kommt dir das Leben entgegen?',
            opening: [
                'Fortune zeigt, welche Bedingungen dir Kraft, Sicherheit und Unterstützung geben.',
                'Hier geht es nicht darum, dich noch mehr anzustrengen. Es geht darum, besser zu erkennen, was für dich bereits funktioniert.',
                'Dieser Punkt beschreibt ganz konkret, was dich im Alltag stabilisiert und dir Chancen eröffnet.',
            ],
            signs: [
                'Du kommst voran, wenn du selbst den ersten Schritt machst. Warte nicht zu lange auf Erlaubnis oder den perfekten Moment. Eine kleine mutige Handlung bringt dir meist mehr als langes Abwägen.',
                'Du wirst durch Beständigkeit getragen. Nimm dir Zeit, prüfe dein Körpergefühl und baue Dinge Schritt für Schritt auf. Was ruhig und verlässlich wächst, passt meistens besser zu dir als ein schneller Erfolg.',
                'Gespräche, Informationen und neue Kontakte bringen dir Chancen. Frage nach, teile deine Gedanken und bleibe offen für mehrere Möglichkeiten. Wichtig ist nur, dass aus dem Austausch irgendwann eine Entscheidung entsteht.',
                'Du brauchst emotionale Sicherheit, um dich zu entfalten. Menschen und Orte tun dir gut, wenn du dort nicht ständig stark sein oder funktionieren musst. Achte darauf, Bedürfnisse klar auszusprechen, statt zu hoffen, dass andere sie erraten.',
                'Du profitierst davon, sichtbar zu sein und deine Ideen zu zeigen. Kreativität, Freude und Selbstvertrauen öffnen dir Türen. Du musst dafür keine Show spielen – aber du solltest dich auch nicht kleiner machen, als du bist.',
                'Gute Routinen, sorgfältige Arbeit und praktische Lösungen geben dir Halt. Du erkennst schnell, was verbessert werden kann. Achte darauf, dich selbst dabei nicht ständig wie ein Problem zu behandeln.',
                'Gute Beziehungen bringen dir Unterstützung und neue Möglichkeiten. Das funktioniert am besten, wenn beide Seiten offen sprechen und fair miteinander umgehen. Passe dich nicht so stark an, dass deine eigenen Wünsche verschwinden.',
                'Du kannst auch aus schwierigen Phasen etwas Wertvolles aufbauen. Besonders wichtig sind offene Gespräche über Vertrauen, Geld, Verpflichtungen, Sexualität und Abhängigkeiten. Je klarer diese Themen geregelt sind, desto sicherer können gemeinsame Entscheidungen werden.',
                'Lernen, Reisen und neue Sichtweisen eröffnen dir Chancen. Du musst nicht alles kontrollieren, bevor du losgehst. Prüfe aber, ob du wirklich wachsen möchtest oder nur vor einem aktuellen Problem ausweichst.',
                'Du erreichst viel durch Geduld, klare Ziele und verlässliche Arbeit. Ergebnisse kommen bei dir möglicherweise später, halten dafür oft länger. Übernimm Verantwortung, aber nicht automatisch jede Aufgabe.',
                'Ungewöhnliche Menschen, Gruppen und neue Ideen können dir wichtige Türen öffnen. Du musst nicht in jede Norm passen. Entscheidend ist, dass deine besondere Sichtweise auch praktisch nutzbar wird.',
                'Ruhe, Intuition und kreative oder spirituelle Erfahrungen können dir Orientierung geben. Lass Raum für das, was du nicht planen kannst. Prüfe trotzdem Fakten und Grenzen, bevor du eine wichtige Entscheidung triffst.',
            ],
            houses: [
                'Das Leben kommt dir entgegen, wenn du dich selbst bewohnst. Körper, Auftreten und Eigenständigkeit sind keine Nebensache – sie sind dein unmittelbarer Glückskanal. Je weniger du dich für den Raum entschuldigst, den du einnimmst, desto deutlicher kann das Leben überhaupt auf dich reagieren.',
                'Geld, Besitz, klare Werte und ein gutes Körpergefühl geben dir Sicherheit. Was du langfristig aufbaust und sorgfältig behandelst, kann dich auch in schwierigen Zeiten stabilisieren.',
                'Gespräche, Lernen, Schreiben, Nachbarschaft und kurze Wege sind voller Türen. Deine Neugier bringt dich oft genauer ans Ziel als ein vollständig ausgearbeiteter Masterplan. Wichtig ist, dass Information irgendwann Kontakt erzeugt: eine Nachricht, eine Frage oder ein Satz kann hier mehr bewegen als monatelanges inneres Vorbereiten.',
                'Zuhause, Herkunft und emotionaler Boden tragen dein Fortune. Je sicherer dein inneres Fundament, desto weniger musst du Glück im Außen jagen. Das bedeutet nicht, in alten Familienmustern zu bleiben, sondern bewusst einen Ort und eine innere Zugehörigkeit zu schaffen, die dich heute wirklich halten.',
                'Spiel, Freude, Dating, Kinder und kreative Projekte tun dir besonders gut. Du bekommst neue Energie und Chancen, wenn du etwas aus echter Freude tust – nicht nur, weil es nützlich ist.',
                'Dein Alltag ist besonders wichtig für dein Wohlbefinden. Gute Routinen, sinnvolle Arbeit, ausreichend Erholung und körperliche Fürsorge geben dir Kraft und eröffnen neue Möglichkeiten.',
                'Partnerschaften und faire Begegnungen können dir Chancen und Unterstützung bringen. Eine gute Verbindung erweitert deine Möglichkeiten, ohne dass du deine eigenen Wünsche oder deine Selbstständigkeit aufgeben musst.',
                'Unterstützung kann durch enge Beziehungen und gemeinsam verwaltete Dinge entstehen – zum Beispiel Geld, Eigentum, Verantwortung oder Fürsorge. Das funktioniert nur, wenn ihr offen klärt, wer was gibt, wer was entscheidet und wo Abhängigkeiten entstehen.',
                'Reisen, Studium, Lehre und Sinnsuche erweitern dein Feld. Dein Glück taucht häufig dort auf, wo du bereit bist, deine bisherige Sicht auf die Welt zu überschreiten.',
                'Öffentlichkeit, Verantwortung und Berufung sind Träger deines Fortune. Wenn du deine Rolle annimmst, ohne dich mit Status zu verwechseln, wird Wirkung zu einem natürlichen Strom.',
                'Freundschaften, Netzwerke und gemeinsame Zukunftsbilder tragen dich. Dein persönliches Glück ist eng mit den Räumen verbunden, die du zusammen mit anderen möglich machst. Achte auf Menschen, die nicht nur deine Gegenwart mögen, sondern Zukunft mit dir denken, Verantwortung teilen und ungewöhnliche Ideen praktisch unterstützen.',
                'Du findest Unterstützung oft in Ruhe, Rückzug, Schlaf, Träumen oder spiritueller Praxis. Plane bewusst Zeiten ohne Leistung und Außenwirkung ein. Nicht jede hilfreiche Entwicklung muss sofort sichtbar oder messbar sein.',
            ],
            jokers: [
                'Was würde ich beginnen, wenn ich nicht erst auf absolute Sicherheit warten müsste?',
                'Was trägt mich auch dann noch, wenn der schnelle Reiz verschwunden ist?',
                'Welches Gespräch oder welche Frage könnte heute eine neue Tür öffnen?',
                'Wo darf ich mich sicher machen, statt mich nur zusammenzureißen?',
                'Was will heute durch mich sichtbar, spielerisch oder großzügig werden?',
                'Welche kleine Ordnung würde meinem Körper und meinem Alltag sofort Erleichterung schenken?',
                'Welche Verbindung fühlt sich gleichzeitig schön, fair und wahr an?',
                'Welches unangenehme Thema muss ich ansprechen, damit Geld, Verantwortung oder Unterstützung fair geregelt werden können?',
                'Welche Entscheidung macht meinen Horizont größer, ohne dass ich vor meinem jetzigen Leben davonlaufe?',
                'Welche Entscheidung würde mein zukünftiges Ich respektieren?',
                'Wo ist mein Anderssein keine Störung, sondern die Lösung?',
                'Was fügt sich, wenn ich präsent bleibe und den Griff ein wenig lockere?',
            ],
            shadows: [
                'Du könntest vorschnell handeln, nur um dich wieder stark und handlungsfähig zu fühlen. Dann erzeugst du vielleicht unnötige Konflikte oder Risiken. Prüfe vor dem Start: Willst du wirklich dorthin – oder willst du nur nicht stillstehen?',
                'Was dich stabil macht, kann dich auch festsetzen. Du hältst möglicherweise an Beziehungen, Besitz oder Routinen fest, weil Veränderung sich körperlich unsicher anfühlt. Genuss kippt in Betäubung, Loyalität in Stillstand und Geduld in das endlose Vertagen einer längst fälligen Bewegung.',
                'Du könntest immer neue Informationen, Gespräche und Optionen suchen, damit du dich nicht festlegen musst. Setze dir einen Zeitpunkt, an dem du entscheidest, auch wenn noch nicht jede Frage beantwortet ist.',
                'Dein Bedürfnis nach Sicherheit kann dich zum emotionalen Radar für alle anderen machen. Du spürst Stimmungen, übernimmst Fürsorge und hoffst, dadurch selbst gehalten zu werden. Wenn das unausgesprochen bleibt, entstehen Rückzug, Schuld oder subtile Kontrolle statt echter Nähe.',
                'Anerkennung tut dir gut, kann aber zu wichtig werden. Dann brauchst du Applaus, romantisches Drama oder eine besondere Rolle, um dich wertvoll zu fühlen. Übe, auch ohne Publikum hinter dir und deiner Arbeit zu stehen.',
                'Du kannst so viel verbessern, ordnen und helfen, dass Freude und Erholung verschwinden. Achte darauf, deinen Wert nicht nur daran zu messen, wie nützlich, organisiert oder fehlerfrei du bist.',
                'Du könntest dich so stark an andere anpassen, dass deine eigene Meinung kaum noch sichtbar ist. Sage früh, was du willst und was für dich nicht passt. Ein offener Konflikt ist oft gesünder als scheinbare Harmonie.',
                'Starke Gefühle können sich für dich wie besonders echte Nähe anfühlen. Doch Misstrauen, Tests, Geheimnisse oder ständige Krisen sind kein Beweis für Intimität. Sprich offen über Angst, Vertrauen, Grenzen und Verantwortung.',
                'Neue Pläne, Reisen oder große Ideen können dir helfen – aber auch vom aktuellen Problem ablenken. Prüfe, ob du gerade wirklich wachsen möchtest oder ob du einer unangenehmen Aufgabe, Grenze oder Enttäuschung ausweichst.',
                'Du könntest glauben, dass etwas nur dann wertvoll ist, wenn es schwer ist. Dadurch übernimmst du zu viel und zeigst deine eigenen Bedürfnisse kaum. Prüfe regelmäßig, welche Verantwortung wirklich zu dir gehört und wobei du Hilfe annehmen darfst.',
                'Freiheit kann zum Reflex gegen jede Form von Bindung werden. Du erkennst früh, was veraltet ist, aber distanzierst dich vielleicht auch von Menschen, Bedürfnissen oder Verantwortung, bevor sie dich wirklich berühren. Anderssein wird zum Gefängnis, wenn Zugehörigkeit automatisch wie Anpassung wirkt.',
                'Du nimmst Stimmungen und feine Signale stark wahr. Das kann hilfreich sein, aber auch zu Wunschdenken oder fehlenden Grenzen führen. Warte nicht nur auf ein Zeichen: Prüfe Fakten, benenne dein Bedürfnis und triff dann eine Entscheidung.',
            ],
            transfers: [
                'Wähle eine sichtbare Handlung, die nur dir gehört: eine Grenze, ein Auftreten oder eine körperliche Entscheidung. Frage nicht zuerst, wie sie wirkt – prüfe, ob du dich darin tatsächlich bewohnst.',
                'Prüfe ehrlich deine aktuelle Situation: Wie viel Geld, Zeit und Kraft hast du wirklich? Was hilft dir langfristig, was beruhigt dich nur kurz und was kostet dich mehr, als es dir gibt?',
                'Sprich einen Gedanken aus, bevor er perfekt ist. Schreib eine Nachricht, stelle eine Frage oder ruf jemanden an. Ziel ist ein echtes Gespräch statt weiterer Gedankenschleifen.',
                'Verändere etwas Konkretes, das dir zu Hause mehr Ruhe gibt. Kläre zum Beispiel eine Grenze, schaffe einen Rückzugsort oder plane verlässliche Zeit für dich. Sicherheit entsteht durch klare Bedingungen, nicht nur durch eine angenehme Atmosphäre.',
                'Plane Zeit für Freude, Flirt oder Kreativität ein, bevor alle Aufgaben erledigt sind. Beobachte, ob du dir Vergnügen nur erlaubst, wenn du es vorher verdient hast.',
                'Wähle eine kleine Routine, die täglich zehn Minuten echte Erleichterung schafft. Nicht optimieren, nicht tracken, nicht perfektionieren – sieben Tage lang nur wiederholen und beobachten.',
                'Führe ein klares Gespräch. Sage, was du willst, was du nicht willst und wobei du noch unsicher bist. Erwarte nicht, dass die andere Person deine Entscheidung für dich trifft.',
                'Sprich ein gemeinsames Thema an, das bisher vermieden wurde – zum Beispiel Geld, Schulden, Besitz, Verantwortung, Sexualität oder die Frage, wer über was entscheidet. Du musst es nicht sofort lösen. Der erste Schritt ist, klar auszusprechen, was tatsächlich los ist und was du brauchst.',
                'Tu etwas, das deine bisherige Perspektive real erweitert: eine Reise, ein Seminar, ein schwieriges Buch oder ein Gespräch außerhalb deiner Bubble. Formuliere danach, was du nun anders leben willst.',
                'Wähle eine Verantwortung, die du bewusst übernimmst, und eine Aufgabe, die du abgibst. Du wirst nicht besser, indem du möglichst viel trägst, sondern indem du für die richtigen Dinge zuverlässig zuständig bist.',
                'Teile eine Idee mit einer Gruppe, statt sie nur allein weiterzudenken. Bitte um ehrliches Feedback, suche Mitstreiter und prüfe, ob die Idee auch gemeinsam praktisch funktioniert.',
                'Nimm dir 20 Minuten ohne Handy, Musik oder andere Ablenkung. Schreib danach ehrlich auf, was du gedacht und gefühlt hast – auch wenn es nur Müdigkeit, Unruhe oder Leere war.',
            ],
        },
        spirit: {
            name: 'Spirit',
            symbol: '✦',
            subtitle: 'Was du erschaffst',
            question: 'Wo nimmt dein Wille Form an?',
            opening: [
                'Spirit ist der Teil in dir, der nicht nur hofft. Er entscheidet, richtet sich aus und übernimmt Verantwortung für das, was entstehen soll.',
                'Spirit zeigt, welche Entscheidungen wirklich von dir kommen. Es geht nicht um die lauteste Meinung im Raum, sondern um das, wofür du selbst Verantwortung übernehmen möchtest.',
                'Dein Spirit zeigt, wie aus einer Möglichkeit eine Richtung und aus einer Richtung ein gelebtes Leben wird.',
            ],
            signs: [
                'Du triffst Entscheidungen oft besser, wenn du ins Handeln kommst. Warte nicht zu lange auf den perfekten Plan. Mache einen ersten kleinen Schritt und prüfe danach, ob die Richtung weiterhin stimmt.',
                'Du willst, was Bestand hat. Entscheidungen reifen in dir körperlich und langsam, werden dann aber sehr tragfähig. Dein Spirit ist nicht sprunghaft – er baut Werte, Beziehungen und Werke, die bleiben können.',
                'Dein Wille denkt, fragt und verknüpft. Mehrere Perspektiven sind kein Zeichen fehlender Klarheit, sondern Teil deiner Intelligenz. Entscheidend ist, irgendwann aus der interessanten Möglichkeit einen ausgesprochenen Satz zu machen.',
                'Gefühle und Beziehungen spielen bei deinen Entscheidungen eine große Rolle. Achte darauf, die Bedürfnisse anderer nicht automatisch für deine eigenen zu halten. Frage dich ausdrücklich: Was möchte ich?',
                'Dein Wille möchte gestalten, führen und gesehen werden. Du bist am klarsten, wenn Herz und Handlung dieselbe Richtung haben. Anerkennung kann dich stärken – sie darf aber nicht die Quelle deiner Entscheidung werden.',
                'Dein Spirit arbeitet präzise, nützlich und differenziert. Du erkennst, was verbessert werden kann, und kannst daraus echte Meisterschaft entwickeln. Perfektionismus wird erst dann zum Problem, wenn er jede Entscheidung vertagt.',
                'Du willst in Beziehung zu etwas kommen: zu Menschen, Schönheit, Gerechtigkeit oder einer stimmigen Form. Dein Wille wägt ab. Seine Reife zeigt sich, wenn Harmonie nicht länger bedeutet, die eigene Position zu verschweigen.',
                'Du entscheidest gründlich und möchtest dich dann vollständig festlegen. Unklare Zwischenlösungen kosten dich viel Kraft. Achte trotzdem darauf, nicht jede Entscheidung zu einem Alles-oder-nichts-Moment zu machen.',
                'Du entscheidest dich gern für Möglichkeiten, die Wachstum, Lernen und Sinn versprechen. Damit aus Begeisterung etwas Reales wird, brauchst du anschließend einen Plan, einen Termin und einen konkreten nächsten Schritt.',
                'Dein Wille ist konzentriert und langfristig. Verantwortung macht dich klarer, solange du sie bewusst wählst. Du kannst große Dinge tragen – musst aber nicht jede Schwere automatisch zu deinem Auftrag erklären.',
                'Dein Spirit entscheidet frei, unkonventionell und zukunftsorientiert. Authentizität ist wichtiger als Anpassung. Die Kunst besteht darin, nicht nur gegen eine alte Form zu rebellieren, sondern eine bessere wirklich aufzubauen.',
                'Dein Wille kommt als Ahnung, Bild oder innere Strömung. Du brauchst Räume, in denen das Leise hörbar wird. Sobald du deine Intuition erdest, kann aus einem scheinbar formlosen Traum eine überraschend klare Richtung werden.',
            ],
            houses: [
                'Dein Wille will durch dich selbst sichtbar werden. Identität, Körper und Präsenz sind die Bühne, auf der du Entscheidungskraft entwickelst. Jede Entscheidung verändert hier auch dein Selbstbild: Du wirst nicht erst sicher und handelst dann – du erkennst dich zunehmend in dem, was du bewusst tust.',
                'Spirit wird konkret, wenn du Werte definierst und Ressourcen aufbaust. Geld, Selbstwert und Besitz fragen dich: Was ist mir wichtig genug, um es zu nähren?',
                'Deine Stimme ist ein Werkzeug des Willens. Schreiben, Lehren, Fragen und Austausch helfen dir, Richtung nicht nur zu denken, sondern auszusprechen. Sprache wird zur Handlung, sobald du dich festlegst, Wissen weitergibst oder einen Gedanken so formulierst, dass andere tatsächlich darauf reagieren können.',
                'Wichtige Entscheidungen betreffen bei dir häufig Familie, Herkunft und Zuhause. Du musst deine Vergangenheit nicht reparieren. Du darfst aber bewusst entscheiden, welche alten Regeln und Erwartungen heute noch zu deinem Leben passen.',
                'Kreativität, Freude und Selbstausdruck sind wichtige Entscheidungsfelder für dich. Du möchtest etwas Eigenes schaffen und zeigen. Der nächste Schritt besteht darin, aus einer privaten Idee ein sichtbares Projekt zu machen und dafür Verantwortung zu übernehmen.',
                'Dein Wille zeigt sich im Alltag: in Routinen, Arbeit, Dienst und dem, was du verlässlich wiederholst. Große Absichten werden hier durch kleine Konsequenz wahr.',
                'Beziehung ist ein Feld bewusster Entscheidung. Du entwickelst Richtung im Gegenüber – und lernst, Bindung nicht mit dem Verlust eigener Führung zu verwechseln. Verträge, Partnerschaften und klare Absprachen zeigen dir, ob zwei Willen wirklich gemeinsam gestalten oder nur auf gegenseitige Anpassung hoffen.',
                'Wichtige Entscheidungen betreffen bei dir häufig Intimität, Vertrauen, Geld, Besitz oder gemeinsame Verantwortung. Kläre offen, wer was entscheidet, bezahlt und übernimmt. Sprich auch über Zustimmung, Risiken und mögliche Abhängigkeiten.',
                'Lernen, Reisen, Lehren und persönliche Überzeugungen beeinflussen deine Entscheidungen stark. Eine Idee ist für dich aber erst dann wirklich wichtig, wenn sie dein Verhalten und deinen Umgang mit anderen konkret verändert.',
                'Beruf, Führung und öffentliche Verantwortung sind wichtige Entscheidungsfelder für dich. Warte nicht nur darauf, dass andere dein Potenzial erkennen. Definiere selbst, welche Rolle du übernehmen und welche konkrete Wirkung du erzielen möchtest.',
                'Du gestaltest Zukunft mit anderen. Gruppen, Freundschaften, Community und gemeinsame Ideale sind Orte, an denen dein Wille gesellschaftliche Form annimmt. Deine Vision wird reifer, wenn sie Zusammenarbeit, Widerspruch und geteilte Verantwortung aushält – nicht nur Zustimmung zu deiner Idee.',
                'Spirit wirkt im Verborgenen. Innere Arbeit, Rückzug und Spiritualität verlangen eine Führung, die nicht ständig von außen bestätigt werden kann. Entscheidungen reifen hier oft still; entscheidend ist, dass Rückzug irgendwann eine klare innere Ausrichtung hervorbringt und nicht zum dauerhaften Verschwinden wird.',
            ],
            jokers: [
                'Was entscheide ich, wenn ich mich selbst nicht länger aus meiner Entscheidung herausrechne?',
                'Wofür bin ich bereit, langfristig Zeit, Geld oder Aufmerksamkeit bereitzustellen?',
                'Welcher klare Satz würde aus meinen Gedanken eine Richtung machen?',
                'Welche Entscheidung entspricht meinen tatsächlichen Bedürfnissen – auch wenn dadurch ein Konflikt entstehen könnte?',
                'Was würde ich wählen, wenn mein Herz führen dürfte, ohne um Applaus zu bitten?',
                'Welche wiederholbare Handlung macht meine Absicht real?',
                'Was muss ich in dieser Beziehung offen und ehrlich ansprechen?',
                'Was muss ich beenden oder ablehnen, damit ich mich klar für das Wichtige entscheiden kann?',
                'Welcher Wert oder welches langfristige Ziel soll meine nächste Entscheidung leiten?',
                'Welche Verantwortung ist wirklich meine – und welche nur vertraute Schwere?',
                'Welche neue Form entspricht der Zukunft, die ich längst sehen kann?',
                'Wie kann ich meiner Intuition heute eine konkrete Form geben?',
            ],
            shadows: [
                'Du kannst Entscheidung mit Geschwindigkeit verwechseln. Dann wird jedes Zögern zum Feind, Widerstand zur Provokation und Kooperation fühlt sich wie Kontrollverlust an. Dein Wille ist stark – aber nicht jede Tür, die sich öffnen lässt, ist deine Tür.',
                'Deine Entschlossenheit kann zur stillen Verweigerung werden. Du bleibst bei einem Plan, Wert oder Versprechen, weil eine Kurskorrektur sich wie Verrat an dir selbst anfühlt. So schützt Beständigkeit irgendwann nicht mehr das Wesentliche, sondern nur noch das Bekannte.',
                'Du kannst eine Entscheidung so lange von allen Seiten betrachten, dass du gar nicht mehr handelst. Vielleicht sagst du, du seist noch nicht sicher, obwohl du vor allem die Konsequenzen vermeiden möchtest. Lege einen Termin für deine Entscheidung fest.',
                'Du könntest für andere sorgen, statt direkt zu sagen, was du selbst möchtest. Danach bist du enttäuscht, wenn niemand deine unausgesprochenen Erwartungen erfüllt. Formuliere deine Wünsche, bevor du Unterstützung anbietest.',
                'Du könntest deine Entscheidung davon abhängig machen, wie andere darauf reagieren. Zustimmung ist angenehm, aber kein Beweis dafür, dass ein Weg richtig ist. Prüfe auch ohne Publikum, ob du diese Entscheidung vertreten kannst.',
                'Dein Anspruch kann jede lebendige Idee in ein Optimierungsprojekt verwandeln. Du verbesserst so lange, bis der Moment zum Handeln vorbei ist, oder definierst deinen Wert über Nützlichkeit. Perfektionismus ist hier oft Angst in sehr kompetenter Kleidung.',
                'Du kannst Entscheidung als endlose diplomatische Vorbereitung inszenieren. Alle Perspektiven werden gehört, nur deine eigene bleibt weichgezeichnet. Harmonie wird zur Machtstrategie, wenn niemand offen widersprechen darf und du trotzdem erwartest, verstanden zu werden.',
                'Du könntest andere testen, Informationen zurückhalten oder eine Entscheidung hinauszögern, bis du dich vollkommen sicher fühlst. Das wirkt kontrolliert, verhindert aber Vertrauen. Sage direkt, was du wissen und klären möchtest.',
                'Eine große Idee kann dich so begeistern, dass du Aufwand, Grenzen und betroffene Menschen unterschätzt. Bevor du zusagst, prüfe Zeit, Geld, Verantwortung und die konkreten Folgen für alle Beteiligten.',
                'Du kannst deinen Wert an Belastbarkeit koppeln. Ziele werden härter, Zeitpläne enger und Bedürfnisse störender, weil Erfolg beweisen soll, dass du alles im Griff hast. Spirit wird dann zum inneren Vorstand, der permanent Leistung verlangt und niemals wirklich Feierabend macht.',
                'Dein Zukunftsblick kann zur emotionalen Distanz werden. Du erkennst Systeme, Muster und bessere Lösungen, aber überspringst vielleicht die langsame menschliche Arbeit dazwischen. Rebellion ist noch keine Richtung; Anderssein noch keine gelebte Alternative.',
                'Du könntest auf ein Zeichen oder den perfekten inneren Zustand warten, statt dich festzulegen. Prüfe, welche Fakten vorliegen, welche Entscheidung wirklich deine ist und bis wann du handeln möchtest.',
            ],
            transfers: [
                'Triff eine Entscheidung, die deine Identität sichtbar macht: ein Satz, eine Grenze oder ein Auftritt. Erkläre sie nicht länger als nötig und beobachte, wie dein Körper auf klare Selbstführung reagiert.',
                'Gib deiner Priorität ein reales Budget aus Zeit, Geld oder Aufmerksamkeit. Ein Wert, der keine Ressource erhält, ist noch keine Entscheidung.',
                'Formuliere deine Richtung in einem einzigen klaren Satz und teile ihn mit jemandem. Streiche jede Einschränkung, die nur dazu dient, eine Hintertür offen zu halten.',
                'Triff eine konkrete Entscheidung zu Zuhause oder Familie, die nicht nur Streit vermeidet, sondern auch deine eigenen Bedürfnisse schützt.',
                'Erstelle etwas Eigenes und zeige es, bevor du weißt, wie andere reagieren. Lege einen konkreten Termin fest, an dem deine Idee sichtbar wird.',
                'Übersetze deine Absicht in eine kleine wiederholbare Handlung. Lege Zeitpunkt, Dauer und Mindestversion fest – und miss Erfolg zunächst nur daran, ob du wiederkommst.',
                'Sprecht in einer Beziehung ausdrücklich darüber, was ihr beide wollt. Haltet fest, was jede Person übernimmt und was nicht. Verlasst euch nicht darauf, dass der andere eure Erwartungen errät.',
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
                'Eros beschreibt, was dich stark anzieht und dir Lust, Neugier oder Energie gibt.',
                'Dieser Punkt zeigt, bei welchen Menschen, Tätigkeiten und Erfahrungen du dich nicht nur pflichtbewusst, sondern wirklich wach und lebendig fühlst.',
            ],
            signs: [
                'Dein Eros ist spontan, heiß und direkt. Spannung, Initiative und ein klares Ja lassen dich aufwachen. Zu viel Taktik kühlt dich ab – du willst Begegnung, die den Mut hat, wirklich zu beginnen.',
                'Dein Begehren ist sinnlich, körperlich und langsam. Duft, Berührung, Geschmack und Verlässlichkeit bauen die Spannung auf. Je weniger du hetzt, desto tiefer kann dein Feuer werden.',
                'Dein Eros geht über den Kopf. Worte, Humor, Nachrichten und geistige Beweglichkeit sind erotischer Treibstoff. Wenn das Gespräch aufhört zu leben, verliert häufig auch dein Begehren die Farbe.',
                'Emotionale Sicherheit ist für dein Begehren besonders wichtig. Du öffnest dich leichter, wenn du dich geschützt, verstanden und mit deinen Gefühlen ernst genommen fühlst.',
                'Dein Eros strahlt. Romantik, Spiel, Kreativität und ein Gegenüber, das dein Feuer feiert, machen dich lebendig. Du willst nicht bloß gemocht – du willst mit ganzem Herzen gesehen werden.',
                'Dein Begehren ist fein, aufmerksam und konkret. Kleine Gesten, gute Pflege und echte Präsenz können stärker wirken als jede große Show. Was du achtsam berührst, bekommt Bedeutung.',
                'Schönheit, Blickkontakt, Eleganz und ein faires Miteinander ziehen dich an. Harmonie ist für dich erotisch. Sie sollte aber nicht dazu führen, dass wichtige Wünsche oder Konflikte verschwiegen werden.',
                'Du fühlst dich von intensiven Menschen und tiefen Gesprächen stark angezogen. Vertrauen, Sexualität, Geheimnisse und Tabuthemen können wichtig sein. Prüfe, ob die Intensität echte Nähe schafft oder ob Kontrolle, Angst und Abhängigkeit die Verbindung zusammenhalten.',
                'Freiheit, Abenteuer, Humor und neue Horizonte halten dein Feuer wach. Dein Eros braucht Raum und eine Begegnung, in der Wachstum nicht als Gefahr behandelt wird.',
                'Dein Begehren ist konzentriert, reif und ausdauernd. Commitment, Kompetenz und klare Grenzen können tief erotisch wirken. Was langsam Vertrauen gewinnt, glüht bei dir häufig besonders lange.',
                'Dein Eros ist frei, eigen und elektrisch. Ungewöhnliche Menschen und Verbindungen ohne enge Schubladen ziehen dich an. Nähe funktioniert am besten, wenn beide trotzdem ganz sie selbst bleiben dürfen.',
                'Musik, Atmosphäre, Fantasie und ein starkes Gefühl von Verbundenheit können dein Begehren wecken. Achte darauf, trotz großer Gefühle deine Grenzen und die Realität der anderen Person wahrzunehmen.',
            ],
            houses: [
                'Dein Körper ist die Bühne. Andere können dein Feuer spüren, bevor du etwas sagst. Präsenz, Bewegung und Blickkontakt bringen Eros unmittelbar ins Leben. Dein Begehren wird besonders klar, wenn du nicht versuchst, begehrenswert zu wirken, sondern deine eigene körperliche Antwort ernst nimmst.',
                'Lust entsteht über Sinne, Berührung, Stabilität und Genuss. Du begehrst, was greifbar ist und dir erlaubt, vollständig im Körper anzukommen. Zeit ist hier kein Hindernis, sondern ein erotischer Verstärker – sofern Langsamkeit nicht bloß eine elegante Form des Festhaltens wird.',
                'Gespräche bis spät in die Nacht, Humor, Nachrichten und neugierige Fragen können dich stark anziehen. Prüfe, ob daraus auch emotionale Nähe und verlässliches Verhalten entstehen – nicht nur spannende Worte.',
                'Eros braucht einen geschützten Raum. Zuhause, Vertrautheit und emotionale Sicherheit öffnen eine Seite, die nicht für jede Öffentlichkeit bestimmt ist. Gerade deshalb müssen Geborgenheit und Grenze nebeneinander bestehen: Nähe verliert ihre Erotik, wenn sie zur vollständigen Verschmelzung wird.',
                'Spiel, Flirt, Kunst und Romantik machen dich in diesem Bereich lebendig. Zeige offen, wenn du begeistert bist. Du musst Freude nicht erst verdienen und auch nicht so tun, als wärst du immer souverän.',
                'Eros lebt in Fürsorge, Ritualen und kleinen Gesten. Gemeinsamer Alltag kann tief sinnlich werden, wenn Aufmerksamkeit nicht mit bloßem Funktionieren verwechselt wird. Lust braucht hier keine große Inszenierung, wohl aber einen Moment, in dem Optimierung, Dienst und Nützlichkeit wirklich enden dürfen.',
                'Anziehung entsteht bei dir stark im direkten Kontakt mit einem anderen Menschen. Blickkontakt, Reaktion und echtes Interesse sind wichtig. Sage trotzdem klar, was du möchtest, statt deine Wünsche so lange anzupassen, bis es keinen Konflikt mehr gibt.',
                'Du suchst intensive und ehrliche Intimität. Deshalb sind klare Zustimmung, Grenzen und offene Gespräche über Macht besonders wichtig. Starke Gefühle dürfen nicht dazu benutzt werden, die andere Person zu testen, zu kontrollieren oder unter Druck zu setzen.',
                'Reisen, Lernen und geistige Abenteuer entzünden dich. Du willst ein Begehren, das deinen Horizont erweitert und nicht nur Bekanntes wiederholt. Die Verbindung bleibt lebendig, wenn Freiheit nicht Flucht bedeutet, sondern beide Menschen größer in ihr eigenes Leben zurückkehren lässt.',
                'Kompetenz, Verantwortung und berufliche Ausstrahlung können dich stark anziehen. Prüfe genau, was du begehrst: den Menschen selbst, eure gemeinsame Wirkung oder die Sicherheit und Anerkennung, die sein Status verspricht.',
                'Freundschaft, Freiheit, Szenen und gemeinsame Visionen beleben Eros. Du begehrst Menschen, mit denen du Zukunft denken und trotzdem eigenständig bleiben kannst. Nähe wird besonders spannend, wenn sie aus Wahl entsteht – nicht aus sozialer Anpassung, emotionaler Unverfügbarkeit oder der Angst vor gewöhnlicher Bindung.',
                'Musik, Fantasie, Träume und ungestörte Zeit können dein Begehren stark wecken. Nimm diese inneren Bilder ernst, aber prüfe in einer realen Beziehung immer auch Grenzen und Gegenseitigkeit.',
            ],
            jokers: [
                'Was will mein Körper jetzt – bevor mein Kopf die Antwort sozial verträglich macht?',
                'Was wird lebendiger, wenn ich langsamer werde und wirklich empfange?',
                'Welches Gespräch bringt meine Augen wieder zum Leuchten?',
                'Wo brauche ich Sicherheit, um mich wirklich öffnen zu können?',
                'Wo darf ich größer, verspielter und sichtbarer werden?',
                'Welche kleine Geste würde mir heute spürbar Freude oder Lust geben?',
                'Welche Begegnung fühlt sich gleichzeitig schön, frei und gegenseitig an?',
                'Welchen Wunsch traue ich mich bisher nicht klar auszusprechen?',
                'Welches Abenteuer erinnert mich daran, dass ich lebendig bin?',
                'Welches klare Ja ist stark genug, um langsam tiefer zu werden?',
                'Wo braucht Nähe mehr Freiheit statt mehr Kontrolle?',
                'Welche Musik, Fantasie oder stille Sehnsucht will heute Raum bekommen?',
            ],
            shadows: [
                'Du kannst Begehren nur dann spüren, wenn etwas gejagt, erobert oder riskiert werden muss. Sobald Nähe verfügbar wird, sinkt die Spannung – oder du erzeugst Konflikt, damit wieder Hitze entsteht. Nicht jedes starke Kribbeln ist Kompatibilität; manchmal ist es nur Adrenalin mit gutem Marketing.',
                'Genuss kann in Festhalten kippen. Du bleibst bei Menschen, Gewohnheiten oder Fantasien, weil dein Körper das Vertraute mit Sicherheit verwechselt. Sinnlichkeit wird dann zur Sedierung und Exklusivität zur Besitzfrage. Echte Langsamkeit bleibt lebendig; Stillstand wird nur bequem.',
                'Du könntest den Flirt und die nächste Nachricht spannender finden als eine echte, verbindliche Nähe. Sobald es ruhiger wird, wirkt die Verbindung vielleicht langweilig. Prüfe, ob wirklich etwas fehlt oder ob du nur an ständige neue Reize gewöhnt bist.',
                'Dein Wunsch nach emotionaler Sicherheit kann Verschmelzung erzeugen. Du begehrst, was sich nach Zuhause anfühlt – auch wenn es eigentlich nur vertraute Verletzung ist. Fürsorge wird erotischer Vertrag, Rückzug zur Strafe und Nostalgie zum Filter über die Gegenwart.',
                'Du möchtest deutlich gesehen und begehrt werden. Dadurch können Drama, große Gesten oder unerreichbare Menschen besonders spannend wirken. Prüfe, ob auch ruhige, verlässliche Nähe Platz hat, wenn niemand beeindruckt werden muss.',
                'Du kannst so stark auf Details achten, dass Lust wie eine Aufgabe wird. Vielleicht versuchst du, dich selbst, die andere Person oder die Beziehung ständig zu verbessern. Frage dich, ob du gerade wirklich genießt oder nur dafür sorgst, gebraucht zu werden.',
                'Du könntest eine Verbindung schöner darstellen, als sie sich tatsächlich anfühlt. Vielleicht bleibst du höflich und anziehend, sagst aber nicht klar, was du willst. Echte Nähe braucht eine eigene Position und die Möglichkeit, auch ein Nein zu hören.',
                'Intensität kann zur Droge werden. Du prüfst, bindest, provozierst oder verschmilzt, um sicherzugehen, dass die Verbindung stark genug ist. Obsession fühlt sich dann wie Schicksal an. Wirkliche Intimität beginnt dort, wo Macht, Zustimmung und Angst ausgesprochen werden dürfen.',
                'Freiheit kann zur Flucht vor Bindung werden. Du begehrst das Ferne, Neue oder Unerreichbare und verlierst Interesse, sobald Alltag und Wiederholung beginnen. Nicht jede Grenze ist ein Käfig; manchmal ist sie genau die Form, in der ein Feuer länger als eine Reise brennen kann.',
                'Du könntest Gefühle und Begehren stark kontrollieren. Menschen mit Status, Kompetenz oder emotionalem Abstand wirken dann besonders anziehend, weil du selbst nicht sofort verletzlich sein musst. Übe, ein echtes Bedürfnis zu zeigen, ohne es vorher perfekt zu begründen.',
                'Du willst Freiheit, kannst aber emotionale Distanz als Unabhängigkeit verkaufen. Unerreichbare, ungewöhnliche oder komplizierte Menschen halten dein System elektrisch, ohne dich wirklich zu binden. Rebellion gegen Normen ist nicht automatisch intime Ehrlichkeit.',
                'Du könntest einen Menschen stärker idealisieren, als die reale Beziehung es rechtfertigt. Achte auf konkrete Handlungen, klare Grenzen und echtes gegenseitiges Interesse. Ein starkes Gefühl ersetzt keine verlässliche Realität.',
            ],
            transfers: [
                'Tu etwas, das dich unmittelbar in deinen Körper bringt: Bewegung, Kleidung, Blickkontakt oder eine klare Initiative. Frage danach nicht nur „War ich mutig?“, sondern „War mein Ja wirklich meines?“',
                'Plane ein langsames sinnliches Ritual ohne Bildschirm und ohne Leistung: Essen, Berührung, Musik oder Natur. Beobachte, wann Genuss auftaucht und wann du nur Gewohnheit wiederholst.',
                'Beginne das Gespräch, das dich geistig und körperlich wach macht. Stelle eine echte Frage, sage etwas Riskantes und bleib lang genug, um die Antwort nicht sofort mit einem neuen Thema zu überholen.',
                'Schaffe einen Raum, in dem Öffnung sicherer wird: Tür zu, Handy weg, klare Zeit, klare Grenze. Sag, was du brauchst, bevor du hoffst, dass jemand es errät.',
                'Plane eine Aktivität, die dir Freude und Energie gibt: tanzen, flirten, fotografieren, malen oder auftreten. Wähle etwas, das du auch dann genießen würdest, wenn niemand dafür applaudiert.',
                'Bring Sinnlichkeit in eine alltägliche Handlung: Kochen, Duschen, Aufräumen, Pflege oder gemeinsame Routine. Nimm wahr, ob Aufmerksamkeit Lust erzeugt – oder ob du dich wieder nur nützlich machst.',
                'Führe ein klares Gespräch über Anziehung und Grenzen. Sage, was du möchtest, was du nicht möchtest und woran du echtes gegenseitiges Interesse erkennst.',
                'Benenne eine Fantasie, Angst oder Machtfrage, die unter der Intimität liegt. Prüfe Zustimmung, Konsequenzen und gemeinsame Verantwortung, bevor Intensität die Führung übernimmt.',
                'Wähle ein reales Abenteuer, das deinen Horizont erweitert, ohne dein bestehendes Leben abzuwerten. Freiheit wird reifer, wenn du auch zurückkommen und integrieren kannst.',
                'Erlaube einem langsamen Ja, tiefer zu werden. Zeige ein Bedürfnis, das sich nicht durch Kompetenz lösen lässt, und beobachte, ob die Verbindung auch deine Weichheit tragen kann.',
                'Verhandle Freiheit konkret: Zeit, Raum, Freundschaften, Sexualität, Erwartungen. Unabhängigkeit wird intim, wenn sie nicht als unangekündigter Rückzug daherkommt.',
                'Drücke eine Fantasie zuerst kreativ aus – zum Beispiel durch Musik, Schreiben, Malen oder Tanz. Prüfe danach, welcher Teil nur in deiner Vorstellung existiert und welcher Teil mit einem realen Menschen wirklich möglich und gegenseitig gewollt ist.',
            ],
        },
    };

    const CONJUNCTIONS = {
        Sonne: 'Die Sonne macht dieses Thema besonders wichtig für dein Selbstbild. Du möchtest hier gesehen werden und dich klar ausdrücken.',
        Mond: 'Der Mond verbindet dieses Thema stark mit deinen Gefühlen, Bedürfnissen und deinem Sicherheitsgefühl.',
        Merkur: 'Merkur macht Gespräche, Fragen, Lernen und Schreiben in diesem Bereich besonders wichtig.',
        Venus: 'Venus betont Beziehung, Anziehung, Genuss und die Frage, was dir wirklich wertvoll erscheint.',
        Mars: 'Mars verstärkt deinen Handlungsdrang. Du möchtest hier schnell aktiv werden und brauchst klare Ziele und Grenzen.',
        Jupiter: 'Jupiter verstärkt den Wunsch nach Wachstum und neuen Möglichkeiten. Achte darauf, dabei nicht mehr zu versprechen, als du tragen kannst.',
        Saturn: 'Saturn verlangt Geduld, Verantwortung und klare Strukturen. Fortschritt kann länger dauern, dafür aber stabil werden.',
        Uranus: 'Uranus verstärkt deinen Wunsch nach Freiheit und Veränderung. Ungewöhnliche Lösungen können hier besser funktionieren als der übliche Weg.',
        Neptun: 'Neptun verstärkt Fantasie, Sehnsucht und Intuition. Prüfe gleichzeitig Fakten und Grenzen, damit du dir nichts schönredest.',
        Pluto: 'Pluto macht dieses Thema intensiv. Fragen nach Vertrauen, Kontrolle, Macht und Abhängigkeit sollten hier offen besprochen werden.',
    };

    const ELEMENT_COPY = {
        Feuer: 'will Bewegung, Mut und gelebte Begeisterung',
        Erde: 'will Substanz, Verkörperung und etwas, das im Alltag trägt',
        Luft: 'will Sprache, Verbindung und einen freien geistigen Raum',
        Wasser: 'braucht emotionale Sicherheit, ehrliche Gefühle und klare Grenzen',
    };

    const FOCUS = {
        work: {
            label: 'Arbeit & Wirkung',
            fortune: 'Für deine Frage zu Arbeit und Wirkung zeigt Fortune, unter welchen Bedingungen du nicht ständig gegen deine eigene Arbeitsweise ankämpfen musst.',
            spirit: 'Für deine berufliche Richtung zeigt Spirit, welche Entscheidungen du bewusst vertreten und in eine klare Rolle übersetzen kannst.',
            eros: 'Für Arbeit und Wirkung zeigt Eros, welche Themen, Menschen und Aufgaben deine Energie anheben – und welche dich trotz äußerem Erfolg innerlich leer lassen.',
        },
        love: {
            label: 'Liebe & Beziehungen',
            fortune: 'Für Liebe und Beziehungen zeigt Fortune, welche Form von Verbindung dich wirklich trägt. Gemeint ist nicht nur Anziehung, sondern eine Dynamik, in der du dich sicherer, freier und mehr bei dir fühlst.',
            spirit: 'Für Liebe und Beziehungen zeigt Spirit, wie du Bindung aktiv mitgestaltest: was du wählst, aussprichst und nicht länger dem Zufall oder dem Gegenüber überlässt.',
            eros: 'Für Liebe und Beziehungen wird Eros besonders direkt. Er beschreibt, was dein Begehren weckt – und hilft dir zugleich zu unterscheiden, ob eine starke Anziehung dich nährt oder nur intensiv beschäftigt.',
        },
        decision: {
            label: 'Eine Entscheidung',
            fortune: 'Bei einer Entscheidung zeigt Fortune, welche Bedingungen dich stabilisieren. Die richtige Wahl muss nicht mühelos sein, aber sie sollte dich nicht dauerhaft von deiner natürlichen Kraft abschneiden.',
            spirit: 'Bei einer Entscheidung ist Spirit der deutlichste Punkt. Er zeigt nicht, was alle anderen für vernünftig halten, sondern wie dein eigener Wille zu einer tragfähigen Richtung wird.',
            eros: 'Bei einer Entscheidung zeigt Eros, welche Option echte Lebendigkeit enthält. Das ist ein wichtiges Signal – aber kein Freifahrtschein für jeden starken Impuls.',
        },
        change: {
            label: 'Veränderung & Neuanfang',
            fortune: 'In einer Veränderung zeigt Fortune, worauf du dich verlassen kannst, während das Alte seine Form verliert. Hier liegt der Teil deines Lebens, der dich auffängt, ohne dich festzuhalten.',
            spirit: 'In einer Veränderung zeigt Spirit, wo du selbst führen musst. Nicht jede Entwicklung passiert von allein; an diesem Punkt braucht das Neue eine bewusste Entscheidung von dir.',
            eros: 'In einer Veränderung zeigt Eros, was dich nach vorn zieht. Er macht sichtbar, ob du wirklich zu etwas Neuem willst – oder nur möglichst schnell vom Alten weg.',
        },
        self: {
            label: 'Mich selbst besser verstehen',
            fortune: 'Fortune erklärt, welche Erfahrungen deinem System vermitteln: Hier darf ich ankommen. Oft ist das so selbstverständlich für dich, dass du seine unterstützende Kraft unterschätzt.',
            spirit: 'Spirit erklärt, wie du Autorin deines Lebens wirst. Er zeigt, welche Art von Entscheidung sich nach dir anfühlt – nicht nur nach Anpassung, Pflicht oder einer klugen Strategie.',
            eros: 'Eros zeigt dir, woran du merkst, dass du nicht nur funktionierst. Achte darauf, bei welchen Menschen und Tätigkeiten Lust, Neugier und volle Aufmerksamkeit gleichzeitig zurückkehren.',
        },
    };

    const FOCUS_DETAILS = {
        work: [
            { value: 'visibility', label: 'Ich möchte sichtbarer werden', context: 'Du möchtest mit deiner Arbeit stärker gesehen oder gehört werden.', today: 'Notiere in einem Satz, wofür du mit deiner Arbeit stehen möchtest. Teile diesen Satz heute mit einer Person oder verwende ihn in einer Nachricht, einem Profil oder einer Präsentation.', month: 'Zeige vier Wochen lang jede Woche einmal sichtbar, woran du arbeitest oder wofür du stehst. Notiere anschließend, welche Reaktionen wirklich relevant waren und welche nur kurzfristige Aufmerksamkeit gebracht haben.' },
            { value: 'direction', label: 'Ich suche eine neue Richtung', context: 'Du möchtest beruflich etwas verändern, weißt aber noch nicht genau, welcher Weg zu dir passt.', today: 'Schreibe zwei Listen: Was soll in deiner Arbeit auf keinen Fall so bleiben? Und was möchtest du in Zukunft häufiger erleben? Begrenze jede Liste auf drei Punkte.', month: 'Teste in den nächsten vier Wochen eine mögliche Richtung im Kleinen: durch ein Gespräch, einen Probetag, ein Mini-Projekt oder eine konkrete Recherche. Entscheide danach anhand der Erfahrung, nicht nur anhand deiner Vorstellung.' },
            { value: 'overload', label: 'Ich bin überfordert oder erschöpft', context: 'Du möchtest verstehen, warum deine Arbeit gerade so viel Kraft kostet und was dich wieder stabilisieren könnte.', today: 'Wähle eine Aufgabe, die heute nicht zwingend erledigt werden muss. Verschiebe, delegiere oder streiche sie bewusst. Nutze die frei gewordene Zeit nicht für die nächste Aufgabe.', month: 'Beobachte vier Wochen lang einmal pro Woche: Welche Aufgaben geben dir Energie, welche kosten Kraft und welche gehören eigentlich nicht zu deiner Verantwortung? Verändere danach mindestens eine feste Aufgabe oder Grenze.' },
            { value: 'conflict', label: 'Ich erlebe einen Konflikt', context: 'Du möchtest in einer beruflichen Spannung klarer erkennen, was du brauchst und welchen Teil du selbst beeinflussen kannst.', today: 'Trenne schriftlich drei Dinge: Was ist tatsächlich passiert? Was interpretierst du? Was brauchst du jetzt konkret? Formuliere daraus einen klaren Satz für das nächste Gespräch.', month: 'Führe innerhalb der nächsten vier Wochen ein klärendes Gespräch. Vereinbart am Ende nicht nur, was besser werden soll, sondern wer bis wann welchen konkreten Schritt übernimmt.' },
            { value: 'own_path', label: 'Ich möchte etwas Eigenes aufbauen', context: 'Du möchtest eine eigene Idee, ein Angebot oder ein Projekt nicht länger nur im Kopf bewegen.', today: 'Beschreibe dein Vorhaben in drei Sätzen: Für wen ist es? Welches konkrete Problem löst es? Was ist der kleinste testbare nächste Schritt?', month: 'Teste dein Vorhaben in den nächsten vier Wochen mit echten Menschen. Führe mindestens drei Gespräche oder biete eine kleine erste Version an, bevor du weiter an Name, Design oder Perfektion arbeitest.' },
        ],
        love: [
            { value: 'new_love', label: 'Ich wünsche mir eine Beziehung', context: 'Du möchtest eine Beziehung, in der Anziehung und echte Sicherheit zusammenpassen.', today: 'Notiere drei Eigenschaften, die sich in einer Beziehung im Alltag zeigen müssen. Beschreibe Verhalten statt abstrakter Begriffe wie „loyal“ oder „emotional verfügbar“.', month: 'Beobachte bei neuen Begegnungen vier Wochen lang nicht nur die Anziehung. Prüfe auch: Ist die Person verlässlich? Kannst du offen sprechen? Bleibst du in ihrer Nähe du selbst?' },
            { value: 'relationship', label: 'Ich möchte meine Beziehung besser verstehen', context: 'Du möchtest verstehen, was eure Verbindung stärkt und an welcher Stelle ihr bewusster handeln müsst.', today: 'Beantworte für dich: Was funktioniert zwischen euch bereits gut? Was fehlt dir konkret? Was davon hast du bisher noch nicht klar ausgesprochen?', month: 'Plant vier Wochen lang ein festes Gespräch pro Woche. Jede Person beantwortet zwei Fragen: Was hat sich diese Woche gut angefühlt? Was brauchen wir nächste Woche anders?' },
            { value: 'unclear', label: 'Ich stecke in einer unklaren Verbindung', context: 'Du möchtest wissen, ob eine intensive oder unklare Verbindung dir wirklich guttut.', today: 'Schreibe auf, was zwischen euch tatsächlich vereinbart ist und was du nur hoffst. Formuliere anschließend die eine Frage, deren ehrliche Antwort du brauchst.', month: 'Setze innerhalb der nächsten vier Wochen eine klare Grenze oder bitte um eine eindeutige Vereinbarung. Beurteile die Verbindung danach anhand des Verhaltens – nicht anhand von Versprechen oder Potenzial.' },
            { value: 'separation', label: 'Ich verarbeite eine Trennung', context: 'Du möchtest nach einer Trennung wieder mehr Halt finden und deine eigene Richtung spüren.', today: 'Wähle eine kleine Handlung, die deinem Körper Sicherheit gibt: essen, schlafen, spazieren, jemanden anrufen oder einen belastenden Kontakt stummschalten. Heute musst du nicht alles verstehen.', month: 'Plane für die nächsten vier Wochen drei verlässliche Anker: eine Person, einen festen Termin und eine körperliche Routine. Prüfe danach, was dich wirklich stabilisiert hat.' },
            { value: 'pattern', label: 'Ich erkenne ein wiederkehrendes Muster', context: 'Du möchtest verstehen, warum sich ein ähnliches Beziehungsmuster wiederholt und was du diesmal anders machen kannst.', today: 'Notiere die letzten drei Situationen, in denen dieses Muster aufgetaucht ist. Was war jeweils das erste Warnsignal, das du bemerkt, aber nicht ernst genommen hast?', month: 'Wähle für die nächsten vier Wochen eine neue Reaktion auf das erste Warnsignal: nachfragen, langsamer werden, eine Grenze nennen oder Abstand nehmen. Beobachte, was sich dadurch verändert.' },
        ],
        decision: [
            { value: 'two_options', label: 'Ich schwanke zwischen zwei Möglichkeiten', context: 'Du möchtest zwei konkrete Möglichkeiten vergleichen, ohne dich in immer neuen Argumenten zu verlieren.', today: 'Bewerte beide Möglichkeiten von eins bis zehn: Wie viel Sicherheit geben sie dir? Wie viel davon kannst du selbst gestalten? Wie viel Energie geben sie dir?', month: 'Teste die bevorzugte Möglichkeit innerhalb von vier Wochen so realistisch wie möglich. Suche keine weiteren Meinungen, bevor du mindestens eine eigene Erfahrung damit gemacht hast.' },
            { value: 'stay_go', label: 'Ich frage mich: bleiben oder gehen?', context: 'Du möchtest erkennen, ob eine bestehende Situation noch tragfähig ist oder ob eine Veränderung notwendig wird.', today: 'Beantworte ehrlich: Was müsste sich konkret verändern, damit Bleiben eine gute Entscheidung wäre? Und bis wann müsste diese Veränderung sichtbar sein?', month: 'Definiere für die nächsten vier Wochen zwei überprüfbare Bedingungen für das Bleiben. Wenn sie nicht eintreten, entscheide bewusst neu, statt die Frist still zu verlängern.' },
            { value: 'timing', label: 'Ich weiß nicht, ob jetzt der richtige Zeitpunkt ist', context: 'Du kennst möglicherweise die Richtung, bist aber unsicher, ob du jetzt handeln solltest.', today: 'Trenne die Entscheidung vom Timing: Was willst du grundsätzlich? Welcher kleinste Schritt wäre heute möglich, ohne bereits alles festzulegen?', month: 'Lege einen konkreten Entscheidungstermin innerhalb der nächsten vier Wochen fest. Sammle bis dahin nur die Informationen, die deine Entscheidung wirklich verändern könnten.' },
            { value: 'outside_expectations', label: 'Andere erwarten etwas von mir', context: 'Du möchtest unterscheiden, was wirklich deine Entscheidung ist und was du aus Pflicht, Angst oder Anpassung erwägst.', today: 'Vervollständige zwei Sätze: „Wenn niemand enttäuscht wäre, würde ich …“ und „Wenn ich mich selbst ernst nehme, muss ich …“', month: 'Triff in den nächsten vier Wochen eine kleine Entscheidung ohne Rechtfertigung. Beobachte, wer deine Grenze respektiert und wo du dich selbst sofort wieder erklärst.' },
        ],
        change: [
            { value: 'chosen_change', label: 'Ich möchte selbst etwas verändern', context: 'Du spürst, dass eine Veränderung fällig ist, und möchtest sie bewusst beginnen.', today: 'Formuliere die Veränderung als sichtbares Verhalten: Was wirst du ab jetzt konkret tun, lassen oder anders entscheiden?', month: 'Wähle einen vierwöchigen Test statt eines endgültigen Versprechens. Lege vorher fest, woran du erkennst, ob die Veränderung dir mehr Halt, Klarheit und Energie gibt.' },
            { value: 'unexpected_change', label: 'Die Veränderung wurde mir aufgezwungen', context: 'Eine Veränderung ist passiert, ohne dass du sie gewählt hast. Du möchtest wieder Einfluss und Orientierung gewinnen.', today: 'Teile ein Blatt in zwei Spalten: Was kann ich gerade nicht beeinflussen? Worüber kann ich heute entscheiden? Wähle genau einen Punkt aus der zweiten Spalte.', month: 'Baue in den nächsten vier Wochen eine neue verlässliche Struktur auf – einen Termin, eine Routine oder eine Unterstützung. Sie soll dir Halt geben, während noch nicht alles geklärt ist.' },
            { value: 'letting_go', label: 'Ich muss etwas loslassen', context: 'Du weißt, dass etwas endet oder nicht mehr zu dir passt, obwohl ein Teil von dir noch daran festhält.', today: 'Benenne konkret, was du loslässt: die Person, die Rolle, die Hoffnung, den Plan oder eine frühere Version von dir. Unterschiedliche Verluste brauchen unterschiedliche Abschiede.', month: 'Entferne innerhalb der nächsten vier Wochen Schritt für Schritt eine praktische Bindung an das Alte. Schaffe gleichzeitig einen neuen Termin, Ort oder Kontakt, der Zukunft möglich macht.' },
            { value: 'new_beginning', label: 'Ich stehe vor einem Neuanfang', context: 'Du möchtest einen neuen Abschnitt beginnen, ohne sofort wieder in alte Gewohnheiten zurückzufallen.', today: 'Entscheide, welche eine alte Gewohnheit du nicht in den neuen Abschnitt mitnehmen möchtest. Bestimme eine konkrete Alternative.', month: 'Überprüfe vier Wochen lang jeden Freitag: Was unterstützt den Neuanfang? Was zieht dich zurück? Welche eine Anpassung machst du in der kommenden Woche?' },
        ],
        self: [
            { value: 'energy', label: 'Ich möchte meine Energie besser verstehen', context: 'Du möchtest klarer erkennen, wodurch du Kraft bekommst und wodurch du sie verlierst.', today: 'Notiere am Abend drei Momente: Wann hattest du mehr Energie, wann weniger und was ist unmittelbar davor passiert?', month: 'Führe diese kurze Beobachtung vier Wochen lang an drei Tagen pro Woche fort. Verändere danach eine wiederkehrende Situation, die dich zuverlässig auslaugt.' },
            { value: 'needs', label: 'Ich möchte meine Bedürfnisse klarer spüren', context: 'Du möchtest deine eigenen Bedürfnisse früher erkennen und verständlicher aussprechen.', today: 'Halte kurz inne und ergänze: „Ich fühle …, weil mir … wichtig ist. Heute brauche ich konkret …“', month: 'Sprich vier Wochen lang jede Woche mindestens ein Bedürfnis aus, bevor Frust oder Rückzug entstehen. Bitte um etwas Konkretes, statt nur zu beschreiben, was falsch läuft.' },
            { value: 'patterns', label: 'Ich möchte meine Muster verstehen', context: 'Du möchtest eine wiederkehrende Reaktion verstehen, die dir heute nicht mehr hilft.', today: 'Beschreibe eine aktuelle Situation in vier Schritten: Auslöser, erster Gedanke, Gefühl, Reaktion. Markiere den frühesten Punkt, an dem eine andere Reaktion möglich wäre.', month: 'Übe vier Wochen lang genau an diesem frühen Punkt eine neue Reaktion. Sie darf klein sein: zehn Minuten warten, nachfragen, Nein sagen oder Unterstützung holen.' },
            { value: 'direction', label: 'Ich wünsche mir mehr innere Richtung', context: 'Du möchtest wieder klarer spüren, was dir wichtig ist und worauf du deine Kraft richten willst.', today: 'Schreibe drei Dinge auf, die in den nächsten zwölf Monaten wichtiger werden sollen. Streiche anschließend den Punkt, der vor allem gut aussieht, aber wenig mit dir zu tun hat.', month: 'Gib dem wichtigsten verbleibenden Punkt vier Wochen lang jede Woche einen festen Termin. Prüfe danach, ob deine Klarheit durch die praktische Erfahrung gewachsen ist.' },
        ],
    };

    const ELEMENT_PRACTICE = {
        Feuer: 'Du erkennst die stimmige Richtung daran, dass Mut, Bewegung und echte Begeisterung entstehen – ohne dass du permanent Drama oder Druck dafür brauchst.',
        Erde: 'Du erkennst die stimmige Richtung daran, dass sie im Alltag tragfähig wird: in Zeit, Körper, Geld, Verlässlichkeit und konkreten nächsten Schritten.',
        Luft: 'Du erkennst die stimmige Richtung daran, dass Denken und Austausch dich weiterbringen. Entscheidend ist, dass aus einer Idee irgendwann ein Gespräch, eine Wahl oder eine Handlung wird.',
        Wasser: 'Du erkennst eine passende Richtung daran, dass sie sich emotional sicher und ehrlich anfühlt. Prüfe trotzdem Fakten und Grenzen, damit du ein starkes Gefühl nicht mit einer sicheren Entscheidung verwechselst.',
    };

    const copy = window.sfFortuneCopy || {};
    Object.assign(PLANET_STRATEGY, copy.planetStrategy || {});
    Object.assign(PLANET_SHADOW, copy.planetShadow || {});
    Object.assign(CONJUNCTIONS, copy.conjunctions || {});
    Object.assign(ELEMENT_COPY, copy.elementCopy || {});
    Object.assign(ELEMENT_PRACTICE, copy.elementPractice || {});
    Object.assign(FOCUS, copy.focus || {});
    Object.assign(FOCUS_DETAILS, copy.focusDetails || {});
    Object.assign(LOTS, copy.lots || {});
    const ACTION_STYLE = copy.actionStyle || {};
    const ACTION_AREA = copy.actionArea || {};

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
    const focusDetailField = document.getElementById('fortune-focus-detail');
    const focusDetailOptions = document.getElementById('fortune-focus-detail-options');
    let selectedPlace = null;
    let searchTimer = null;
    let activeRequest = null;

    function renderFocusDetails(focus) {
        const details = FOCUS_DETAILS[focus] || [];
        focusDetailOptions.innerHTML = details.map(item => `<label><input type="radio" name="focus-detail" value="${escapeHtml(item.value)}"><span>${escapeHtml(item.label)}</span></label>`).join('');
        focusDetailField.hidden = !details.length;
    }

    form.querySelectorAll('input[name="focus"]').forEach(input => {
        input.addEventListener('change', () => renderFocusDetails(input.value));
    });

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

    function focusDetailConfig(focus, focusDetail) {
        return (FOCUS_DETAILS[focus] || []).find(item => item.value === focusDetail) || null;
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

    function conjunctionSectionMarkup(key, detail) {
        if (!detail.conjunctions.length) { return ''; }
        const lot = LOTS[key];
        const list = detail.conjunctions.map(item => `<li><strong>${escapeHtml(item.planet)} · ${item.distance.toFixed(1)}° Orbis</strong><br>${CONJUNCTIONS[item.planet]}</li>`).join('');
        const planetNames = detail.conjunctions.map(item => escapeHtml(item.planet)).join(' und ');
        const headline = detail.conjunctions.length === 1
            ? `${escapeHtml(detail.conjunctions[0].planet)} ist bei deinem ${lot.name} besonders wichtig.`
            : `Mehrere Planeten prägen deinen ${lot.name} besonders stark.`;
        return `
            <section class="fortune-layer">
                <p class="fortune-layer-label">Zusätzlicher Einfluss</p>
                <h3>${headline}</h3>
                <p>${planetNames} ${detail.conjunctions.length === 1 ? 'steht' : 'stehen'} in deinem Geburtshoroskop sehr nah an diesem berechneten Punkt. Dadurch wird die folgende Planetendeutung zu einem wichtigen zusätzlichen Teil deines ${lot.name}.</p>
                <ul class="fortune-conjunction-list">${list}</ul>
            </section>`;
    }

    function focusMarkup(key, detail, focus, focusDetail) {
        const selected = FOCUS[focus];
        if (!selected) { return ''; }
        const headline = key === 'fortune'
            ? `Was dir bei ${selected.label} mehr Stabilität gibt.`
            : key === 'spirit'
                ? `Was du bei ${selected.label} bewusst entscheiden und gestalten kannst.`
                : `Was bei ${selected.label} dein echtes Interesse und deine Lust weckt.`;
        return `
            <section class="fortune-facets">
                <p class="fortune-layer-label">Dein Thema · ${selected.label}</p>
                <h3>${headline}</h3>
                <div class="fortune-facet-grid">
                    <article>
                        <span>↘</span>
                        <h4>${detail.house}. Haus</h4>
                        <p>${selected[key]} Bei dir zeigt sich das besonders im ${detail.house}. Haus. Dazu gehören <strong>${HOUSES[detail.house - 1]}</strong>. ${ELEMENT_PRACTICE[detail.sign.element]}</p>
                    </article>
                </div>
            </section>`;
    }

    function personalLayersMarkup(key, detail, focus, focusDetail) {
        const lot = LOTS[key];
        const shadowHeadline = key === 'fortune'
            ? 'Wodurch du dir selbst Sicherheit nehmen kannst.'
            : key === 'spirit'
                ? 'Wodurch du eine notwendige Entscheidung hinauszögern kannst.'
                : 'Was du mit echter Anziehung oder Nähe verwechseln könntest.';
        const actionHeadline = key === 'fortune'
            ? 'Das kannst du jetzt für mehr Stabilität tun.'
            : key === 'spirit'
                ? 'So wird aus deiner Absicht eine umsetzbare Entscheidung.'
                : 'So gibst du Lust, Neugier und Sinnlichkeit wieder mehr Raum.';
        return `
            ${focusMarkup(key, detail, focus, focusDetail)}
            <aside class="fortune-shadow-truth">
                <p class="fortune-layer-label">Worauf du achten solltest</p>
                <h3>${shadowHeadline}</h3>
                <p>${lot.shadows[detail.signIndex]}</p>
            </aside>
            <section class="fortune-transfer">
                <p class="fortune-layer-label">Konkreter nächster Schritt</p>
                <h3>${actionHeadline}</h3>
                <ol>
                    <li><span>01 · Experiment</span><p>${lot.transfers[detail.house - 1]}</p></li>
                </ol>
            </section>`;
    }

    function rulerSectionMarkup(key, detail, chart) {
        const order = ['fortune', 'spirit', 'eros'];
        const currentIndex = order.indexOf(key);
        const previousKey = order.slice(0, currentIndex).find(candidate => chart.lots[candidate].ruler === detail.ruler);
        const lot = LOTS[key];

        if (previousKey) {
            const previousLot = LOTS[previousKey];
            return `
                <section class="fortune-layer">
                    <p class="fortune-layer-label">Gemeinsamer astrologischer Herrscher</p>
                    <h3>${detail.ruler} verbindet ${previousLot.name} und ${lot.name}.</h3>
                    <p>Das Zeichen ${detail.sign.name} wird in der traditionellen Astrologie ${RULER_BY[detail.ruler]} regiert. Derselbe Planet regiert bei dir bereits ${previousLot.name}. Deshalb spielt eine ähnliche Vorgehensweise in beiden Bereichen eine Rolle. ${PLANET_STRATEGY[detail.ruler]} ${detail.ruler} steht in deinem Horoskop im ${detail.rulerHouse}. Haus. Im Alltag betrifft das vor allem <strong>${HOUSES[detail.rulerHouse - 1]}</strong>.</p>
                    <p class="fortune-ruler-shadow"><strong>Achte darauf:</strong> ${PLANET_SHADOW[detail.ruler]}</p>
                </section>`;
        }

        return `
            <section class="fortune-layer">
                <p class="fortune-layer-label">So setzt du dieses Thema um</p>
                <h3>${detail.ruler} zeigt, wie du diese Deutung praktisch nutzen kannst.</h3>
                <p>Das Zeichen ${detail.sign.name} wird in der traditionellen Astrologie ${RULER_BY[detail.ruler]} regiert. Deshalb ergänzt ${detail.ruler} die Aussage deines ${lot.name}. ${PLANET_STRATEGY[detail.ruler]} ${detail.ruler} steht in deinem Horoskop im ${detail.rulerHouse}. Haus. Das bedeutet, dass du besonders im Bereich <strong>${HOUSES[detail.rulerHouse - 1]}</strong> konkrete Erfahrungen mit dieser Vorgehensweise machst.</p>
                <p class="fortune-ruler-shadow"><strong>Achte darauf:</strong> ${PLANET_SHADOW[detail.ruler]}</p>
            </section>`;
    }

    function combinedMeaning(key, detail) {
        const area = HOUSES[detail.house - 1];
        if (key === 'fortune') {
            return `Zusammengenommen bedeutet das: Sobald es um ${area} geht, brauchst du Bedingungen, die zur Art des Zeichens ${detail.sign.name} passen. ${ELEMENT_PRACTICE[detail.sign.element]} Genau dort solltest du nicht nur fragen, was möglich ist, sondern auch, was dich im Alltag tatsächlich unterstützt.`;
        }
        if (key === 'spirit') {
            return `Zusammengenommen bedeutet das: Wichtige Entscheidungen zeigen sich bei dir besonders im Bereich ${area}. Die Art des Zeichens ${detail.sign.name} beschreibt, wie du dabei am zuverlässigsten vorgehst. ${ELEMENT_PRACTICE[detail.sign.element]} Eine Entscheidung wird für dich erst vollständig, wenn daraus eine sichtbare Handlung entsteht.`;
        }
        return `Zusammengenommen bedeutet das: Begehren und Neugier werden bei dir besonders im Bereich ${area} geweckt. Das Zeichen ${detail.sign.name} beschreibt, welche Art von Erfahrung dich dort anspricht. ${ELEMENT_PRACTICE[detail.sign.element]} Prüfe zusätzlich, ob die Erfahrung nicht nur aufregend, sondern auch ehrlich, gegenseitig und gut für dich ist.`;
    }

    function lotSection(key, detail, chart, seed, focus, focusDetail) {
        const lot = LOTS[key];
        const opening = lot.opening[(seed + detail.signIndex + detail.house) % lot.opening.length];
        return `
            <article class="fortune-reading-section" id="reading-${key}">
                <aside class="fortune-reading-aside">
                    <p class="fortune-kicker">${lot.name} · ${degreeLabel(detail.longitude)}</p>
                    <h2>Dein<br><em>${key === 'fortune' ? 'Fundament.' : key === 'spirit' ? 'Handeln.' : 'Begehren.'}</em></h2>
                    <p>${lot.question}</p>
                </aside>
                <div class="fortune-reading-body">
                    <p class="fortune-reading-lead">${opening}</p>
                    <section class="fortune-layer fortune-core-reading">
                        <p class="fortune-layer-label">Deine Konstellation im Alltag</p>
                        <h3>${detail.sign.symbol} ${lot.name} in ${detail.sign.name} im ${detail.house}. Haus</h3>
                        <p>${lot.signs[detail.signIndex]}</p>
                        <p>${lot.houses[detail.house - 1]}</p>
                        <p class="fortune-combined-meaning"><strong>Was Zeichen und Haus zusammen bedeuten:</strong> ${combinedMeaning(key, detail)}</p>
                    </section>
                    ${rulerSectionMarkup(key, detail, chart)}
                    ${conjunctionSectionMarkup(key, detail)}
                    ${personalLayersMarkup(key, detail, focus, focusDetail)}
                </div>
            </article>`;
    }

    function lotAspectInsights(chart) {
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
                    ? 'Die beiden Themen sind eng verbunden. Wenn eines davon wichtig wird, wird meistens auch das andere aktiviert.'
                    : target.angle === 60
                        ? 'Diese beiden Themen können sich gut ergänzen. Du musst sie aber bewusst miteinander verbinden und praktisch nutzen.'
                        : target.angle === 90
                            ? 'Diese beiden Themen können miteinander in Konflikt geraten. Statt eines davon zu unterdrücken, brauchst du eine Lösung, die beide Bedürfnisse berücksichtigt.'
                            : target.angle === 120
                                ? 'Diese beiden Themen unterstützen sich fast von selbst. Prüfe, ob du diesen Vorteil bewusst nutzt oder ihn bisher übersiehst.'
                                : 'Diese beiden Themen ziehen oft in unterschiedliche Richtungen. Du musst dich nicht dauerhaft für eine Seite entscheiden; beide brauchen einen klaren Platz.';
                found.push(`Zwischen ${pairLabels[first]} und ${pairLabels[second]} besteht astrologisch eine ${aspectNames[target.angle]}. Der Abstand zur exakten Verbindung beträgt ${target.orb.toFixed(1)}°. Das bedeutet: ${dynamic}`);
            }
        });

        const rulerGroups = {};
        Object.entries(chart.lots).forEach(([key, detail]) => {
            rulerGroups[detail.ruler] = [...(rulerGroups[detail.ruler] || []), pairLabels[key]];
        });
        Object.entries(rulerGroups).forEach(([ruler, lots]) => {
            if (lots.length > 1) {
                found.push(`${lots.join(' und ')} haben bei dir denselben astrologischen Herrscher: ${ruler}. Deshalb hilft dir bei beiden Themen dieselbe Vorgehensweise: ${PLANET_STRATEGY[ruler]}. Gleichzeitig kann auch dieselbe Schwierigkeit in beiden Bereichen auftauchen. ${PLANET_SHADOW[ruler]}`);
            }
        });
        return found;
    }

    function revealNarrative(chart) {
        const fortune = chart.lots.fortune;
        const spirit = chart.lots.spirit;
        const eros = chart.lots.eros;
        const allSameRuler = fortune.ruler === spirit.ruler && spirit.ruler === eros.ruler;
        const spiritErosMatch = spirit.signIndex === eros.signIndex && spirit.house === eros.house;
        const fortuneSpiritHouse = fortune.house === spirit.house;
        const spiritErosSign = spirit.signIndex === eros.signIndex;
        const sharedRuler = [['fortune', 'spirit'], ['spirit', 'eros'], ['fortune', 'eros']]
            .find(([first, second]) => chart.lots[first].ruler === chart.lots[second].ruler);

        if (allSameRuler) {
            return {
                headline: 'Ein Planet verbindet alle drei Teile deines Readings.',
                intro: `Fortune, Spirit und Eros werden bei dir alle ${RULER_BY[fortune.ruler]} regiert. Deshalb hilft dir in allen drei Bereichen eine ähnliche Vorgehensweise. ${PLANET_STRATEGY[fortune.ruler]} Achte besonders darauf, wie sich das im Bereich ${HOUSES[fortune.rulerHouse - 1]} in deinem Alltag zeigt.`,
            };
        }
        if (spiritErosMatch) {
            return {
                headline: 'Deine Entscheidungen und dein Begehren treffen sich im selben Lebensbereich.',
                intro: `Spirit und Eros stehen beide in ${spirit.sign.name} im ${spirit.house}. Haus. Im Bereich ${HOUSES[spirit.house - 1]} kannst du deshalb besonders deutlich erleben, dass eine Entscheidung Kraft bekommt, wenn sie auch deine ehrliche Neugier und Lust berücksichtigt. Fortune im ${fortune.house}. Haus zeigt, welche Bedingungen dir dabei Stabilität geben.`,
            };
        }
        if (fortuneSpiritHouse) {
            return {
                headline: 'Dort, wo du Stabilität suchst, möchtest du auch selbst gestalten.',
                intro: `Fortune und Spirit stehen beide im ${fortune.house}. Haus. Bei dir betrifft das ${HOUSES[fortune.house - 1]}. In diesem Lebensbereich reicht es nicht, nur auf Sicherheit zu hoffen. Du brauchst Bedingungen, die dich unterstützen, und eine klare Entscheidung darüber, welchen Teil du selbst übernimmst. Eros im ${eros.house}. Haus zeigt, wodurch zusätzlich Freude und Begehren entstehen.`,
            };
        }
        if (spiritErosSign) {
            return {
                headline: 'Du entscheidest und begehrst auf eine ähnliche Art.',
                intro: `Spirit und Eros stehen beide im Zeichen ${spirit.sign.name}. Die Eigenschaften dieses Zeichens prägen daher sowohl deine bewussten Entscheidungen als auch das, was dich anzieht. Weil beide Punkte in unterschiedlichen Häusern stehen, zeigt sich diese Ähnlichkeit in zwei verschiedenen Lebensbereichen. Spirit betrifft ${HOUSES[spirit.house - 1]}. Eros betrifft ${HOUSES[eros.house - 1]}.`,
            };
        }
        if (sharedRuler) {
            const [first, second] = sharedRuler;
            const labels = { fortune: 'Fortune', spirit: 'Spirit', eros: 'Eros' };
            const ruler = chart.lots[first].ruler;
            const third = ['fortune', 'spirit', 'eros'].find(key => key !== first && key !== second);
            return {
                headline: `${ruler} verbindet zwei Teile deines Readings.`,
                intro: `${labels[first]} und ${labels[second]} werden bei dir beide ${RULER_BY[ruler]} regiert. Deshalb hilft dir in beiden Bereichen eine ähnliche Vorgehensweise. ${PLANET_STRATEGY[ruler]} ${labels[third]} ergänzt diese Strategie um eine andere Perspektive.`,
            };
        }
        return {
            headline: 'Deine drei Lots geben dir drei unterschiedliche Antworten.',
            intro: `Fortune steht in ${fortune.sign.name} im ${fortune.house}. Haus und beschreibt, was dich unterstützt. Spirit steht in ${spirit.sign.name} im ${spirit.house}. Haus und beschreibt deine bewusste Vorgehensweise. Eros steht in ${eros.sign.name} im ${eros.house}. Haus und zeigt, was dein Begehren weckt. Prüfe bei einem Problem zuerst, welche dieser drei Fragen du gerade beantworten musst.`,
        };
    }

    function integrationCopy(chart, name) {
        const fortune = chart.lots.fortune;
        const spirit = chart.lots.spirit;
        const eros = chart.lots.eros;
        const personal = name ? `${escapeHtml(name.trim())}, ` : '';
        const aligned = fortune.sign.element === spirit.sign.element;
        const sameHouse = fortune.house === spirit.house;
        const spiritErosMatch = spirit.signIndex === eros.signIndex && spirit.house === eros.house;

        const paragraphOne = sameHouse
            ? `Fortune und Spirit stehen beide in deinem ${fortune.house}. Haus. Das betrifft ${HOUSES[fortune.house - 1]}. In diesem Lebensbereich hängen Unterstützung und eigene Verantwortung eng zusammen. Kläre zuerst, welche Bedingungen dir Stabilität geben. Entscheide anschließend, welchen Teil du selbst gestalten und wofür du eine klare Vereinbarung mit anderen brauchst.`
            : aligned
                ? `Fortune und Spirit gehören beide zum Element ${fortune.sign.element}. Was dich unterstützt und wie du Entscheidungen umsetzt, folgt deshalb einer ähnlichen Logik. ${ELEMENT_COPY[fortune.sign.element]} Das kann Entscheidungen erleichtern. Prüfe trotzdem, ob du eine vertraute Vorgehensweise nur deshalb wiederholst, weil sie dir leichtfällt.`
                : `Fortune steht in ${fortune.sign.name}, Spirit in ${spirit.sign.name}. Deshalb entsteht Stabilität bei dir auf eine andere Art als bewusste Entscheidungskraft. Für Fortune gilt: ${ELEMENT_COPY[fortune.sign.element]} Für Spirit gilt: ${ELEMENT_COPY[spirit.sign.element]} Nutze diese Reihenfolge. Sorge zuerst für ausreichende Sicherheit und lege danach fest, was du selbst tun wirst.`;

        const paragraphTwo = spiritErosMatch
            ? `Spirit und Eros stehen beide in ${spirit.sign.name} im ${spirit.house}. Haus. Im Bereich ${HOUSES[spirit.house - 1]} liegen bewusste Entscheidungen und Begehren daher sehr nah beieinander. Du kannst dort schnell wissen, was du möchtest. Prüfe trotzdem, ob die konkrete Situation sicher, gegenseitig und langfristig tragbar ist.`
            : spirit.sign.element === eros.sign.element
                ? `Spirit und Eros gehören beide zum Element ${spirit.sign.element}. Deine bewusste Vorgehensweise und dein Begehren nutzen daher ähnliche Fähigkeiten. Sie stehen jedoch in unterschiedlichen Häusern. Deine Entscheidungen betreffen besonders ${HOUSES[spirit.house - 1]}. Dein Begehren wird besonders durch ${HOUSES[eros.house - 1]} geweckt.`
                : `Spirit gehört zum Element ${spirit.sign.element}, Eros zum Element ${eros.sign.element}. Deshalb kann dich etwas stark anziehen, obwohl du noch nicht weißt, ob du danach handeln möchtest. Nimm die Anziehung ernst und prüfe anschließend Fakten, Folgen, Gegenseitigkeit und deine Verantwortung.`;

        const statement = `${personal}${name ? 'dein' : 'Dein'} Fortune in ${fortune.sign.name} im ${fortune.house}. Haus zeigt, was dich unterstützt. Dein Spirit in ${spirit.sign.name} im ${spirit.house}. Haus beschreibt, wie du bewusst handelst. Dein Eros in ${eros.sign.name} im ${eros.house}. Haus zeigt, was dein Begehren weckt.`;
        return { paragraphOne, paragraphTwo, insights: lotAspectInsights(chart), statement };
    }

    function synthesisQuestion(chart) {
        const fortune = chart.lots.fortune;
        const spirit = chart.lots.spirit;
        const eros = chart.lots.eros;
        if (spirit.signIndex === eros.signIndex && spirit.house === eros.house) {
            return 'Was zieht mich wirklich an und welche konkrete Entscheidung möchte ich daraus machen?';
        }
        if (fortune.house === spirit.house) {
            return 'Welche Bedingungen unterstützen mich und welchen Teil möchte ich selbst gestalten?';
        }
        if (fortune.ruler === spirit.ruler && spirit.ruler === eros.ruler) {
            return `Wie kann ich die positiven Eigenschaften von ${fortune.ruler} nutzen, ohne zu übertreiben oder mich dabei selbst zu verlieren?`;
        }
        return 'Brauche ich gerade mehr Stabilität, eine klare Entscheidung oder Raum für mein Begehren?';
    }

    function quickSummaryMarkup(chart) {
        const fortune = chart.lots.fortune;
        const spirit = chart.lots.spirit;
        const eros = chart.lots.eros;
        const firstSentence = value => `${value.split('. ')[0]}.`;
        return `
            <section class="fortune-quick-summary" aria-labelledby="fortune-quick-title">
                <header>
                    <p class="fortune-kicker">Dein Reading in einer Minute</p>
                    <h3 id="fortune-quick-title">Das solltest du zuerst wissen.</h3>
                    <p>Du musst nicht jedes astrologische Detail behalten. Diese drei Aussagen sind der Kern deines Readings.</p>
                </header>
                <div class="fortune-quick-grid">
                    <article><span>01 · Was dich unterstützt</span><h4>${fortune.sign.name} im ${fortune.house}. Haus</h4><p>${firstSentence(LOTS.fortune.signs[fortune.signIndex])} Besonders wichtig wird das bei <strong>${HOUSES[fortune.house - 1]}</strong>.</p></article>
                    <article><span>02 · Wie du bewusst handelst</span><h4>${spirit.sign.name} im ${spirit.house}. Haus</h4><p>${firstSentence(LOTS.spirit.signs[spirit.signIndex])} Deine Entscheidungen betreffen besonders <strong>${HOUSES[spirit.house - 1]}</strong>.</p></article>
                    <article><span>03 · Was dein Begehren weckt</span><h4>${eros.sign.name} im ${eros.house}. Haus</h4><p>${firstSentence(LOTS.eros.signs[eros.signIndex])} Das zeigt sich besonders bei <strong>${HOUSES[eros.house - 1]}</strong>.</p></article>
                </div>
            </section>`;
    }

    function personalActionNote(key, chart) {
        const detail = chart.lots[key];
        const style = ACTION_STYLE[key] && ACTION_STYLE[key][detail.signIndex]
            ? ACTION_STYLE[key][detail.signIndex]
            : ELEMENT_PRACTICE[detail.sign.element];
        const area = ACTION_AREA[key] && ACTION_AREA[key][detail.house - 1]
            ? ACTION_AREA[key][detail.house - 1]
            : `Beziehe diese Aufgabe besonders auf den Lebensbereich ${HOUSES[detail.house - 1]}.`;
        return `<p class="fortune-action-personal"><strong>Persönlich für dich: ${detail.sign.name} im ${detail.house}. Haus.</strong> ${area} ${style}</p>`;
    }

    function actionPlanMarkup(chart, focus, focusDetail) {
        const selectedDetail = focusDetailConfig(focus, focusDetail);
        const today = selectedDetail
            ? selectedDetail.today
            : LOTS.fortune.transfers[chart.lots.fortune.house - 1];
        const week = selectedDetail
            ? selectedDetail.week
            : LOTS.spirit.transfers[chart.lots.spirit.house - 1];
        const month = selectedDetail
            ? selectedDetail.month
            : `Setze diesen Impuls innerhalb der nächsten vier Wochen bewusst um: ${LOTS.eros.transfers[chart.lots.eros.house - 1]} Notiere anschließend, was du tatsächlich erlebt hast und was du daraus für deinen Alltag beibehalten möchtest.`;
        return `
            <article class="fortune-action"><span>Heute</span><p>${today}</p>${personalActionNote('fortune', chart)}</article>
            <article class="fortune-action"><span>In den nächsten sieben Tagen</span><p>${week}</p>${personalActionNote('spirit', chart)}</article>
            <article class="fortune-action"><span>In den nächsten vier Wochen</span><p>${month}</p>${personalActionNote('eros', chart)}</article>`;
    }

    function renderResults(chart, birthDate, place, name, focus, focusDetail, ambiguityCount) {
        const modeLabel = chart.isDay ? 'Taghoroskop' : 'Nachthoroskop';
        const seed = nameSeed(name);
        const reveal = revealNarrative(chart);
        const integration = integrationCopy(chart, name);
        const cards = Object.entries(chart.lots).map(([key, detail]) => {
            const lot = LOTS[key];
            return `<article class="fortune-lot-card"><span class="fortune-lot-symbol" aria-hidden="true">${lot.symbol}</span><p class="fortune-kicker">${lot.name} · ${lot.subtitle}</p><h3>${detail.sign.symbol} ${degreeLabel(detail.longitude)}<br>${detail.house}. Haus</h3><p>Herrscher: ${detail.ruler} · ${degreeLabel(detail.rulerLongitude)}</p><a href="#reading-${key}">Read ${lot.name} <span aria-hidden="true">↘</span></a></article>`;
        }).join('');
        const readings = Object.entries(chart.lots).map(([key, detail], index) => lotSection(key, detail, chart, seed + index, focus, focusDetail)).join('');
        const actions = actionPlanMarkup(chart, focus, focusDetail);
        const insightMarkup = integration.insights.map(insight => `<p>${insight}</p>`).join('');
        const focusMeta = FOCUS[focus] ? `<span>Aktueller Fokus: ${FOCUS[focus].label}</span>` : '';
        const selectedDetail = focusDetailConfig(focus, focusDetail);
        const detailMeta = selectedDetail ? `<span>Aktuelle Situation: ${escapeHtml(selectedDetail.label)}</span>` : '';
        const detailContext = selectedDetail ? `<p class="fortune-reveal-focus"><strong>Du hast ausgewählt:</strong> ${selectedDetail.context}</p>` : '';

        const ambiguityNote = ambiguityCount > 1 ? '<span>Die lokale Uhrzeit kam durch eine Zeitumstellung zweimal vor; verwendet wurde die frühere Instanz.</span>' : '';

        resultsContent.innerHTML = `
            <section class="fortune-reveal">
                <span class="fortune-result-planet" aria-hidden="true"></span>
                <p class="fortune-kicker">Dein Horoskop zum Zeitpunkt deiner Geburt</p>
                <p class="fortune-reveal-greeting">${name ? `${escapeHtml(name.trim())}, das fällt in deinem Ergebnis besonders auf:` : 'Das fällt in deinem Ergebnis besonders auf:'}</p>
                <h2>${reveal.headline}</h2>
                <p class="fortune-reveal-intro">${reveal.intro}</p>
                ${detailContext}
                <div class="fortune-meta"><span>${locationLabel(place)}</span><span>${timeZoneLabel(birthDate, place.timezone)}</span><span>${modeLabel}</span><span>Aszendent ${degreeLabel(chart.ascendant)}</span><span>Whole Sign Häuser</span>${focusMeta}${detailMeta}${ambiguityNote}</div>
                <div class="fortune-lot-grid">${cards}</div>
            </section>
            ${quickSummaryMarkup(chart)}
            <div class="fortune-reading">${readings}</div>
            <section class="fortune-integration">
                <p class="fortune-kicker">Dein Gesamtbild</p>
                <h2>So wirken deine drei Punkte<br><em>zusammen.</em></h2>
                <div class="fortune-integration-grid">
                    <p class="fortune-integration-statement">${integration.statement}</p>
                    <div class="fortune-integration-copy"><p>${integration.paragraphOne}</p><p>${integration.paragraphTwo}</p>${insightMarkup}</div>
                </div>
                <section class="fortune-joker-guide" aria-labelledby="fortune-joker-title">
                    <header><p class="fortune-kicker">Drei Fragen für später</p><h3 id="fortune-joker-title">${synthesisQuestion(chart)}</h3><p>Wenn du unsicher bist, musst du nicht das gesamte Reading erneut lesen. Nutze die drei persönlichen Fragen, um zu klären, ob du gerade Unterstützung, eine bewusste Entscheidung oder mehr Raum für dein Begehren brauchst.</p></header>
                    <div class="fortune-joker-cards">
                        <article><span>⊗</span><p>Fortune</p><h4>${LOTS.fortune.jokers[chart.lots.fortune.signIndex]}</h4></article>
                        <article><span>✦</span><p>Spirit</p><h4>${LOTS.spirit.jokers[chart.lots.spirit.signIndex]}</h4></article>
                        <article><span>♡</span><p>Eros</p><h4>${LOTS.eros.jokers[chart.lots.eros.signIndex]}</h4></article>
                    </div>
                </section>
                <section class="fortune-next-moves"><p class="fortune-kicker">Jetzt konkret werden</p><h3>Deine nächsten drei Schritte.</h3><div class="fortune-actions">${actions}</div></section>
                <section class="fortune-download" aria-labelledby="fortune-download-title">
                    <div><p class="fortune-kicker">Keep your reading</p><h3 id="fortune-download-title">Nimm dein Reading mit.</h3><p>Über den Druckdialog kannst du dein vollständiges Reading als PDF speichern. Deine Geburtsdaten werden dabei nicht an uns übertragen oder gespeichert.</p></div>
                    <button class="fortune-pdf" id="fortune-pdf" type="button">Reading als PDF speichern <span aria-hidden="true">↓</span></button>
                </section>
                <section class="fortune-result-signoff">
                    <p>Das Wichtigste: Alles, was Du brauchst, ist schon da.</p>
                    <p>Big hug.<br>Sabrina</p>
                </section>
                <button class="fortune-again" id="fortune-again" type="button">Calculate another chart <span aria-hidden="true">↗</span></button>
            </section>`;

        document.getElementById('fortune-pdf').addEventListener('click', () => {
            const previousTitle = document.title;
            const fileName = name ? `Dein Fortune Reading · ${name.trim()}` : 'Dein Fortune Reading';
            let restored = false;
            let restoreTimer = null;
            const restorePage = () => {
                if (restored) { return; }
                restored = true;
                if (restoreTimer) { window.clearTimeout(restoreTimer); }
                document.body.classList.remove('fortune-printing');
                document.title = previousTitle;
            };
            document.title = fileName;
            document.body.classList.add('fortune-printing');
            window.addEventListener('afterprint', restorePage, { once: true });
            restoreTimer = window.setTimeout(restorePage, 30000);
            window.print();
        });

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
        const focusInput = form.querySelector('input[name="focus"]:checked');
        const focus = focusInput ? focusInput.value : '';
        const focusDetailInput = form.querySelector('input[name="focus-detail"]:checked');
        const focusDetail = focusDetailInput ? focusDetailInput.value : '';

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
            renderResults(chart, birthDate, selectedPlace, name, focus, focusDetail, candidates.length);
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
