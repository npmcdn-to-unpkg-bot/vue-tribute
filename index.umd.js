(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('tributejs')) :
  typeof define === 'function' && define.amd ? define(['tributejs'], factory) :
  (factory(global.Tribute));
}(this, function (Tribute) { 'use strict';

  Tribute = 'default' in Tribute ? Tribute['default'] : Tribute;

  if (!Tribute) {
    throw new Error("[vue-tribute] cannot locate tributejs");
  }

  exports.install = function (Vue, options) {
    Vue.directive("tribute", {
      params: ["values"],
      tribute: null,
      paramWatchers: {
        values: function values(val, oldVal) {
          this.setValues(val);
        }
      },
      bind: function bind() {
        var _this = this;

        // If it has a "values" property, it's actually a collection
        if (this.params.values.hasOwnProperty("values")) {
          this.tribute = new Tribute({
            collection: this.params.values
          });
        } else {
          this.tribute = new Tribute(Object.assign({
            values: this.params.values
          }, options));
        }

        this.tribute.attach(this.el);
        this.el.addEventListener("tribute-replaced", function (e) {
          _this.vm.$emit("tribute-replaced");
        });
        this.el.addEventListener("tribute-no-match", function (e) {
          _this.vm.$emit("tribute-no-match");
        });
      },
      setValues: function setValues(values) {
        // If it has a "values" property, it's actually a collection
        if (values.hasOwnProperty("values")) {
          this.tribute.collection = values;
        } else {
          this.tribute.collection[0].values = values;
        }
      }
    });
  };

}));