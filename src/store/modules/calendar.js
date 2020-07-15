import Vue from "vue";

function apiGetterUrl(minDate, maxDate) {
  return `https://clients6.google.com/calendar/v3/calendars/ru.by%23holiday@group.v.calendar.google.com/events?calendarId=ru.by%23holiday%40group.v.calendar.google.com&singleEvents=true&timeZone=Europe%2FMinsk&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${minDate ||
    "2020-11-01"}T00%3A00%3A00%2B03%3A00&timeMax=${maxDate ||
    "2021-11-01"}T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`;
}

const state = {
  freeDays: []
};

const getters = {
  freeDays: state => state.freeDays
};

const mutations = {
  setfreeDays(state, payload) {
    state.freeDays = payload;
  }
};

const actions = {
  getfreeDays({ commit }, payload) {
    Vue.axios
      .get(apiGetterUrl())
      .then(res => {
        let payload = res.data.items.map(day => {
          return {
            name: day.summary,
            month: +day.start.date.slice(-5, -3),
            day: +day.start.date.slice(-2)
          };
        });
        commit("setfreeDays", payload);
      })
      .catch(err => {
        console.log(err);
        console.log(payload);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
