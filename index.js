//@ts-check
(function(window, document) {
    const $date = document.getElementById("date");
    const $year = document.getElementById("year");
    const $go = document.getElementById("go");
    const $goYear = document.getElementById("go-year");
    const $output = document.getElementById("output");
    
    function appendError(text) {
        $output.innerHTML = `<div class="error">${text}</div>`;
    }
    
    function setOutput(text) {
        $output.innerHTML = `<div>${text}</div>`;
    }
    
    function appendToOutput(text) {
        $output.innerHTML = $output.innerHTML + `<div>${text}</div>`;
    }

    function updateBbcWeek(event) {
        let date = $date.value.trim();
    
        setOutput("");

        let m = moment(date);

        if (!m.isValid()) {
            appendError("Couldn't parse that date, sorry");
            return;
        }

        let [year, week] = calculateWeek(m.add(12, 'hours'));
        appendToOutput(`${date} is in BBC week ${week} of year ${year}`);
    }

    function updateStartOfYear(event) {
        setOutput("");

        let year = parseInt($year.value.trim(), 10);
        
        if (!year) {
            appendError("Couldn't parse that year, sorry");
            return;
        }

        let m = findStartOfYear(year);
        appendToOutput(`BBC year ${year} started on ${m.format("YYYY-MM-DD")}`);
    }

    function calculateWeek(m) {
        let utc = m.utc();
        let adjustment = 3 - ((utc.day() + 1) % 7);
        let tuesday = utc.add(adjustment, 'days');
        return [tuesday.year(), Math.floor((tuesday.dayOfYear() - 1) / 7) + 1];
    }

    function findStartOfYear(year) {
        let m = moment({
            year: year,
            month: 0,
            day: 4,
            hour: 12
        });

        let adjustment = -((m.day() + 1) % 7);
        let saturday = m.add(adjustment, 'days');
        return saturday;
    }

    $go.onclick = updateBbcWeek;
    $goYear.onclick = updateStartOfYear;
    
})(window, document);
