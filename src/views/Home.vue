<template>
  <div class="home d-flex flex-column">
    <HomeBanner v-if="currentCountry === 'US'" />
    <div class="hero">
      <router-link class="router" :to="{ name: 'Home' }">
        <Logo class="logo" />
      </router-link>
    </div>
    <SearchBar
      :initialSearchTerm="search"
      @searched="onSearch"
      :activityList="activityNamesList"
      :perPage="5"
    />
    <SuggestedSearches @searched="onSearch" />
    <HowToThinkAboutRisk></HowToThinkAboutRisk>
    <HowItWorks />
  </div>
</template>

<script>
import Logo from "@/assets/ccidi-logo-full.svg";
import SearchBar from "@/components/SearchBar.vue";
import SuggestedSearches from "@/components/SuggestedSearches.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import HowToThinkAboutRisk from "@/components/HowToThinkAboutRisk.vue";
import { mapGetters } from "vuex";

export default {
  props: ["search", "slug"],
  components: {
    Logo,
    SearchBar,
    SuggestedSearches,
    HowItWorks,
    HomeBanner,
    HowToThinkAboutRisk
  },
  data: function() {
    return {
      searched: false,
      result: {},
      selectedActivitySlug: ""
    };
  },
  computed: {
    ...mapGetters(["activities", "currentCountry"]),
    activityNamesList() {
      return this.activityList.map(activity => activity.name);
    },
    activityList() {
      return Object.values(this.activities || {}).filter(
        activity => !activity.disabled
      );
    }
  },
  created() {
    if (this.slug) {
      this.onSearch(this.activities[this.slug].name);
    }
  },
  methods: {
    onSearch(searchValue) {
      if (searchValue !== "") {
        this.$gtag.event("search", {
          event_category: "user-action",
          event_label: searchValue
        });
      }

      this.searched = true;
      for (let i = 0; i < this.activityList.length; i++) {
        const activity = this.activityList[i];
        if (!activity["name"]) continue;
        if (activity["name"].toLowerCase() == searchValue.toLowerCase()) {
          this.result = activity;
          if (this.$route.params.slug != activity.slug) {
            this.$router.push({
              name: "ActivitySearch",
              params: { slug: activity.slug }
            });
          }
        }
      }
    },
    goToResults() {
      this.$router.push({
        name: "ActivitySearch",
        params: { slug: this.selectedActivitySlug }
      });
    }
  }
};
</script>

<style lang="scss">
.bannerText {
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}
.hero {
  margin: 4em auto;

  svg {
    height: auto;
    width: 35vw;
  }
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    svg {
      height: auto;
      width: 90vw;
    }
  }
}
</style>
