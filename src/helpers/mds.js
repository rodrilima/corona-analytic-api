const states = require("../config/states");
const moment = require("moment");

class mdsHelper {
    sourceParser(body) {
        const data = JSON.parse(body.substring(13));
        const brazil = data["brazil"];
        const world = data["world"];

        return {
            brazil: this.brazilLastItemParser(brazil),
            world: this.worldLastItemParser(world),
            history: {
                brazil: this.brasilHistoryParser(brazil),
                world: this.worldHistoryParser(world)
            },
            updated_at: Date.now()
        };
    }
    convertDateToISO8091(date, time) {
        const newDate = moment(`${date} ${time}`, "DD/MM/YYYY HH:mm");
        return newDate.isValid() ? newDate.toISOString() : "";
    }
    worldHistoryParser(wordList) {
        const wordMap = new Map();
        wordList.forEach(item => {
            item.values.forEach(itemValue => {
                let history = wordMap.get(itemValue.uid);
                if (!history) wordMap.set(itemValue.uid, (history = []));

                history.push({
                    date: item.date,
                    time: item.time,
                    date_iso: this.convertDateToISO8091(item.date, item.time),
                    cases: itemValue.cases || 0,
                    casesNew: itemValue.casesNew || 0,
                    deaths: itemValue.deaths || 0,
                    deathsNew: itemValue.deathsNew || 0
                });
            });
        });

        const worldHistory = [];
        for (let worldUid of wordMap.keys()) {
            worldHistory.push({
                uid: worldUid,
                name: worldUid,
                history: wordMap.get(worldUid) || []
            });
        }
        return worldHistory;
    }
    brasilHistoryParser(brazilList) {
        // Create a map with all states to take the history
        const stateMap = new Map();
        brazilList.forEach(item => {
            item.values.forEach(itemValue => {
                let history = stateMap.get(itemValue.uid);
                if (!history) stateMap.set(itemValue.uid, (history = []));

                history.push({
                    date: item.date,
                    time: item.time,
                    date_iso: this.convertDateToISO8091(item.date, item.time),
                    ...this.informationValueParser(itemValue)
                });
            });
        });

        const statesHistory = [];
        for (let stateUid of stateMap.keys()) {
            statesHistory.push({
                uid: stateUid,
                name: states[stateUid] || "",
                history: stateMap.get(stateUid) || []
            });
        }
        return statesHistory;
    }
    brazilLastItemParser(brazilList) {
        // Get the last item from brazilList array, important to not break the current users
        const { date, time, values } = brazilList[brazilList.length - 1];

        const lastBrazilItem = {
            date,
            time,
            date_iso: this.convertDateToISO8091(date, time),
            values: []
        };

        lastBrazilItem.values = values.map(value => {
            return {
                uid: value.uid || "",
                state: states[value.uid] || "",
                ...this.informationValueParser(value)
            };
        });

        return lastBrazilItem;
    }
    worldLastItemParser(worldList) {
        return worldList[worldList.length - 1];
    }
    informationValueParser(information) {
        return {
            cases: information.cases || 0,
            deaths: information.deaths || 0,
            suspects: information.suspects || 0,
            refuses: information.refuses || 0,
            broadcast: information.broadcast || false,
            comments: information.comments || ""
        };
    }
}

module.exports = new mdsHelper();