<template>
  <div>
    <v-tour :name="name" :steps="finalSteps" class="positionRelative">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :skip="tour.skip"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            class="primary pa-8 text-left tour-stepbox"
          >
            <template>
              <div slot="actions">
                <div class="positionAbsolute" style="right: 0; top: 0;">
                  <v-btn icon @click="onCloseTour(tour.currentStep)">
                    <v-icon class="white--text">mdi-close</v-icon>
                  </v-btn>
                </div>
                <div class="d-flex">
                  <div class="d-flex" style="line-height: 36px;">
                    <div>{{ tour.currentStep + 1 }}</div>
                    /
                    <div>{{ tour.steps.length }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <!-- <v-btn text @click="tour.previousStep">
                        Normal
                      </v-btn> -->
                    <v-btn
                      v-if="tour.currentStep !== 0"
                      text
                      class="grey--text text--lighten-5"
                      @click="tour.previousStep"
                    >
                      <i18n path="Tour.Actions.Previous" />
                    </v-btn>
                    <v-btn
                      v-if="tour.currentStep !== tour.steps.length - 1"
                      text
                      class="white--text"
                      @click="tour.nextStep"
                    >
                      <i18n path="Tour.Actions.Next" />
                    </v-btn>
                    <v-btn
                      v-if="tour.currentStep === tour.steps.length - 1"
                      text
                      class="white--text"
                      @click="tour.skip"
                    >
                      <i18n path="Tour.Actions.LearnMore" />
                    </v-btn>
                  </div>
                </div>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '', required: true },
    finalSteps: { type: Function, default: () => [], required: true },
  },
  methods: {
    onCloseTour(value) {
      document.cookie = `tour.${this.name}=${value}`
      // this.$tours.tourOne.stop()
      this.$tours[this.name].stop()
    },
  },
}
</script>
